// --------------------------------------------------------
// PropertyDetailPage — Con datos de ejemplo para evitar crash
// --------------------------------------------------------
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize, CheckCircle, 
  MessageCircle, Phone, Star, ChevronLeft, 
  Wifi, Car, Tv, Wind, Coffee
} from 'lucide-react';

import { getProperty } from '../lib/store';
export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = getProperty(id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-paradise-50">Propiedad no encontrada</h2>
        <Link to="/" className="text-emerald-500 mt-4 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  const formatPrice = (val) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="animate-fade-in pb-20 bg-paradise-950 min-h-screen">
      {/* Header / Nav Back */}
      <div className="sticky top-20 z-40 px-6 py-4 flex gap-4">
        <Link to="/" className="glass-card p-3 rounded-full text-emerald-400 hover:scale-110 transition-transform">
          <ChevronLeft size={24} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] mb-12 rounded-[40px] overflow-hidden shadow-2xl">
           <img src={property.images?.[0] || '/placeholder.jpg'} alt="Prop" className="w-full h-full object-cover" />
           <div className="hidden md:grid grid-rows-2 gap-4">
              <img src={property.images?.[1] || property.images?.[0]} alt="Prop" className="w-full h-full object-cover" />
              <div className="relative">
                <img src={property.images?.[2] || property.images?.[0]} alt="Prop" className="w-full h-full object-cover brightness-50" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xl">+ {property.images?.length || 0} Fotos</div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
                  {property.category || 'Alquiler Premium'}
                </span>
                <div className="flex text-emerald-400">
                  <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              <h1 className="heading-display text-4xl md:text-5xl text-paradise-50 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {property.isMock ? `(X) ${property.title}` : property.title}
              </h1>
              <div className="flex items-center gap-2 text-paradise-400 font-medium">
                <MapPin size={20} className="text-emerald-500" /> {property.neighborhood || property.location}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5">
               <div className="flex flex-col items-center gap-2">
                 <Bed className="text-emerald-400" />
                 <span className="text-paradise-50 font-bold">{property.bedrooms || 0} Alcobas</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Bath className="text-emerald-400" />
                 <span className="text-paradise-50 font-bold">{property.bathrooms || 0} Baños</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Maximize className="text-emerald-400" />
                 <span className="text-paradise-50 font-bold">{property.area_m2 || 0} m²</span>
               </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-paradise-50 mb-4 uppercase tracking-widest text-xs">Descripción</h3>
              <p className="text-paradise-300 leading-relaxed text-lg">{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-paradise-50 mb-6 uppercase tracking-widest text-xs">Amenidades Exclusivas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   {property.amenities.map((am, i) => (
                     <div key={i} className="glass-card p-4 rounded-2xl flex flex-col items-center gap-3 border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <CheckCircle size={20} className="text-emerald-500" />
                        <span className="text-[10px] text-paradise-300 font-bold uppercase tracking-widest text-center">{am}</span>
                     </div>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Panel */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="glass-card p-8 rounded-[40px] border-emerald-500/30 shadow-2xl relative overflow-hidden bg-paradise-900 border border-white/10">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px]" />
               <p className="text-[10px] text-paradise-400 font-black uppercase tracking-[0.3em] mb-4">Tarifa</p>
               <div className="flex items-end gap-2 mb-8">
                 <span className="text-5xl font-black text-paradise-50">
                    {formatPrice(property.price)}
                 </span>
               </div>

               <div className="space-y-4">
                 <button className="w-full btn-elegant py-5 rounded-3xl flex items-center justify-center gap-3 text-sm">
                   <MessageCircle size={20} /> Contactar Agente
                 </button>
                 <button className="w-full bg-white/5 hover:bg-white/10 text-paradise-200 py-5 rounded-3xl flex items-center justify-center gap-3 text-sm border border-white/5 transition-all">
                   <Phone size={20} /> Llamar ahora
                 </button>
               </div>

               <div className="mt-8 pt-8 border-t border-white/5">
                 <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=andrea" className="w-12 h-12 rounded-full border-2 border-emerald-500/30" />
                    <div>
                      <p className="text-paradise-50 font-bold">Andrea & Gustavo</p>
                      <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Paradise Agents</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
