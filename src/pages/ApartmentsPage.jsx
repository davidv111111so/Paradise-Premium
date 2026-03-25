// --------------------------------------------------------
// ApartmentsPage — Grid of luxury apartments & houses
// --------------------------------------------------------
import { useState, useEffect } from 'react';
import { getProperties, removeProperty } from '../lib/store';
import PropertyCard from '../components/PropertyCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ApartmentsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  function fetchProperties() {
    try {
      const data = getProperties().filter(p => ['apartment', 'house'].includes(p.category));
      setProperties(data);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = (id) => {
    removeProperty(id);
    fetchProperties();
  };

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
            <PropertyCard key={property.id} property={property} onDelete={handleDelete} />
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
