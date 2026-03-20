// --------------------------------------------------------
// HomePage — Limpieza de Métricas y Estilo Premium
// --------------------------------------------------------
import { Search, Building2, Trees, Ship, Star, Award, MapPin, ChevronRight, Zap } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';

const CATEGORIES = [
  { id: 'apts', icon: Building2, to: '/apartments' },
  { id: 'fincas', icon: Trees, to: '/fincas' },
  { id: 'water', icon: Ship, to: '/water-vehicles' },
];

const RECENT_PROPERTIES = [
  {
    id: 1,
    title: 'Penthouse Provenza Luxury',
    price: '12.000.000',
    location: 'El Poblado',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tag: 'Premium'
  },
  {
    id: 2,
    title: 'Minimalist Loft Laureles',
    price: '4.500.000',
    location: 'Laureles',
    img: 'https://images.unsplash.com/photo-1600607687940-4e524cb35201?auto=format&fit=crop&w=800&q=80',
    tag: 'Modern'
  }
];

export default function HomePage() {
  const { lang, t } = useOutletContext();

  const CAT_INFO = [
    { title: t.cat_apartments, count: '30+' },
    { title: t.cat_fincas, count: '15+' },
    { title: t.cat_vehicles, count: '5+' },
  ];

  return (
    <div className="flex flex-col animate-fade-in relative">
      
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover brightness-[0.3] scale-105">
            <source src="https://cdn.pixabay.com/vimeo/328946114/summer-23912.mp4?width=1280&hash=1d8b1b8e1f5d6f6e8b4e7e6a4b1e5a5a1b1b1b1b" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-paradise-950 via-paradise-950/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <h1 className="heading-display text-5xl md:text-6xl lg:text-[5.5rem] text-paradise-50 leading-[1.05] mb-8">
              {t.heroTitle_1} <br />
              <span className="text-emerald-glow font-serif italic lowercase opacity-90">{t.heroTitle_2}</span> <br />
              {t.heroTitle_3}
            </h1>
            <p className="text-paradise-200 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light tracking-wide">
              {t.heroDesc}
            </p>

            <div className="glass p-2 rounded-[28px] flex items-center gap-2 max-w-2xl border border-white/10 shadow-3xl hover:border-accent-500/30 transition-all group">
              <div className="flex-1 flex items-center gap-4 px-6">
                <Search size={22} className="text-accent-500 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  placeholder={lang === 'es' ? '¿A dónde quieres ir hoy?' : 'Where to today?'}
                  className="w-full bg-transparent border-none text-paradise-50 placeholder:text-paradise-500 focus:outline-none text-base font-medium"
                />
              </div>
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-black uppercase tracking-[0.2em] text-[11px] px-12 py-4 rounded-[22px] transition-all shadow-xl shadow-accent-500/20 active:scale-95">
                {t.btnSearch}
              </button>
            </div>
          </div>

          {/* MÉTRICAS (SIN BACKGROUND, SOLO TEXTO) */}
          <div className="lg:col-span-2 flex flex-col gap-12 items-end lg:pr-12">
            <div className="text-right">
               <p className="text-7xl font-black text-emerald-glow mb-1 tracking-tighter">50+</p>
               <p className="text-[11px] text-paradise-300 font-black uppercase tracking-[0.4em] opacity-80">{lang === 'es' ? 'Propiedades Premium' : 'Premium Properties'}</p>
            </div>
            
            <div className="text-right translate-x-[-20%]">
               <p className="text-7xl font-black text-paradise-50 mb-1 tracking-tighter">98%</p>
               <p className="text-[11px] text-accent-400 font-black uppercase tracking-[0.4em] opacity-80">{lang === 'es' ? 'Satisfacción' : 'Satisfaction'}</p>
            </div>

            <div className="text-right">
               <p className="text-7xl font-black text-paradise-50 mb-1 tracking-tighter">12+</p>
               <p className="text-[11px] text-paradise-300 font-black uppercase tracking-[0.4em] opacity-80">{lang === 'es' ? 'Años de Experiencia' : 'Years of Experience'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categorías (Transparentes & Estilizadas) ─── */}
      <section className="px-6 md:px-12 -mt-20 relative z-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              to={cat.to}
              className="group flex flex-col items-center p-12 rounded-[50px] transition-all duration-700 hover:bg-white/[0.02] border border-transparent hover:border-white/5"
            >
              <div className="w-28 h-28 flex items-center justify-center text-paradise-400 mb-8 group-hover:scale-110 transition-transform">
                <cat.icon size={72} strokeWidth={0.75} className="group-hover:text-accent-400 transition-colors" />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.5em] mb-4 text-paradise-100 group-hover:text-white transition-colors">{CAT_INFO[i].title}</h3>
              <p className="text-[10px] text-paradise-500 font-bold uppercase tracking-widest">{CAT_INFO[i].count} {t.cat_listings}</p>
            </Link>
          ))}
        </div>

        {/* PROPIEDADES DESTACADAS */}
        <div className="max-w-7xl mx-auto mt-32">
           <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10">
              <div>
                <h2 className="text-4xl font-bold text-paradise-50 mb-3 tracking-tight">{lang === 'es' ? 'Selección Exclusiva' : 'Exclusive Selection'}</h2>
                <p className="text-paradise-400 text-lg font-light tracking-wide">{lang === 'es' ? 'Joyas ocultas en los mejores sectores.' : 'Hidden gems in the best areas.'}</p>
              </div>
              <Link to="/apartments" className="btn-primary-outline text-[10px] px-8 py-3 rounded-full uppercase font-black tracking-widest hover:bg-accent-500 hover:text-white transition-all">
                {lang === 'es' ? 'Ver Catálogo' : 'View Catalog'}
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {RECENT_PROPERTIES.map((prop) => (
                <Link 
                  key={prop.id} 
                  to={`/property/${prop.id}`} 
                  className="group block relative rounded-[48px] overflow-hidden shadow-2xl transition-all duration-1000"
                >
                   <div className="relative h-[550px] overflow-hidden">
                      <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-paradise-950 via-paradise-950/20 to-transparent opacity-90" />
                      
                      <div className="absolute top-10 left-10">
                         <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest">
                           {prop.tag}
                         </div>
                      </div>

                      <div className="absolute bottom-12 left-12 right-12">
                         <div className="flex justify-between items-end mb-6">
                            <div>
                               <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors uppercase tracking-tight">{prop.title}</h3>
                               <p className="flex items-center gap-2 text-paradise-300 font-medium">
                                 <MapPin size={18} className="text-accent-500" /> {prop.location}, Medellín
                               </p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] text-accent-400 font-black uppercase tracking-widest mb-1">Desde</p>
                               <p className="text-3xl font-black text-white">${prop.price}</p>
                            </div>
                         </div>
                         <div className="h-1 w-0 group-hover:w-full bg-accent-500 transition-all duration-1000 rounded-full shadow-emerald-glow" />
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
