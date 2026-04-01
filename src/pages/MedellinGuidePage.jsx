// --------------------------------------------------------
// MedellinGuidePage — Orange Accents & All Local Images
// --------------------------------------------------------
import { MapPin, Compass } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const PLACES = [
  { id: 'provenza', name: 'Provenza', img: '/assets/medellin/provenza.jpg' },
  { id: 'la70', name: 'La 70', img: '/assets/medellin/la70.jpg' },
  { id: 'comuna13', name: 'Comuna 13', img: '/assets/medellin/comuna13.jpg' },
  { id: 'guatape', name: 'Guatapé', img: '/assets/medellin/guatape.jpg' },
  { id: 'rioclaro', name: 'Río Claro', img: '/assets/medellin/rioclaro.jpg' },
  { id: 'sabaneta', name: 'Sabaneta', img: '/assets/medellin/sabaneta.jpg' },
  { id: 'parquearvi', name: 'Parque Arví', img: '/assets/medellin/parquearvi.jpg' },
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
  },
  sabaneta: {
    es: 'El municipio más pequeño de Colombia con la mejor vida nocturna.',
    en: 'Colombia\'s smallest municipality with the best nightlife.',
    tag: 'Local'
  },
  parquearvi: {
    es: 'Naturaleza y aventura a minutos del centro por metrocable.',
    en: 'Nature and adventure just minutes from downtown by cable car.',
    tag: 'Naturaleza'
  }
};

const HIDDEN_GEMS = [
  { 
    name: 'Pergamino Cafe', 
    type: 'Café de Especialidad', 
    desc: 'El epicentro de la cultura del café en El Poblado.',
    img: 'https://images.unsplash.com/photo-1501339819358-ee83cede5bb2?w=800&q=80'
  },
  { 
    name: 'El Social', 
    type: 'Bar Tradicional', 
    desc: 'Una esquina mítica donde la tradición paisa se encuentra con la modernidad.',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'
  },
  { 
    name: 'Oci.Mde', 
    type: 'Gastronomía Autor', 
    desc: 'Cocina lenta y sabores profundos en un ambiente industrial sofisticado.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'
  }
];

export default function MedellinGuidePage() {
  const { lang = 'es' } = useOutletContext() || {};

  return (
    <div className="p-6 md:p-14 animate-fade-in bg-paradise-950 pb-40">
      <div className="mb-20 max-w-4xl">
        <h1 className="heading-display text-5xl md:text-6xl text-paradise-50 mb-6 tracking-tight leading-none uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lang === 'es' ? 'Guía de' : 'Guide to'}{' '}
          <span className="heading-orange" style={{ WebkitTextFillColor: 'unset' }}>
            <span className="heading-orange">Medellín</span>
          </span>
        </h1>
        <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-gold-400 mb-8" />
        <p className="text-paradise-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          {lang === 'es' ? 'Los destinos imperdibles seleccionados por nuestros expertos locales.' : 'Unmissable destinations selected by our local experts.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mb-32">
        {PLACES.map((place, i) => (
          <div key={i} className="group relative rounded-[40px] overflow-hidden bg-paradise-900/10 border border-white/5 hover:border-orange-500/20 transition-all duration-1000">
            <div className="relative h-[550px] overflow-hidden">
               <img 
                 src={place.img} 
                 alt={place.name} 
                 className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 brightness-[0.7] group-hover:brightness-95"
                 decoding="async"
               />
               
               <div className="absolute top-10 right-10">
                  <div className="bg-orange-500/20 backdrop-blur-md text-orange-300 text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-widest border border-orange-500/20">
                    {CONTENT[place.id].tag}
                  </div>
               </div>

               <div className="absolute inset-0 bg-gradient-to-t from-paradise-950 via-paradise-950/20 to-transparent" />

               <div className="absolute bottom-12 left-10 right-10">
                  <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tighter uppercase leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{place.name}</h3>
                  <p className="text-paradise-300 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 max-w-[80%]">
                    {lang === 'es' ? CONTENT[place.id].es : CONTENT[place.id].en}
                  </p>
                  <button className="flex items-center gap-3 text-orange-400 text-[10px] font-bold uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all">
                    {lang === 'es' ? 'Ver Detalles' : 'See Details'} <Compass size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Gems Section */}
      <section className="max-w-7xl mx-auto border-t border-white/5 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-paradise-50 uppercase tracking-tighter mb-4">
              Hidden Gems <span className="text-orange-500 font-serif italic lowercase font-light">en El Poblado</span>
            </h2>
            <p className="text-paradise-400 max-w-xl">Donde los locales realmente pasan el tiempo. Una selección curada de spots exclusivos.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <MapPin size={18} className="text-orange-500" />
            <span className="text-xs font-bold text-paradise-200 uppercase tracking-widest">Secret Spots 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {HIDDEN_GEMS.map((gem, i) => (
             <div key={i} className="group glass-card rounded-[32px] p-6 hover:bg-orange-500/5 hover:border-orange-500/30 transition-all duration-500">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img src={gem.img} alt={gem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">{gem.type}</h4>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{gem.name}</h3>
                <p className="text-paradise-400 text-sm leading-relaxed">{gem.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
