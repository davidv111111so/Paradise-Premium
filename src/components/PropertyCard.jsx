// --------------------------------------------------------
// PropertyCard — Luxury listing card component
// --------------------------------------------------------
import { MapPin, Bed, Bath, Maximize, PawPrint } from 'lucide-react';

export default function PropertyCard({ property }) {
  const {
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
    water_vehicle: 'Vehículo Acuático',
  };

  return (
    <article className="glass-card rounded-xl overflow-hidden group cursor-pointer animate-fade-in">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-paradise-900/80 text-accent-400 backdrop-blur-sm border border-accent-500/20">
          {categoryLabels[category] || category}
        </span>
        {/* Status badge */}
        {status && status !== 'available' && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-error/90 text-white">
            {status === 'rented' ? 'Arrendado' : status === 'sold' ? 'Vendido' : 'Mantenimiento'}
          </span>
        )}
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-paradise-900/90 to-transparent p-4">
          <p className="text-xl font-bold text-accent-400">{formatPrice(price)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-paradise-50 mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1.5 text-paradise-300 text-sm mb-4">
          <MapPin size={14} className="text-accent-500" />
          <span>{neighborhood || location}</span>
        </div>

        {/* Details row */}
        <div className="flex items-center gap-4 text-sm text-paradise-400">
          {bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={14} /> {bedrooms}
            </span>
          )}
          {bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={14} /> {bathrooms}
            </span>
          )}
          {area_m2 > 0 && (
            <span className="flex items-center gap-1">
              <Maximize size={14} /> {area_m2} m²
            </span>
          )}
          {pet_friendly && (
            <span className="flex items-center gap-1 text-success">
              <PawPrint size={14} /> Mascotas
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
