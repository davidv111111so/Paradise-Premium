// --------------------------------------------------------
// MedellinGuidePage — Rutas Locales Finales Comprobadas
// --------------------------------------------------------
import { MapPin, Compass } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const PLACES = [
  { id: 'provenza', name: 'Provenza', img: '/assets/medellin/provenza.jpg' },
  { id: 'la70', name: 'La 70', img: '/assets/medellin/la70.jpg' },
  { id: 'comuna13', name: 'Comuna 13', img: '/assets/medellin/comuna13.jpg' },
  { id: 'guatape', name: 'Guatapé', img: '/assets/medellin/guatape.jpg' },
  { id: 'rioclaro', name: 'Río Claro', img: '/assets/medellin/rioclaro.jpg' },
];

const CONTENT = {
  provenza: {
    es: 'La calle más cool del mundo. Un oasis de vegetación y lujo gourmet.',
    en: 'The coolest street in the world. An oasis of luxury greenery and gourmet dining.',
    tag: 'Trending'
  },
  la70: {
    es: 'El corazón de la fiesta paisa. Auténtica rumba de Medellín.',
    en: 'The heart of the paisa party. Authentic Medellin nightlife.',
    tag: 'Fiesta'
  },
  comuna13: {
    es: 'Historias de resiliencia y arte urbano espectacular.',
    en: 'Stories of resilience and spectacular urban art.',
    tag: 'Cultura'
  },
  guatape: {
    es: 'La mejor vista del mundo desde el Peñol.',
    en: 'The best view in the world from the Rock.',
    tag: 'Paisaje'
  },
  rioclaro: {
    es: 'Aventura en un cañón de mármol y aguas cristalinas.',
    en: 'Adventure in a marble canyon and crystal clear waters.',
    tag: 'Aventura'
  }
};

export default function MedellinGuidePage() {
  const { lang = 'es' } = useOutletContext() || {};

  return (
    <div className="p-6 md:p-14 animate-fade-in bg-paradise-950 pb-32">
      <div className="mb-20 max-w-4xl">
        <h1 className="heading-display text-5xl md:text-6xl text-paradise-50 mb-6 tracking-tight leading-none uppercase">
          {lang === 'es' ? 'Guía de' : 'Guide to'} <span className="text-emerald-glow tracking-tighter">Medellín</span>
        </h1>
        <div className="h-0.5 w-24 bg-accent-500/50 mb-8" />
        <p className="text-paradise-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          {lang === 'es' ? 'Los destinos imperdibles seleccionados por nuestros expertos locales.' : 'Unmissable destinations selected by our local experts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {PLACES.map((place, i) => (
          <div key={i} className="group relative rounded-[40px] overflow-hidden bg-paradise-900/10 border border-white/5 hover:border-accent-500/20 transition-all duration-1000">
            <div className="relative h-[550px] overflow-hidden">
               {/* RUTAS LOCALES FINALIZADAS */}
               <img 
                 src={place.img} 
                 alt={place.name} 
                 className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 brightness-[0.7] group-hover:brightness-95"
                 decoding="async"
               />
               
               <div className="absolute top-10 right-10">
                  <div className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest border border-white/10">
                    {CONTENT[place.id].tag}
                  </div>
               </div>

               <div className="absolute inset-0 bg-gradient-to-t from-paradise-950 via-paradise-950/20 to-transparent" />

               <div className="absolute bottom-12 left-10 right-10">
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">{place.name}</h3>
                  <p className="text-paradise-300 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 max-w-[80%]">
                    {lang === 'es' ? CONTENT[place.id].es : CONTENT[place.id].en}
                  </p>
                  <button className="flex items-center gap-3 text-accent-400 text-[10px] font-black uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all">
                    {lang === 'es' ? 'Ver Detalles' : 'See Details'} <Compass size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
