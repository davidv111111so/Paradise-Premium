// --------------------------------------------------------
// PublishPage — Con selector de Categoría y Multi-idioma
// --------------------------------------------------------
import { useState } from 'react';
import { Camera, Video, Plus, Trash2, Home, Building2, Ship, MapPin, DollarSign, Waves } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function PublishPage() {
  const { lang, t } = useOutletContext();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    category: 'apartment',
    videoUrl: '',
    beds: '',
    baths: '',
    area: '',
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const CATEGORIES = [
    { id: 'apartment', label: t.nav_apartments, icon: Building2 },
    { id: 'finca', label: t.nav_fincas, icon: Home },
    { id: 'vehicle', label: t.nav_vehicles, icon: Ship },
  ];

  const AUTHORIZED_EMAILS = ['marlon@paradise.com', 'andrea@paradise.com', 'gustavo@paradise.com'];
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    const userEmail = 'marlon@paradise.com'; // Placeholder

    if (!AUTHORIZED_EMAILS.includes(userEmail)) {
      alert(lang === 'es' ? 'Solo Marlon, Andrea y Gustavo pueden publicar.' : 'Only Marlon, Andrea, and Gustavo can publish.');
      return;
    }

    setLoading(true);
    try {
      // Logic for supabase insertion would go here
      alert(lang === 'es' ? '¡Propiedad publicada con éxito!' : 'Property published successfully!');
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
          {lang === 'es' ? 'Acceso exclusivo para Marlon, Andrea y Gustavo.' : 'Exclusive access for Marlon, Andrea, and Gustavo.'}
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
                <span className="text-[10px] font-bold text-paradise-600 group-hover:text-emerald-500 uppercase">Subir Foto</span>
                <input type="file" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </section>

          <section className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <MapPin size={16} /> 3. {lang === 'es' ? 'Información General' : 'General Information'}
            </h3>
            <div className="space-y-6">
              <input type="text" placeholder={lang === 'es' ? "Título del anuncio (ej. Penthouse en El Poblado)" : "Listing Title"} className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder={lang === 'es' ? "Precio Alquiler (Mensual)" : "Monthly Rent"} className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <input type="text" placeholder={lang === 'es' ? "Barrio / Sector" : "Neighborhood"} className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <textarea placeholder={lang === 'es' ? "Descripción detallada..." : "Detailed description..."} className="input-field min-h-[150px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
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
            className="w-full btn-primary py-5 text-sm uppercase tracking-[0.2em] font-black shadow-emerald-500/20 shadow-2xl disabled:opacity-50"
          >
            {loading ? (lang === 'es' ? 'Publicando...' : 'Publishing...') : (lang === 'es' ? 'Publicar Anuncio' : 'Publish Listing')}
          </button>
        </div>
      </div>
    </div>
  );
}
