import { useState } from 'react';
import { Camera, Video, Plus, Trash2, Home, Building2, Ship, MapPin, DollarSign, Waves, ListChecks } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { addProperty } from '../lib/store';

export default function PublishPage() {
  const { lang, t } = useOutletContext();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    category: 'apartment',
    videoUrl: '',
    bedrooms: '1',
    bathrooms: '1',
    area_m2: '',
    capacity: '2',
    amenities: []
  });

  const AVAILABLE_AMENITIES = [
    'Piscina', 'Jacuzzi Privado', 'Gimnasio', 'Seguridad 24/7',
    'Smart Home', 'Terraza 360°', 'Balcón', 'Cocina Integral',
    'Fibra Óptica', 'Lavandería', 'Zona BBQ', 'Aire Acondicionado',
    'Parqueadero Privado', 'Ascensor', 'Canchas Deportivas', 'Sauna / Turco',
    'Pet Friendly', 'Sala de Cine', 'Coworking', 'Vista a la Ciudad'
  ];

  const [otherAmenity, setOtherAmenity] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const CATEGORIES = [
    { id: 'apartment', label: t.nav_apartments, icon: Building2 },
    { id: 'finca', label: t.nav_fincas, icon: Home },
    { id: 'vehicle', label: t.nav_vehicles, icon: Ship },
  ];

  const AUTHORIZED_EMAILS = ['marlon@paradise.com', 'andrea@paradise.com', 'gustavo@paradise.com'];
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (am) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(am)
        ? prev.amenities.filter(a => a !== am)
        : [...prev.amenities, am]
    }));
  };

  const handlePublish = async () => {
    // In production, this would come from Auth Context
    const userEmail = prompt(lang === 'es' ? 'Ingrese su correo de socio para autorizar:' : 'Enter partner email to authorize:');

    if (!AUTHORIZED_EMAILS.includes(userEmail)) {
      alert(lang === 'es' ? 'Solo Marlon, Andrea y Gustavo pueden publicar propiedades.' : 'Only Marlon, Andrea, and Gustavo can publish.');
      return;
    }

    setLoading(true);
    try {
      const priceClean = formData.price.replace(/\D/g, '');
      const newProp = {
        title: formData.title,
        price: parseInt(priceClean || 0),
        location: formData.location,
        neighborhood: formData.location,
        description: formData.description,
        category: formData.category,
        videoUrl: formData.videoUrl,
        bedrooms: parseInt(formData.bedrooms || 0),
        bathrooms: parseInt(formData.bathrooms || 0),
        area_m2: parseInt(formData.area_m2 || 0),
        capacity: parseInt(formData.capacity || 0),
        amenities: formData.amenities,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
        status: 'available',
        isMock: false
      };

      const created = addProperty(newProp);
      alert(lang === 'es' ? '¡Propiedad publicada con éxito! Ya puedes verla en tu catálogo.' : 'Property published successfully!');
      navigate(`/property/${created.id}`);
    } catch (error) {
      console.error(error);
      alert(lang === 'es' ? 'Error al publicar.' : 'Error publishing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 animate-fade-in max-w-5xl mx-auto pb-40">
      <div className="mb-10 text-center">
        <h1 className="heading-display text-4xl text-paradise-50 mb-3">
          {lang === 'es' ? 'Publicar una Nueva' : 'Publish a New'} <span className="text-emerald-glow">{lang === 'es' ? 'Propiedad' : 'Property'}</span>
        </h1>
        <p className="text-paradise-400 font-medium">
          {lang === 'es' ? 'Acceso exclusivo para socios.' : 'Exclusive access for partners.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          
          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
             <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Plus size={16} /> 1. {lang === 'es' ? 'Selecciona Categoría' : 'Select Category'}
             </h3>
             <div className="grid grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${
                      formData.category === cat.id 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'bg-paradise-900/50 border-paradise-800 text-paradise-500 hover:border-paradise-700'
                    }`}
                  >
                    <cat.icon size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">{cat.label}</span>
                  </button>
                ))}
             </div>
          </section>

          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Camera size={16} /> 2. {lang === 'es' ? 'Galería de Imágenes' : 'Image Gallery'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(index)} className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-2xl border-2 border-dashed border-paradise-800 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-paradise-900/30 group">
                <Plus size={24} className="text-paradise-600 group-hover:text-emerald-500" />
                <span className="text-[10px] font-bold text-paradise-600 group-hover:text-emerald-500 uppercase">Añadir Foto</span>
                <input type="file" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <p className="text-xs text-paradise-500">Nota: Las fotos se guardan en alta resolución para una experiencia premium.</p>
          </section>

          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <MapPin size={16} /> 3. {lang === 'es' ? 'Información General' : 'General Information'}
            </h3>
            <div className="space-y-6">
              <input type="text" placeholder={lang === 'es' ? "Título del anuncio (ej. Penthouse en El Poblado)" : "Listing Title"} className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder={lang === 'es' ? "Precio (COP)" : "Price (COP)"} className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <input type="text" placeholder={lang === 'es' ? "Barrio / Sector / Ciudad" : "Neighborhood"} className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div>
                  <label className="block text-xs text-paradise-400 uppercase tracking-widest mb-2 font-bold">{lang === 'es' ? 'Habitaciones' : 'Beds'}</label>
                  <select className="input-field" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})}>
                     {[0,1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="bg-paradise-950">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-paradise-400 uppercase tracking-widest mb-2 font-bold">{lang === 'es' ? 'Baños' : 'Baths'}</label>
                  <select className="input-field" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})}>
                     {[0,1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="bg-paradise-950">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-paradise-400 uppercase tracking-widest mb-2 font-bold">{lang === 'es' ? 'Capacidad' : 'Capacity'}</label>
                  <select className="input-field" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})}>
                     {[2,4,6,8,10,12,15,20].map(n => <option key={n} value={n} className="bg-paradise-950">{n} Pax</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-paradise-400 uppercase tracking-widest mb-2 font-bold">{lang === 'es' ? 'Área (m²)' : 'Area'}</label>
                  <input type="number" placeholder="Ej: 120" className="input-field" value={formData.area_m2} onChange={e => setFormData({...formData, area_m2: e.target.value})} />
                </div>
              </div>

              <textarea placeholder={lang === 'es' ? "Descripción detallada..." : "Detailed description..."} className="input-field min-h-[150px] mt-4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </section>

          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ListChecks size={16} /> 4. {lang === 'es' ? 'Amenidades Adicionales' : 'Amenities'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {AVAILABLE_AMENITIES.map(am => (
                 <label key={am} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                    <input type="checkbox" checked={formData.amenities.includes(am)} onChange={() => toggleAmenity(am)} className="accent-emerald-500 w-4 h-4" />
                    <span className="text-paradise-200 text-sm font-medium">{am}</span>
                 </label>
               ))}
               <div className="flex flex-col gap-2 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{lang === 'es' ? 'Otro' : 'Other'}</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ej: Helipuerto" 
                      className="bg-transparent border-b border-emerald-500/30 text-white text-sm outline-none w-full" 
                      value={otherAmenity}
                      onChange={e => setOtherAmenity(e.target.value)}
                    />
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (otherAmenity.trim()) {
                          toggleAmenity(otherAmenity.trim());
                          setOtherAmenity('');
                        }
                      }}
                      className="p-1 bg-emerald-500 rounded-lg text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
               </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Video size={16} /> {lang === 'es' ? 'Link de Video' : 'Video Link'}
            </h3>
            <input type="text" placeholder="YouTube or Vimeo URL" className="input-field" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} />
          </section>
          
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="w-full btn-emerald py-5 text-sm uppercase tracking-[0.2em] font-black shadow-emerald-500/20 shadow-2xl disabled:opacity-50"
          >
            {loading ? (lang === 'es' ? 'Publicando...' : 'Publishing...') : (lang === 'es' ? 'Publicar Anuncio' : 'Publish Listing')}
          </button>
        </div>
      </div>
    </div>
  );
}
