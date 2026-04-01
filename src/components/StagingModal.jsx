import { X, ImagePlus } from 'lucide-react';
import VirtualStaging from '../modules/VirtualStaging';

export default function StagingModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-paradise-950/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-card border-accent-500/30 rounded-[40px] overflow-hidden flex flex-col shadow-3xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-accent-500/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <ImagePlus className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-paradise-50 uppercase tracking-tighter">
                {lang === 'es' ? 'Herramienta de Staging Virtual' : 'Virtual Staging Tool'}
              </h2>
              <p className="text-xs text-accent-400 font-bold uppercase tracking-widest">Powered by AI</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-paradise-900/50 hover:bg-red-500/20 hover:text-red-400 rounded-2xl transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-paradise-950/40">
          <VirtualStaging />
        </div>

        <div className="p-6 border-t border-white/5 bg-paradise-900/20 text-center">
          <p className="text-[10px] text-paradise-500 font-bold uppercase tracking-[0.2em]">
            {lang === 'es' 
              ? 'Las imágenes procesadas se guardan en el servidor de Paradise Premium.' 
              : 'Processed images are stored on Paradise Premium servers.'}
          </p>
        </div>
      </div>
    </div>
  );
}
