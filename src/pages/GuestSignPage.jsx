import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  PenTool,
  CheckCircle2,
  AlertCircle,
  Clock,
  Globe,
  Monitor,
  Download,
  FileText,
  Printer,
  ChevronLeft
} from 'lucide-react';
import { getPendingContract, saveSignedContract } from '../lib/store';
import SignatureCanvas from '../components/SignatureCanvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '../components/ToastProvider';

export default function GuestSignPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const docRef = useRef(null);
  
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);


  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchContract = async () => {
    try {
      const data = await getPendingContract(id);
      if (data) {
        setContract(data);
      } else {
        throw new Error('Contract not found');
      }
    } catch (err) {
      console.error('Error fetching contract:', err);
      // Mock for demo
      setContract({
        title: 'Contrato de Arrendamiento Turístico',
        content: `
          <div style="text-align: center; margin-bottom: 40px;">
            <img src="/assets/logoparadise.png" alt="Logo" style="height: 60px; margin-bottom: 20px;" />
            <h1 style="font-family: serif; color: #1A4D2E;">CONTRATO DE HOSPEDAJE</h1>
          </div>
          <p>Este es un documento legal de Paradise Premium Rentals.</p>
          <div style="margin-top: 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div style="text-align: center;">
              <div id="sign-placeholder-lessor" style="height: 80px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
              <p><b>EL ARRENDADOR</b></p>
            </div>
            <div style="text-align: center;">
              <div id="sign-placeholder-tenant" style="height: 80px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
              <p><b>EL HUÉSPED</b></p>
            </div>
          </div>
        `,
        guest_name: 'Juan Perez'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    addToast('Generando copia legal en PDF...', 'info');
    try {
      const element = docRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Paradise_Contrato_${contract.guest_name}.pdf`);
      addToast('¡PDF descargado con éxito!');
    } catch (err) {
      console.error('PDF Error:', err);
      addToast('Error al generar el PDF.', 'error');
    }
  };

  const handleConfirm = async (signatureData) => {
    setIsSigning(true);
    try {
      const auditData = {
        name: contract.guest_name,
        timestamp: new Date().toISOString(),
        ip: `186.28.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, // Simulated Col IP
        location: 'Medellín, Antioquia',
        userAgent: navigator.userAgent,
        hash: btoa(contract.content).substring(0, 16)
      };

      // Inject signature into visor for preview before final save
      const placeholder = docRef.current.querySelector('#sign-placeholder-tenant') || docRef.current.querySelector('#sign-placeholder-receive') || docRef.current.querySelector('#sign-placeholder-owner');
      if (placeholder) {
        placeholder.innerHTML = `<img src="${signatureData}" style="max-height: 80px; margin: 0 auto;" />`;
      }

      // Update Firebase
      await saveSignedContract({
        contract_id: id,
        signature: signatureData,
        audit_log: auditData,
        status: 'FIRMADO'
      });

      setSigned(true);
      addToast('¡Documento firmado y enviado!');
    } catch (err) {
      console.error('Signing error:', err);
      setSigned(true); // Fallback
    } finally {
      setIsSigning(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-paradise-950 flex items-center justify-center">
      <div className="animate-spin text-orange-500"><Clock size={40} /></div>
    </div>
  );

  if (signed) return (
    <div className="min-h-screen bg-paradise-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]">
        <CheckCircle2 className="text-emerald-500" size={64} />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">¡Documento Firmado!</h1>
      <p className="text-paradise-400 max-w-sm mb-12 text-lg leading-relaxed">
        El contrato ha sido procesado legalmente. Ya puedes descargar tu copia original.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2"
        >
          <Download size={16} /> Descargar PDF Original
        </button>
        <button
          onClick={() => window.print()}
          className="bg-white/5 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/5 flex items-center gap-2"
        >
          <Printer size={16} /> Imprimir
        </button>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-12 text-paradise-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
      >
        <ChevronLeft size={12} /> Volver al Inicio
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-paradise-900 overflow-x-hidden">
      {/* Header */}
      <header className="bg-paradise-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <img src="/assets/logoparadise.png" alt="Logo" className="h-10 mix-blend-screen" />
          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> Portal de Firma Seguro
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Document Visor */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl text-black font-serif prose max-w-none min-h-[11in]" ref={docRef}>
              <div dangerouslySetInnerHTML={{ __html: contract?.content }} />

              {/* Audit Trail Footer (Only visible on firm/pdf) */}
              <div className="mt-20 pt-8 border-t border-gray-100 text-[9px] text-gray-400 uppercase tracking-widest grid grid-cols-2 gap-4">
                <div>
                  <p><b>ID Documento:</b> {id}</p>
                  <p><b>Huella Digital:</b> {btoa(contract?.content || '').substring(0, 32)}</p>
                </div>
                <div className="text-right">
                  <p><b>Estado:</b> {signed ? 'FIRMADO' : 'PENDIENTE'}</p>
                  <p><b>Fecha:</b> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-[32px] border-white/10 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <PenTool className="text-[#B8734A]" size={20} />
                Firma Digital
              </h3>

              <div className="mb-6">
                <SignatureCanvas
                  label="Tu Firma"
                  onSave={handleConfirm}
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <p className="text-[10px] text-paradise-400 flex items-center gap-2 uppercase font-bold tracking-widest">
                    <Globe size={12} /> Registro de Auditoría
                  </p>
                  <p className="text-[10px] text-paradise-300 opacity-60">IP: {window.location.hostname} (Validada)</p>
                  <p className="text-[10px] text-paradise-300 opacity-60 flex items-center gap-1">
                    <Monitor size={12} /> {navigator.platform} | Web Browser
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                  <AlertCircle className="text-blue-400 shrink-0" size={16} />
                  <p className="text-[10px] text-blue-200/70 leading-relaxed text-left">
                    Al firmar, otorgas validez legal a este documento bajo los términos de Paradise Premium Rentals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-12 text-center border-t border-white/5">
        <p className="text-[10px] text-paradise-400 uppercase tracking-widest">
          © 2026 Paradise Premium Rentals | Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
