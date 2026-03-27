// --------------------------------------------------------
// AICopilotBubble — Burbuja Global de IA
// --------------------------------------------------------
import { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import ChatBubble from './ChatBubble';
import { geminiModel } from '../lib/gemini';
import { supabase } from '../lib/supabase';

export default function AICopilotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang] = useState(localStorage.getItem('lang') || 'es');
  const [messages, setMessages] = useState([
    { role: 'ai', content: '¡Hola! Bienvenido a Paradise Premium. Soy tu experto en estilo de vida de lujo en Medellín. ¿Cómo puedo asistirte hoy con nuestra colección de fincas y apartamentos?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!geminiModel) {
        setMessages(prev => [...prev, { role: 'ai', content: '¡Hola! Por favor configura tu VITE_GEMINI_API_KEY en el panel de control o archivo .env para activarme. ¡Estaré listo para ayudarte!' }]);
        return;
      }

      const prompt = `Eres el Agente Oficial de Paradise Premium Rentals en Medellín, Colombia. 
      Tu nombre es Paradise Copilot. Tu tono es extremadamente profesional, servicial y sofisticado.
      
      CONOCIMIENTO DE LA EMPRESA:
      - Ofrecemos los apartamentos, casas y fincas más exclusivos de Medellín (El Poblado, Guatapé, Santa Fe de Antioquia).
      - También gestionamos vehículos acuáticos de lujo en la represa de Guatapé.
      - Nuestros socios directos son Andrea y Gustavo. Si alguien quiere reservar o ver una propiedad, dile que deben contactarlos directamente.
      - Andrea y Gustavo son expertos en hospitalidad premium.
      
      REGLAS DE RESPUESTA:
      - Responde SIEMPRE en Español, a menos que el usuario te hable en Inglés.
      - Sé conciso pero elegante.
      - Para ver el catálogo completo, indícales que usen el menú de arriba ("Apartamentos", "Fincas", "Vehículos").
      - No inventes precios. Si preguntan, diles que pueden verlos en los detalles de cada propiedad o consultarlo con un socio.
      
      Usuario pregunta: "${input}"`;

      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'ai', content: 'Lo siento, tuve un pequeño problema de conexión. ¿Podrías repetirme eso?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] glass-card rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in border-accent-500/30">
          <div className="bg-gradient-to-r from-emerald-deep to-paradise-900 p-4 flex items-center justify-between border-b border-accent-500/20">
            <div className="flex items-center gap-2">
               <div className="bg-accent-500/20 p-1.5 rounded-lg text-accent-400">
                 <Sparkles size={16} />
               </div>
                <div>
                  <p className="text-xs font-bold text-paradise-50 uppercase tracking-widest">Paradise Copilot</p>
                  <p className="text-[9px] text-accent-400 font-bold uppercase">Online Now</p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-paradise-400 hover:text-paradise-100">
               <X size={20} />
             </button>
           </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
            {loading && (
               <div className="flex gap-2 text-accent-400 animate-pulse text-xs font-bold px-4">
                 <Loader2 size={14} className="animate-spin" /> Copiloto pensando...
               </div>
            )}
          </div>

          <div className="p-4 border-t border-paradise-800 bg-paradise-950/50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregúntame por una propiedad..."
                className="w-full bg-paradise-900 border border-paradise-700 rounded-2xl pl-4 pr-12 py-3 text-sm focus:border-accent-500 outline-none"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-2 p-1.5 bg-accent-500 rounded-xl text-white hover:bg-accent-600 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${
          isOpen ? 'bg-paradise-800 rotate-90 scale-90' : 'bg-gradient-to-br from-accent-500 to-accent-600 hover:scale-110 hover:shadow-accent-500/40'
        }`}
      >
        {isOpen ? (
          <X size={28} className="text-accent-400" />
        ) : (
          <div className="relative">
            <MessageSquare size={28} className="text-white group-hover:animate-bounce" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-glow rounded-full border-2 border-accent-600 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}
