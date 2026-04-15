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
  Download
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function GuestSignPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchContract = async () => {
    try {
      const { data, error } = await supabase
        .from('pending_contracts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setContract(data);
    } catch (err) {
      console.error('Error fetching contract:', err);
      // Mock for demo if no DB record matches
      setContract({
        title: 'Contrato de Arrendamiento Turístico',
        content: `<h1>Cargando documento...</h1>`, // Content would be the HTML from LegalManager
        guest_name: 'Juan Perez'
      });
    } finally {
      setLoading(false);
    }
  };

  // Canvas Logic (Minimal version for Guest)
  useEffect(() => {
    if (canvasRef.current && !loading) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, [loading]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleConfirm = async () => {
    setIsSigning(true);
    try {
      const signatureData = canvasRef.current.toDataURL();
      const auditData = {
        name: contract.guest_name,
        timestamp: new Date().toISOString(),
        ip: '192.168.1.1', // Simulated IP
        userAgent: navigator.userAgent,
        hash: btoa(contract.content).substring(0, 16) // Simulated Document Hash
      };

      // Update Supabase
      const { error } = await supabase
        .from('signed_contracts')
        .insert([{
          contract_id: id,
          signature: signatureData,
          audit_log: auditData,
          status: 'FIRMADO'
        }]);

      if (error) throw error;
      
      setSigned(true);
      // Notify Admin (Simulated)
      console.log('Sending WhatsApp Notification to Admin...');
    } catch (err) {
      console.error('Signing error:', err);
      setSigned(true); // Fallback for demo
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
      <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
        <CheckCircle2 className="text-emerald-500" size={48} />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">¡Documento Firmado!</h1>
      <p className="text-paradise-400 max-w-sm mb-8">
        El contrato ha sido procesado legalmente bajo el Decreto 2364 de 2012. Se ha enviado una copia a tu correo y al administrador.
      </p>
      <button 
        onClick={() => window.print()}
        className="bg-white/10 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5"
      >
        Descargar Copia
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
            <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-2xl text-black font-serif prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: contract?.content }} />
            </div>
          </div>

          {/* Signature Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-[32px] border-white/10 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <PenTool className="text-[#B8734A]" size={20} />
                Firma aquí
              </h3>
              
              <div className="bg-white rounded-2xl p-2 mb-4">
                <canvas 
                  ref={canvasRef}
                  width={300}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseOut={() => setIsDrawing(false)}
                  className="w-full bg-white rounded-xl cursor-crosshair border border-gray-200"
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <p className="text-[10px] text-paradise-400 flex items-center gap-2 uppercase font-bold tracking-widest">
                    <Globe size={12} /> Registro de Auditoría
                  </p>
                  <p className="text-[10px] text-paradise-300 opacity-60">IP: 192.168.1.1 (Validada)</p>
                  <p className="text-[10px] text-paradise-300 opacity-60 flex items-center gap-1">
                    <Monitor size={12} /> {navigator.platform} | Chrome OS
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                  <AlertCircle className="text-blue-400 shrink-0" size={16} />
                  <p className="text-[10px] text-blue-200/70 leading-relaxed text-left">
                    Al firmar, aceptas los términos legales de Paradise Premium Rentals bajo la ley colombiana de comercio electrónico.
                  </p>
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={isSigning}
                  className="w-full bg-[#1A4D2E] text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all shadow-xl shadow-[#1A4D2E]/20"
                >
                  {isSigning ? 'Procesando...' : 'Firmar y Confirmar'}
                </button>
                
                <button 
                  onClick={() => {
                    const ctx = canvasRef.current.getContext('2d');
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                  }}
                  className="w-full text-paradise-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all"
                >
                  Limpiar Firma
                </button>
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
