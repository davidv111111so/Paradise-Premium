// --------------------------------------------------------
// WaterVehiclesPage — Boats, pontoons & water experiences
// --------------------------------------------------------
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';
import { Search, Anchor } from 'lucide-react';

const DEMO_VEHICLES = [
  {
    id: 'w1',
    title: 'Yate de Lujo 42ft',
    price: 850000000,
    location: 'Cartagena',
    neighborhood: 'Marina Santa Cruz',
    bedrooms: 2,
    bathrooms: 1,
    area_m2: 38,
    pet_friendly: false,
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80'],
    category: 'water_vehicle',
    status: 'available',
  },
  {
    id: 'w2',
    title: 'Pontón Party Premium',
    price: 320000000,
    location: 'Guatapé',
    neighborhood: 'Embalse Peñol',
    bedrooms: 0,
    bathrooms: 1,
    area_m2: 28,
    pet_friendly: true,
    images: ['https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80'],
    category: 'water_vehicle',
    status: 'available',
  },
  {
    id: 'w3',
    title: 'Lancha Deportiva Speed Master',
    price: 480000000,
    location: 'San Andrés',
    neighborhood: 'Bahía Sardina',
    bedrooms: 0,
    bathrooms: 0,
    area_m2: 22,
    pet_friendly: false,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'],
    category: 'water_vehicle',
    status: 'available',
  },
];

export default function WaterVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('category', 'water_vehicle')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data?.length ? data : DEMO_VEHICLES);
    } catch {
      setVehicles(DEMO_VEHICLES);
    } finally {
      setLoading(false);
    }
  }

  const filtered = vehicles.filter(
    (v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Anchor size={28} className="text-accent-400" />
          <h1 className="heading-display text-3xl md:text-4xl text-paradise-50">
            Vehículos Acuáticos
          </h1>
        </div>
        <p className="text-paradise-400">Botes, yates y pontones para experiencias náuticas premium</p>
      </div>

      <div className="glass rounded-xl p-3 flex items-center gap-3 mb-8">
        <Search size={18} className="text-paradise-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o ubicación..."
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
          {filtered.map((v) => (
            <PropertyCard key={v.id} property={v} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-paradise-500 py-16">
              No se encontraron vehículos acuáticos.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
