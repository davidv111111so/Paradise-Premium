import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-4 p-4 rounded-2xl border min-w-[300px] shadow-2xl animate-in fade-in slide-in-from-right-10 duration-300
              ${toast.type === 'success' ? 'bg-[#1A4D2E] border-emerald-500/30 text-emerald-50' : ''}
              ${toast.type === 'error' ? 'bg-rose-950 border-rose-500/30 text-rose-50' : ''}
              ${toast.type === 'info' ? 'bg-paradise-950 border-paradise-500/30 text-paradise-50' : ''}
            `}
          >
            <div className={`p-2 rounded-xl bg-white/10`}>
              {toast.type === 'success' && <CheckCircle size={18} className="text-emerald-400" />}
              {toast.type === 'error' && <XCircle size={18} className="text-rose-400" />}
              {toast.type === 'info' && <Info size={18} className="text-paradise-400" />}
            </div>
            
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-0.5">
                {toast.type === 'success' ? 'Éxito' : toast.type === 'error' ? 'Error' : 'Notificación'}
              </p>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} className="opacity-40" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
