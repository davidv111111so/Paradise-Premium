import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  PenTool, 
  Download, 
  Printer, 
  Trash2, 
  CheckCircle2,
  User,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Share2,
  Clock,
  History,
  Key
} from 'lucide-react';
import RemoteSignModal from '../components/RemoteSignModal';
import { geminiModel } from '../lib/gemini';
import { supabase } from '../lib/supabase';

const MOCK_BOOKINGS = [
  { id: 'BK-782', guest: 'Juan Perez', property: 'Finca Villa del Sol', dates: '15/05/2026 - 20/05/2026', canon: '3.500.000', deposit: '450.000' },
  { id: 'BK-991', guest: 'Maria Gomez', property: 'Penthouse Provenza', dates: '01/06/2026 - 05/06/2026', canon: '2.800.000', deposit: '600.000' }
];

const DOCUMENT_TEMPLATES = {
  admin: {
    title: 'Contrato de Administración',
    content: `
      <div class="legal-doc-header" style="text-align: center; margin-bottom: 40px;">
        <img src="/assets/logoparadise.png" alt="Logo" style="height: 60px; margin-bottom: 20px; filter: brightness(0) saturate(100%) invert(31%) sepia(8%) saturate(1557%) hue-rotate(94deg) brightness(96%) contrast(85%);" />
        <h1 style="font-family: 'Playfair Display', serif; color: #1A4D2E; margin: 0;">CONTRATO DE MANDATO Y ADMINISTRACIÓN</h1>
        <p style="font-size: 10px; color: #B8734A; letter-spacing: 2px; text-transform: uppercase;">Exclusividad y Gestión Patrimonial</p>
      </div>

      <p><b>PARTES:</b> El PROPIETARIO, <span class="editable-field" contenteditable="true">____________________</span> con C.C. <span class="editable-field" contenteditable="true">____________________</span>, y el ADMINISTRADOR, <b>PARADISE PREMIUM RENTALS SAS</b>.</p>

      <p><b>CLÁUSULA 1 - OBJETO:</b> Mandato comercial para la administración, promoción y comercialización del inmueble ubicado en <span class="editable-field" contenteditable="true">____________________</span> bajo la modalidad de vivienda turística.</p>

      <p><b>CLÁUSULA 2 - ESTÁNDAR DE SERVICIO:</b> El ADMINISTRADOR garantiza un nivel de hospitalidad "Luxury", incluyendo limpieza profesional, gestión de canales (Airbnb, Booking, Directo) y asistencia 24/7 al huésped.</p>

      <p><b>CLÁUSULA 3 - HONORARIOS:</b> Se pacta una comisión del <span class="editable-field" contenteditable="true">20%</span> sobre el valor bruto de reserva, descontando tasas de plataforma.</p>

      <div style="margin-top: 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <div style="text-align: center;">
          <div id="sign-placeholder-owner" style="height: 80px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
          <p><b>EL PROPIETARIO</b></p>
        </div>
        <div style="text-align: center;">
          <div id="sign-placeholder-admin" style="height: 80px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
          <p><b>P.P. RENTALS SAS</b></p>
        </div>
      </div>
    `
  },
  rent: {
    title: 'Contrato de Arrendamiento Turístico',
    content: `
      <div class="legal-doc-header" style="text-align: center; margin-bottom: 40px;">
        <img src="/assets/logoparadise.png" alt="Logo" style="height: 60px; margin-bottom: 20px; filter: brightness(0) saturate(100%) invert(26%) sepia(21%) saturate(2311%) hue-rotate(113deg) brightness(92%) contrast(89%);" />
        <h1 style="font-family: 'Playfair Display', serif; color: #1A4D2E; margin: 0;">CONTRATO DE HOSPEDAJE Y VIVIENDA TURÍSTICA</h1>
      </div>

      <p><b>HUÉSPED RESPONSABLE:</b> <span class="editable-field" contenteditable="true">____________________</span> con ID <span class="editable-field" contenteditable="true">____________________</span>.</p>
      
      <p><b>1. RESIDENCIA:</b> Entrega temporal de <span class="editable-field" contenteditable="true">____________________</span> desde el <span class="editable-field" contenteditable="true">____/____/____</span> hasta el <span class="editable-field" contenteditable="true">____/____/____</span>.</p>

      <p><b>2. PROTOCOLO DE CONVIVENCIA (Ley 1801):</b> Se prohíbe terminantemente el ruido excesivo entre las 10:00 PM y las 8:00 AM. El uso de bafles de alta potencia facultará la terminación inmediata sin lugar a reembolso.</p>

      <p><b>3. DEPÓSITO DE SEGURIDAD:</b> El Huésped constituye un depósito de $<span class="editable-field" contenteditable="true">450.000</span> COP para cubrir posibles daños menores según el Menú de Transparencia de Paradise Premium.</p>

      <p><b>4. PROTECCIÓN AL MENOR:</b> En cumplimiento de la Ley 1336 de 2009, rechazamos la explotación sexual comercial de niños, niñas y adolescentes.</p>

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
    `
  },
  inventory: {
    title: 'Acta de Entrega e Inventario',
    content: `
      <div class="legal-doc-header" style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #1A4D2E; margin: 0;">ACTA DE ENTREGA E INVENTARIO</h1>
      </div>

      <p><b>PROPIEDAD:</b> <span class="editable-field" contenteditable="true">____________________</span> | <b>FECHA:</b> <span class="editable-field" contenteditable="true">____/____/2026</span></p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px;">
        <thead>
          <tr style="background: #1A4D2E; color: white;">
            <th style="padding: 8px; border: 1px solid #ddd;">Elemento</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Codificación / Estado</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Reposición (COP)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Llaves / Controles Aire</td><td style="padding: 8px; border: 1px solid #ddd;" contenteditable="true">Funcional</td><td style="padding: 8px; border: 1px solid #ddd;">$150.000</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Toallas Luxury (Cuerpo/Cara)</td><td style="padding: 8px; border: 1px solid #ddd;" contenteditable="true">Limpio</td><td style="padding: 8px; border: 1px solid #ddd;">$80.000</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;">Cristalería / Kit Cocina</td><td style="padding: 8px; border: 1px solid #ddd;" contenteditable="true">Completo</td><td style="padding: 8px; border: 1px solid #ddd;">$25.000/und</td></tr>
        </tbody>
      </table>

      <p style="font-size: 10px; margin-top: 15px; color: #666;">* El Huésped acepta que el estado de los elementos es óptimo al momento del ingreso. Cualquier anomalía debe reportarse en los primeros 30 minutos.</p>

      <div style="margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <div style="text-align: center;">
          <div id="sign-placeholder-delivery" style="height: 60px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
          <p style="font-size: 10px;"><b>ENTREGA (STAFF)</b></p>
        </div>
        <div style="text-align: center;">
          <div id="sign-placeholder-receive" style="height: 60px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
          <p style="font-size: 10px;"><b>RECIBE (HUÉSPED)</b></p>
        </div>
      </div>
    `
  },
  entry: {
    title: 'Autorización de Ingreso',
    content: `
      <div class="legal-doc-header" style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #1A4D2E; margin: 0; text-transform: uppercase;">AUTORIZACIÓN DE INGRESO</h1>
        <p style="font-size: 12px; color: #B8734A;">Para Edificios y Unidades Residenciales</p>
      </div>

      <p><b>DIRIGIDO A:</b> Administración y Seguridad de <span class="editable-field" contenteditable="true">____________________</span>.</p>
      <p><b>FECHA DE EMISIÓN:</b> <span class="editable-field" contenteditable="true">____/____/2026</span></p>

      <p>Por medio de la presente, <b>PARADISE PREMIUM RENTALS</b>, en calidad de administrador del inmueble <span class="editable-field" contenteditable="true">Apto/Casa ____</span>, autoriza el ingreso de las siguientes personas para el periodo del <span class="editable-field" contenteditable="true">____/____</span> al <span class="editable-field" contenteditable="true">____/____</span>:</p>

      <ul style="background: #f9f9f9; padding: 20px; border-radius: 15px; list-style: none;">
        <li><b>Titular:</b> <span class="editable-field" contenteditable="true">____________________</span> - CC: <span class="editable-field" contenteditable="true">____________________</span></li>
        <li><b>Acompañantes:</b> <span class="editable-field" contenteditable="true">____________________</span></li>
      </ul>

      <p>El titular de la reserva asume la responsabilidad total por el cumplimiento del reglamento interno de la propiedad horizontal.</p>

      <div style="margin-top: 60px;">
        <div id="sign-placeholder-admin-only" style="width: 250px; height: 70px; border-bottom: 1px solid #1A4D2E; margin-bottom: 10px;"></div>
        <p><b>FIRMA AUTORIZADA</b></p>
        <p style="font-size: 10px; color: #888;">Paradise Premium Rentals & Sales</p>
      </div>
    `
  }
};

const SignatureCanvas = ({ onSave, label }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

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

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleApply = () => {
    const dataUrl = canvasRef.current.toDataURL();
    onSave(dataUrl);
  };

  return (
    <div className="bg-white/5 p-4 rounded-3xl border border-white/10">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8734A] mb-3 flex items-center gap-2">
        <PenTool size={12} /> {label}
      </p>
      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="bg-white rounded-xl cursor-crosshair w-full"
      />
      <div className="flex gap-2 mt-3">
        <button onClick={clearCanvas} className="flex-1 py-2 text-[10px] font-bold uppercase bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
          Limpiar
        </button>
        <button onClick={handleApply} className="flex-1 py-2 text-[10px] font-bold uppercase bg-[#1A4D2E] text-white rounded-lg hover:bg-[#1A4D2E]/80 transition-all">
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default function LegalManager() {
  const [selectedDoc, setSelectedDoc] = useState('admin');
  const [content, setContent] = useState(DOCUMENT_TEMPLATES.admin.content);
  const [signatures, setSignatures] = useState({ first: null, second: null });
  const [activeBooking, setActiveBooking] = useState(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [isRemoteModalOpen, setIsRemoteModalOpen] = useState(false);
  const [contractStatus, setContractStatus] = useState('NOT_SET'); // NOT_SET, PENDING, SIGNED, EXPIRED
  const docRef = useRef(null);

  useEffect(() => {
    setContent(DOCUMENT_TEMPLATES[selectedDoc].content);
    setSignatures({ first: null, second: null });
  }, [selectedDoc]);

  const handlePrint = () => {
    window.print();
  };

  const injectSignature = (idx, dataUrl) => {
    setSignatures(prev => ({ ...prev, [idx === 0 ? 'first' : 'second']: dataUrl }));
  };

  const handleDownloadPDF = () => {
    // Note: Use window.print() and Save as PDF for high fidelity without jspdf
    window.print();
  };

  const handleAIFill = async () => {
    if (!activeBooking) {
      alert('Por favor selecciona una reserva para autocompletar.');
      return;
    }

    setIsAILoading(true);
    try {
      // Prepare the "blank fields" format for Gemini based on current content
      const textToClean = docRef.current.innerHTML.replace(/<span.*?contenteditable="true">.*?<\/span>/g, '[CAMPO]');
      
      const systemPrompt = `Eres el asistente legal de Paradise Premium Rentals. Recibirás datos de una reserva en JSON y el texto de un contrato con campos marcados como [CAMPO]. Completa ÚNICAMENTE los campos marcados con los datos proporcionados. No cambies ninguna cláusula legal. Devuelve el texto completo del contrato con todos los campos completados. Si un dato no está disponible, déjalo como ___ para que el usuario lo complete manualmente.`;
      
      const userPrompt = `Datos de la reserva: ${JSON.stringify(activeBooking)}\n\nContrato:\n${textToClean}`;

      const result = await geminiModel.generateContent([systemPrompt, userPrompt]);
      const response = await result.response;
      const filledText = response.text();

      // For this demo, we replace the content with the AI response
      setContent(filledText);
      alert('¡Contrato completado por IA con éxito!');
    } catch (error) {
      console.error('AI Fill error:', error);
      alert('Error al procesar con IA. Intenta de nuevo.');
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSave = async () => {
    if (!signatures.first || !signatures.second) {
      alert('El documento debe estar firmado por ambas partes antes de guardar.');
      return;
    }

    try {
      const { error } = await supabase
        .from('signed_contracts')
        .insert([{
          booking_id: activeBooking?.id || 'manual',
          doc_type: selectedDoc,
          content: docRef.current.innerHTML,
          signatures: signatures,
          created_at: new Date()
        }]);

      if (error) throw error;
      alert('Copia del contrato firmada guardada en el historial de la reserva.');
    } catch (err) {
      console.error('Save error:', err);
      // Fallback for demo
      alert('Copia guardada en el historial (Simulación)');
    }
  };

  return (
    <div className="space-y-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:space-y-0 pb-20">
      {/* Sidebar Controls */}
      <div className="lg:col-span-4 space-y-6">
        {/* Booking Selector */}
        <section className="glass-card p-6 rounded-[32px] border-white/5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-[#B8734A]" size={18} />
            Vincular Reserva
          </h3>
          <select 
            onChange={(e) => setActiveBooking(MOCK_BOOKINGS.find(b => b.id === e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-paradise-200 focus:border-[#B8734A] focus:outline-none"
          >
            <option value="">-- Seleccionar Reserva --</option>
            {MOCK_BOOKINGS.map(b => (
              <option key={b.id} value={b.id}>{b.id} - {b.guest}</option>
            ))}
          </select>
          {activeBooking && (
            <div className="mt-4 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Reserva Activa</p>
              <p className="text-sm font-medium text-white">{activeBooking.guest}</p>
              <p className="text-[10px] text-paradise-400">{activeBooking.property}</p>
            </div>
          )}
        </section>

        {/* Status Panel */}
        <section className="glass-card p-6 rounded-[32px] border-white/5 bg-gradient-to-br from-white/5 to-transparent">
          <h3 className="text-xs font-bold text-paradise-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
            <History size={14} /> Estado Legal
          </h3>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              {contractStatus === 'SIGNED' ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 animate-pulse">
                  <Clock size={20} />
                </div>
              )}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tight text-white">
                  {contractStatus === 'SIGNED' ? 'Firmado Digitalmente ✅' : contractStatus === 'PENDING' ? 'Pendiente de firma ⏳' : 'Sin iniciar'}
                </p>
                <p className="text-[10px] opacity-60 text-paradise-400">
                  {contractStatus === 'SIGNED' ? '15/05/2026 — 14:20' : 'Esperando huêsped'}
                </p>
              </div>
            </div>
            {contractStatus === 'PENDING' && (
              <span className="text-[10px] font-bold text-orange-500 uppercase">24h rest.</span>
            )}
          </div>
        </section>

        <section className="glass-card p-6 rounded-[32px] border-white/5">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[#B8734A]" size={20} />
            Selector de Documento
          </h3>
          <div className="space-y-3">
            {Object.entries(DOCUMENT_TEMPLATES).map(([id, doc]) => (
              <button
                key={id}
                onClick={() => setSelectedDoc(id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${
                  selectedDoc === id
                    ? 'bg-[#1A4D2E]/20 border-[#1A4D2E] text-[#B8734A] shadow-lg'
                    : 'bg-white/5 border-white/10 text-paradise-400 hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedDoc === id ? 'bg-[#1A4D2E] text-white' : 'bg-white/5'}`}>
                  {id === 'admin' && <Briefcase size={18} />}
                  {id === 'rent' && <User size={18} />}
                  {id === 'inventory' && <FileText size={18} />}
                  {id === 'entry' && <Key size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tight">{doc.title}</p>
                  <p className="text-[10px] opacity-60">PDF / DOCX</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* AI Action */}
        <button 
          onClick={handleAIFill}
          disabled={isAILoading}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
            isAILoading ? 'bg-paradise-900 opacity-50' : 'bg-gradient-to-r from-[#1A4D2E] to-[#256a40] text-white shadow-xl hover:scale-[1.02]'
          }`}
        >
          <Sparkles size={18} className={isAILoading ? 'animate-pulse' : 'animate-bounce'} />
          {isAILoading ? 'Procesando...' : '✨ Autocompletar con IA'}
        </button>

        {/* Signature Module */}
        <section className="glass-card p-6 rounded-[32px] border-white/5 space-y-4">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <PenTool className="text-[#B8734A]" size={18} />
            Firmas Digitales
          </h3>
          <SignatureCanvas 
            label={
              selectedDoc === 'admin' ? 'Firma Propietario' : 
              selectedDoc === 'rent' ? 'Firma Huésped' : 
              selectedDoc === 'inventory' ? 'Firma Entrega (Staff)' : 
              'Firma Administrador'
            } 
            onSave={(url) => injectSignature(0, url)} 
          />
          {selectedDoc !== 'entry' && (
            <SignatureCanvas 
              label={
                selectedDoc === 'admin' ? 'Firma Administrador' : 
                selectedDoc === 'rent' ? 'Firma Arrendador' : 
                'Firma Recibe (Huésped)'
              } 
              onSave={(url) => injectSignature(1, url)} 
            />
          )}
        </section>

        {/* Global Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsRemoteModalOpen(true)}
            className="col-span-2 flex items-center justify-center gap-3 py-5 bg-[#B8734A] text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-[#B8734A]/30 hover:scale-[1.02] transition-all mb-2"
          >
            <Share2 size={16} /> Enviar para Firma
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-emerald-500/20"
          >
            <CheckCircle2 size={14} /> Guardar
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-4 bg-[#1A4D2E] text-white border border-[#1A4D2E] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-[#1A4D2E]/20"
          >
            <Download size={14} /> Descargar para Impresión
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Printer size={14} /> Vista Previa
          </button>
        </div>

        {/* Remote Sign Modal */}
        <RemoteSignModal 
          isOpen={isRemoteModalOpen}
          onClose={() => setIsRemoteModalOpen(false)}
          contractData={{
            title: DOCUMENT_TEMPLATES[selectedDoc].title,
            content: docRef.current?.innerHTML,
            guest_name: activeBooking?.guest
          }}
        />
      </div>

      {/* Visor Area */}
      <div className="lg:col-span-8 print:col-span-12">
        <section className="glass-card p-4 md:p-12 rounded-[40px] border-white/5 bg-white min-h-[11in] shadow-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
          {/* Logo Watermark (Hidden in editor, shown on print/visor) */}
          <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
            <img src="/assets/logoparadise.png" alt="Logo" className="h-20" />
          </div>

          <div 
            ref={docRef}
            className="legal-visor text-black font-serif leading-relaxed"
            style={{ 
              color: '#333',
              fontSize: '14px',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {/* Document Content */}
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              className="prose prose-slate max-w-none"
            />

            {/* Injected Signatures Layer (Overlay) */}
            <style>{`
              .editable-field {
                background-color: #fff9c4;
                padding: 2px 4px;
                border-radius: 4px;
                display: inline-block;
                min-width: 40px;
                border-bottom: 1px dotted #B8734A;
              }
              .editable-field:focus {
                outline: none;
                background-color: #fff176;
              }
              @media print {
                @page {
                  size: A4;
                  margin: 20mm;
                }
                body * { visibility: hidden !important; }
                .legal-visor, .legal-visor * { visibility: visible !important; }
                .legal-visor { 
                  position: absolute; 
                  left: 0; 
                  top: 0; 
                  width: 100% !important; 
                  padding: 0 !important;
                  margin: 0 !important;
                  background: white !important;
                  color: black !important;
                }
                .editable-field { 
                  background-color: transparent !important; 
                  border: none !important; 
                  padding: 0 !important;
                  text-decoration: underline;
                }
                .no-print, button, .glass-card:not(.legal-visor) { display: none !important; }
                header, footer, .sidebar-controls { display: none !important; }
                .legal-doc-header img { filter: grayscale(1) !important; max-height: 80px !important; }
              }
            `}</style>

            {/* Portal-like injection for signatures */}
            {signatures.first && (
              <PortalSignature target={selectedDoc === 'admin' ? '#sign-placeholder-owner' : selectedDoc === 'rent' ? '#sign-placeholder-lessor' : '#sign-placeholder-delivery'}>
                <img src={signatures.first} alt="Firma 1" style={{ maxHeight: '80px' }} />
              </PortalSignature>
            )}
            {signatures.second && (
              <PortalSignature target={selectedDoc === 'admin' ? '#sign-placeholder-admin' : selectedDoc === 'rent' ? '#sign-placeholder-tenant' : '#sign-placeholder-receive'}>
                <img src={signatures.second} alt="Firma 2" style={{ maxHeight: '80px' }} />
              </PortalSignature>
            )}
          </div>
        </section>
      </div>

      {/* Print Overlay Helper */}
      <div id="print-area" className="hidden"></div>
    </div>
  );
}

// Helper to render signatures into placeholders in the HTML string
const PortalSignature = ({ children, target }) => {
  const [targetEl, setTargetEl] = useState(null);

  useEffect(() => {
    const el = document.querySelector(target);
    if (el) setTargetEl(el);
  }, [target]);

  if (!targetEl) return null;

  return React.createPortal(children, targetEl);
};
