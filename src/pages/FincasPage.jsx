// --------------------------------------------------------
// FincasPage — Country estates & recreational properties
// --------------------------------------------------------
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';
import { Search, Mountain } from 'lucide-react';

const DEMO_FINCAS = [
  {
    id: 'f1',
    title: 'Finca Premium en el Eje Cafetero',
    price: 3800000000,
    location: 'Quindío',
    neighborhood: 'Salento',
    bedrooms: 6,
    bathrooms: 5,
    area_m2: 5000,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'],
    category: 'finca',
    status: 'available',
  },
  {
    id: 'f2',
    title: 'Hacienda con Lago Privado',
    price: 6500000000,
    location: 'Antioquia',
    neighborhood: 'Rionegro',
    bedrooms: 8,
    bathrooms: 6,
    area_m2: 12000,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'],
    category: 'finca',
    status: 'available',
  },
  {
    id: 'f3',
    title: 'Eco-Finca Moderna en Santander',
    price: 2200000000,
    location: 'Santander',
    neighborhood: 'Mesa de los Santos',
    bedrooms: 4,
    bathrooms: 3,
    area_m2: 8000,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'],
    category: 'finca',
    status: 'available',
  },
];

export default function FincasPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFincas();
  }, []);

  async function fetchFincas() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('category', 'finca')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data?.length ? data : DEMO_FINCAS);
    } catch {
      setProperties(DEMO_FINCAS);
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Mountain size={28} className="text-accent-400" />
          <h1 className="heading-display text-3xl md:text-4xl text-paradise-50">Fincas Exclusivas</h1>
        </div>
        <p className="text-paradise-400">Retiros campestres y propiedades de recreo de alta gama</p>
      </div>

      <div className="glass rounded-xl p-3 flex items-center gap-3 mb-8">
        <Search size={18} className="text-paradise-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar fincas por nombre o ubicación..."
          className="flex-1 bg-transparent text-paradise-100 text-sm placeholder-paradise-500 outline-none py-1"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-paradise-500 py-16">
              No se encontraron fincas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
