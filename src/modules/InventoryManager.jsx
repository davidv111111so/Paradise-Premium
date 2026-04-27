import { useState, useEffect } from 'react';
import { getProperties, saveInventory, getInventory } from '../lib/store';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Search, 
  Box, 
  ChevronRight, 
  ArrowLeft,
  ClipboardList,
  Save
} from 'lucide-react';

const DEFAULT_INVENTORY = [
  { id: 1, name: 'Llaves de entrada', count: 2, category: 'Seguridad' },
  { id: 2, name: 'Sábanas Juego Completo', count: 4, category: 'Dormitorio' },
  { id: 3, name: 'Toallas de baño', count: 6, category: 'Baño' },
  { id: 4, name: 'Vasos de cristal', count: 8, category: 'Cocina' },
  { id: 5, name: 'Platos de cena', count: 8, category: 'Cocina' },
  { id: 6, name: 'Control remoto TV', count: 2, category: 'Tecnología' },
  { id: 7, name: 'Manual de la casa', count: 1, category: 'Info' },
];

export default function InventoryManager() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState({ name: '', count: 1, category: 'General' });

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    const data = await getProperties();
    setProperties(data);
    setLoading(false);
  }

  const openInventory = async (property) => {
    setSelectedProperty(property);
    const saved = await getInventory(property.id);
    if (saved) {
      setInventory(saved);
    } else {
      setInventory(DEFAULT_INVENTORY);
    }
  };

  const handleSave = async () => {
    try {
      await saveInventory(selectedProperty.id, inventory);
      alert('Inventario guardado con éxito para ' + selectedProperty.title);
    } catch (e) {
      alert('Error al guardar el inventario.');
    }
  };

  const addItem = () => {
    if (!newItem.name) return;
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setNewItem({ name: '', count: 1, category: 'General' });
  };

  const removeItem = (id) => {
    setInventory(inventory.filter(i => i.id !== id));
  };

  const updateCount = (id, delta) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
  };

  if (selectedProperty) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedProperty(null)}
          className="flex items-center gap-2 text-paradise-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Volver al listado
        </button>

        <div className="glass-card rounded-3xl p-8 border-accent-500/20 bg-accent-500/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <img src={selectedProperty.image || selectedProperty.images?.[0]} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
              <div>
                <h3 className="text-xl font-black text-white leading-none mb-2">{selectedProperty.title}</h3>
                <p className="text-xs text-paradise-400 flex items-center gap-2">
                  <ClipboardList size={12} className="text-accent-500" /> Control de Inventario Activo
                </p>
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-accent-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/20"
            >
              <Save size={18} /> Guardar Cambios
            </button>
          </div>

          <div className="space-y-8">
            {/* Add New */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-paradise-900/40 p-4 rounded-2xl border border-white/5">
              <div className="md:col-span-6">
                <input 
                  type="text" 
                  placeholder="Nombre del item (ej: Vasos de cristal)"
                  className="w-full bg-paradise-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-accent-500/30"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="md:col-span-3">
                <select 
                  className="w-full bg-paradise-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-paradise-300 outline-none focus:border-accent-500/30"
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                >
                  <option>General</option>
                  <option>Cocina</option>
                  <option>Baño</option>
                  <option>Dormitorio</option>
                  <option>Seguridad</option>
                  <option>Mobiliario</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <button 
                  onClick={addItem}
                  className="w-full py-2 bg-paradise-800 text-paradise-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-paradise-700 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Añadir
                </button>
              </div>
            </div>

            {/* List */}
            <div className="rounded-2xl overflow-hidden border border-white/5">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-paradise-500">Categoría</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-paradise-500">Artículo</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-paradise-500 text-center">Cantidad</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-paradise-500 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-black bg-paradise-900 px-2 py-1 rounded text-paradise-500 uppercase">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-paradise-100">{item.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => updateCount(item.id, -1)} className="w-8 h-8 rounded-lg bg-paradise-900 flex items-center justify-center text-paradise-400 hover:text-white transition-colors">-</button>
                          <span className="w-8 text-center font-black text-white">{item.count}</span>
                          <button onClick={() => updateCount(item.id, 1)} className="w-8 h-8 rounded-lg bg-paradise-900 flex items-center justify-center text-paradise-400 hover:text-white transition-colors">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => removeItem(item.id)} className="p-2 text-paradise-500 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-black text-paradise-50 uppercase tracking-tighter flex items-center gap-3">
          <Box className="text-accent-500" /> Inventario de Propiedades
        </h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-paradise-500" size={14} />
          <input 
            type="text" 
            placeholder="Buscar propiedad..." 
            className="w-full bg-paradise-900/60 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-accent-500/30"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map(p => (
          <button 
            key={p.id}
            onClick={() => openInventory(p)}
            className="group flex items-center justify-between p-4 glass-card rounded-2xl border-white/5 hover:border-accent-500/30 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-paradise-900 overflow-hidden border border-white/5">
                <img src={p.image || p.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">{p.title}</p>
                <p className="text-[10px] text-paradise-500 uppercase tracking-widest font-black">{p.neighborhood || p.location}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-paradise-600 group-hover:text-accent-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
