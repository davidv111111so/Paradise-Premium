// --------------------------------------------------------
// PropertyCard — Luxury listing card component
// --------------------------------------------------------
import { MapPin, Bed, Bath, Maximize, PawPrint, Trash2 } from 'lucide-react';

export default function PropertyCard({ property, onDelete }) {
  const {
    id,
    title,
    price,
    location,
    neighborhood,
    bedrooms,
    bathrooms,
    area_m2,
    pet_friendly,
    images,
    category,
    status,
    isMock
  } = property;

  const coverImage = images?.[0] || '/placeholder-property.jpg';

  const formatPrice = (val) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);

  const categoryLabels = {
    apartment: 'Apartamento',
    house: 'Casa',
    finca: 'Finca',
    vehicle: 'Vehículo Acuático',
  };

  return (
    <article className="glass-card rounded-[30px] overflow-hidden group border border-white/5 relative">
      {/* Delete Button */}
      {onDelete && (
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(id); }}
          className="absolute z-20 top-4 right-4 bg-red-500/80 backdrop-blur-md text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-xl"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-paradise-950/80 text-emerald-400 backdrop-blur-sm border border-emerald-500/20">
          {categoryLabels[category] || category}
        </span>
        {/* Status badge */}
        {status && status !== 'available' && (
          <span className="absolute top-4 right-16 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-error/90 text-white shadow-lg">
            {status === 'rented' ? 'Arrendado' : status === 'sold' ? 'Vendido' : 'Mantenimiento'}
          </span>
        )}
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-paradise-950 to-transparent p-6 pt-12">
          <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">Desde</p>
          <p className="text-2xl font-black text-white">{formatPrice(price)} COP</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        <h3 className="text-xl font-bold text-paradise-50 mb-3 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          {isMock ? `(X) ${title}` : title}
        </h3>
        <div className="flex items-center gap-2 text-paradise-300 text-sm font-medium mb-6">
          <MapPin size={16} className="text-emerald-500" />
          <span>{neighborhood || location}</span>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-6 text-sm text-paradise-400 font-bold border-t border-white/5 pt-6 mt-auto">
          {bedrooms > 0 && (
            <span className="flex items-center gap-2">
              <Bed size={16} className="text-emerald-500" /> {bedrooms}
            </span>
          )}
          {bathrooms > 0 && (
            <span className="flex items-center gap-2">
              <Bath size={16} className="text-emerald-500" /> {bathrooms}
            </span>
          )}
          {area_m2 > 0 && (
            <span className="flex items-center gap-2">
              <Maximize size={16} className="text-emerald-500" /> {area_m2} m²
            </span>
          )}
          {pet_friendly && (
            <span className="flex items-center gap-2 text-emerald-500 ml-auto">
              <PawPrint size={16} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
