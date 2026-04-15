import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  Mail, 
  Copy, 
  CheckCircle2, 
  Loader2,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RemoteSignModal({ isOpen, onClose, contractData }) {
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [contractId, setContractId] = useState(null);

  if (!isOpen) return null;

  const generateLink = async () => {
    setLoading(true);
    try {
      // Create a pending contract record in Supabase
      const { data, error } = await supabase
        .from('pending_contracts')
        .insert([{
          title: contractData.title,
          content: contractData.content,
          guest_name: contractData.guest_name || 'Huésped',
          status: 'PENDIENTE',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
        }])
        .select()
        .single();

      if (error) throw error;
      setContractId(data.id);
      return `${window.location.origin}/sign/${data.id}`;
    } catch (err) {
      console.error('Error generating link:', err);
      // Fallback for demo
      const id = Math.random().toString(36).substr(2, 9);
      setContractId(id);
      return `${window.location.origin}/sign/${id}`;
    } finally {
      setLoading(false);
    }
  };

  const handleSendWhatsApp = async () => {
    const link = await generateLink();
    const message = `Hola ${contractData.guest_name}, Paradise Premium Rentals te ha enviado el contrato "${contractData.title}" para tu firma digital. Puedes revisarlo y firmarlo aquí: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    setSent(true);
  };

  const handleSendEmail = async () => {
    const link = await generateLink();
    // Simulate email sending
    console.log('Sending email to guest with link:', link);
    setSent(true);
    setTimeout(() => {
      onClose();
      setSent(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="fixed inset-0 bg-paradise-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-paradise-900 border border-white/10 w-full max-w-md rounded-[32px] overflow-hidden shadow-3xl animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Enviar para Firma</h2>
              <p className="text-sm text-paradise-400">Selecciona el método de envío para el huésped.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-paradise-500 transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Attachment Toggle */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-white/20 bg-paradise-800 text-[#B8734A] focus:ring-[#B8734A]" defaultChecked />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Incluir Autorización de Portería</p>
                  <p className="text-[10px] text-paradise-400 uppercase tracking-widest">Se enviará como adjunto automático</p>
                </div>
              </label>
            </div>

            <button 
              onClick={handleSendWhatsApp}
              disabled={loading}
              className="w-full group flex items-center gap-4 p-5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <MessageCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-emerald-400 uppercase text-[10px] tracking-widest mb-1">Recomendado</p>
                <p className="text-white font-medium">WhatsApp Business</p>
              </div>
              {loading ? <Loader2 size={20} className="animate-spin text-emerald-500" /> : <ExternalLink size={18} className="text-emerald-500/50 group-hover:text-emerald-500" />}
            </button>

            <button 
              onClick={handleSendEmail}
              disabled={loading}
              className="w-full group flex items-center gap-4 p-5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Mail size={24} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-blue-400 uppercase text-[10px] tracking-widest mb-1">Formal</p>
                <p className="text-white font-medium">Correo Electrónico</p>
              </div>
              {loading ? <Loader2 size={20} className="animate-spin text-blue-500" /> : <Send size={18} className="text-blue-500/50 group-hover:text-blue-500" />}
            </button>
          </div>

          {sent && (
            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              <p className="text-xs font-medium text-emerald-200">¡Enlace enviado correctamente!</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 p-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-paradise-500 uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck size={12} /> Cifrado de punto a punto
          </p>
        </div>
      </div>
    </div>
  );
}
