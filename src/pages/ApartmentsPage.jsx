// --------------------------------------------------------
// ApartmentsPage — Grid of luxury apartments & houses
// --------------------------------------------------------
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';
import { Search, SlidersHorizontal } from 'lucide-react';

// Demo data used when Supabase is not configured
const DEMO_PROPERTIES = [
  {
    id: '1',
    title: 'Penthouse de Lujo en El Poblado',
    price: 2500000000,
    location: 'Medellín',
    neighborhood: 'El Poblado',
    bedrooms: 4,
    bathrooms: 3,
    area_m2: 220,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    category: 'apartment',
    status: 'available',
  },
  {
    id: '2',
    title: 'Casa Moderna en Laureles',
    price: 1800000000,
    location: 'Medellín',
    neighborhood: 'Laureles',
    bedrooms: 3,
    bathrooms: 2,
    area_m2: 180,
    pet_friendly: false,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    category: 'house',
    status: 'available',
  },
  {
    id: '3',
    title: 'Apartamento con Vista al Mar',
    price: 3200000000,
    location: 'Cartagena',
    neighborhood: 'Bocagrande',
    bedrooms: 3,
    bathrooms: 3,
    area_m2: 200,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    category: 'apartment',
    status: 'available',
  },
  {
    id: '4',
    title: 'Loft Industrial Premium',
    price: 950000000,
    location: 'Bogotá',
    neighborhood: 'Chapinero',
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 120,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    category: 'apartment',
    status: 'available',
  },
  {
    id: '5',
    title: 'Villa Exclusiva con Piscina',
    price: 4500000000,
    location: 'Barranquilla',
    neighborhood: 'Alto Prado',
    bedrooms: 5,
    bathrooms: 4,
    area_m2: 350,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    category: 'house',
    status: 'available',
  },
  {
    id: '6',
    title: 'Duplex Contemporáneo',
    price: 1250000000,
    location: 'Medellín',
    neighborhood: 'Envigado',
    bedrooms: 3,
    bathrooms: 2,
    area_m2: 165,
    pet_friendly: false,
    images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
    category: 'apartment',
    status: 'available',
  },
];

export default function ApartmentsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('category', ['apartment', 'house'])
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data?.length ? data : DEMO_PROPERTIES);
    } catch {
      // Fallback to demo data if Supabase is not configured
      setProperties(DEMO_PROPERTIES);
    } finally {
      setLoading(false);
    }
  }

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-display text-3xl md:text-4xl text-paradise-50 mb-2">
          Apartamentos & Casas
        </h1>
        <p className="text-paradise-400">
          Residencias de lujo seleccionadas para los más exigentes
        </p>
      </div>

      {/* Search / Filters bar */}
      <div className="glass rounded-xl p-3 flex items-center gap-3 mb-8">
        <Search size={18} className="text-paradise-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, barrio o ciudad..."
          className="flex-1 bg-transparent text-paradise-100 text-sm placeholder-paradise-500 outline-none py-1"
        />
        <button className="p-2 rounded-lg hover:bg-paradise-700 text-paradise-400 transition-colors">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-paradise-500 py-16">
              No se encontraron propiedades con ese criterio.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
