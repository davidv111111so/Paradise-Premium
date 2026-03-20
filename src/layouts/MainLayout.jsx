// --------------------------------------------------------
// MainLayout — Eliminación de Loops y Logo Local Fijo
// --------------------------------------------------------
import { NavLink, Outlet } from 'react-router-dom';
import {
  Building2, Trees, Ship, HeadphonesIcon,
  Sparkles, Menu, X, Map, Info, Globe, Gem
} from 'lucide-react';
import { useState } from 'react';
import AICopilotBubble from '../components/AICopilotBubble';
import translations from '../lib/translations';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');
  const t = translations[lang];

  const handleLangChange = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const NAV_ITEMS = [
    { to: '/apartments', label: t.nav_apartments, icon: Building2 },
    { to: '/fincas', label: t.nav_fincas, icon: Trees },
    { to: '/water-vehicles', label: t.nav_vehicles, icon: Ship },
    { to: '/medellin-guide', label: t.nav_medellin, icon: Map },
    { to: '/about', label: t.nav_about, icon: Info },
    { to: '/ai-center', label: t.nav_ai, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-paradise-950 text-paradise-50 font-sans selection:bg-accent-500 selection:text-white overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-[100] bg-paradise-950/80 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-3 flex items-center justify-between shadow-2xl">
        <NavLink to="/" className="flex items-center group">
          <div className="h-16 md:h-24 py-2 flex items-center overflow-hidden">
             {/* LOGO REAL LOCAL - SIN FALLBACKS EXTERNOS PARA EVITAR BUCLES */}
             <img 
               src="/assets/medellin/logo.jpg" 
               alt="Paradise Premium"
               className="h-full object-contain brightness-110 transition-all group-hover:scale-105"
               onError={(e) => { 
                 e.target.onerror = null; // Prevenir bucle infinito si falla
                 e.target.style.display = 'none'; // Si falla, ocultar imagen y mostrar icono de diamante
                 e.target.nextSibling.style.display = 'flex';
               }}
             />
             <div className="hidden items-center gap-3 ml-2" style={{ display: 'none' }}>
                <Gem className="text-accent-500" size={32} />
                <span className="font-black text-2xl tracking-tighter">PARADISE</span>
             </div>
          </div>
        </NavLink>

        <div className="flex items-center gap-10">
          <nav className="hidden xl:flex items-center gap-1">
             {NAV_ITEMS.map((item) => (
               <NavLink
                 key={item.to}
                 to={item.to}
                 className={({ isActive }) =>
                   `px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.25em] transition-all duration-300 border border-transparent ${
                     isActive 
                      ? 'text-accent-400 bg-accent-500/10 border-accent-500/20' 
                      : 'text-white hover:text-accent-400 hover:bg-white/5'
                   }`
                 }
               >
                 {item.label}
               </NavLink>
             ))}
          </nav>
          
          <div className="flex items-center gap-5 border-l border-white/10 pl-10">
            <button 
              onClick={handleLangChange}
              className="p-4 rounded-full hover:bg-white/5 text-paradise-300 hover:text-accent-400 transition-all border border-transparent hover:border-white/10"
            >
              <Globe size={22} />
            </button>

            <NavLink to="/publish" className="bg-white text-black hover:bg-accent-500 hover:text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95">
              {t.nav_publish}
            </NavLink>
            
            <button className="xl:hidden p-3 bg-white/10 rounded-full text-white" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Espaciador para el header fixed */}
      <div className="h-28" />

      <main className="flex-1">
        <Outlet context={{ lang, t }} />
      </main>

      <AICopilotBubble lang={lang} />

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] flex animate-fade-in shadow-3xl">
          <div className="fixed inset-0 bg-paradise-950/98 backdrop-blur-3xl" onClick={() => setMobileOpen(false)} />
          <nav className="relative z-210 w-full max-w-sm ml-auto bg-paradise-950 h-full border-l border-white/10 p-12 flex flex-col justify-center text-center">
            <button onClick={() => setMobileOpen(false)} className="absolute top-12 right-12 p-5 bg-white/5 rounded-full text-paradise-400"><X size={28} /></button>
            <div className="space-y-12">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-4xl font-black text-paradise-300 hover:text-accent-400 transition-all uppercase tracking-tighter"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
