// --------------------------------------------------------
// DescriptionGenerator — Módulo B: Gemini-powered listing copy
// --------------------------------------------------------
import { useState } from 'react';
import { getModel } from '../lib/gemini';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

const AMENITIES_OPTIONS = [
  'Piscina', 'Gimnasio', 'Parqueadero', 'Seguridad 24h', 'Zona BBQ',
  'Balcón', 'Terraza', 'Jacuzzi', 'Zona de Juegos', 'Lobby Premium',
  'Coworking', 'Sauna', 'Pet-Friendly', 'Vista Panorámica',
];

export default function DescriptionGenerator() {
  const [form, setForm] = useState({
    bedrooms: '',
    bathrooms: '',
    area: '',
    neighborhood: '',
    city: '',
    amenities: [],
    style: 'luxury',
  });
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function toggleAmenity(a) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  }

  async function generateDescription() {
    setLoading(true);
    setError('');
    setDescription('');

    try {
      const model = getModel();

      const systemPrompt = `Eres un copywriter experto en bienes raíces de lujo. Tu tarea es escribir descripciones de propiedades que sean:
- Persuasivas y evocadoras, orientadas a un público de alto poder adquisitivo
- Optimizadas para SEO (incluye keywords naturales de bienes raíces)
- En español colombiano profesional
- De 3-4 párrafos, con un tono sofisticado y aspiracional
- Include emojis sutiles para secciones
No inventes datos que no se proporcionan. Si faltan datos, enfócate en los que sí tienes.`;

      const userPrompt = `Genera una descripción inmobiliaria premium para esta propiedad:
- Habitaciones: ${form.bedrooms || 'No especificado'}
- Baños: ${form.bathrooms || 'No especificado'}
- Área: ${form.area ? form.area + ' m²' : 'No especificado'}
- Barrio: ${form.neighborhood || 'No especificado'}
- Ciudad: ${form.city || 'No especificado'}
- Amenidades: ${form.amenities.length ? form.amenities.join(', ') : 'No especificadas'}
- Estilo deseado: ${form.style === 'luxury' ? 'Ultra lujo' : form.style === 'modern' ? 'Moderno y minimalista' : 'Acogedor y familiar'}`;

      const result = await model.generateContent([systemPrompt, userPrompt]);
      const text = result.response.text();
      setDescription(text);
    } catch (err) {
      setError(
        err.message || 'Error al generar la descripción. Verifica tu API key de Gemini.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-paradise-50 mb-1">
          Generador de Descripciones IA
        </h3>
        <p className="text-sm text-paradise-400">
          Crea descripciones optimizadas para SEO con inteligencia artificial
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-paradise-400 mb-1 block">Habitaciones</label>
          <input
            type="number"
            min="0"
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            placeholder="Ej: 3"
            className="w-full px-4 py-2.5 rounded-lg bg-paradise-800/60 border border-paradise-600/40 text-paradise-100 text-sm placeholder-paradise-500 outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-paradise-400 mb-1 block">Baños</label>
          <input
            type="number"
            min="0"
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
            placeholder="Ej: 2"
            className="w-full px-4 py-2.5 rounded-lg bg-paradise-800/60 border border-paradise-600/40 text-paradise-100 text-sm placeholder-paradise-500 outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-paradise-400 mb-1 block">Área (m²)</label>
          <input
            type="number"
            min="0"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="Ej: 180"
            className="w-full px-4 py-2.5 rounded-lg bg-paradise-800/60 border border-paradise-600/40 text-paradise-100 text-sm placeholder-paradise-500 outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-paradise-400 mb-1 block">Ciudad</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Ej: Medellín"
            className="w-full px-4 py-2.5 rounded-lg bg-paradise-800/60 border border-paradise-600/40 text-paradise-100 text-sm placeholder-paradise-500 outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-paradise-400 mb-1 block">Barrio</label>
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
            placeholder="Ej: El Poblado"
            className="w-full px-4 py-2.5 rounded-lg bg-paradise-800/60 border border-paradise-600/40 text-paradise-100 text-sm placeholder-paradise-500 outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Style selector */}
      <div>
        <label className="text-xs text-paradise-400 mb-2 block">Estilo de descripción</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'luxury', label: '✨ Ultra Lujo' },
            { value: 'modern', label: '🏙️ Moderno' },
            { value: 'cozy', label: '🏡 Acogedor' },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setForm({ ...form, style: s.value })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                form.style === s.value
                  ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                  : 'bg-paradise-700/40 text-paradise-300 border border-transparent hover:bg-paradise-700/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-xs text-paradise-400 mb-2 block">Amenidades</label>
        <div className="flex flex-wrap gap-2">
          {AMENITIES_OPTIONS.map((a) => (
            <button
              key={a}
              onClick={() => toggleAmenity(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                form.amenities.includes(a)
                  ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                  : 'bg-paradise-700/40 text-paradise-400 border border-transparent hover:bg-paradise-700/60'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generateDescription}
        disabled={loading}
        className="btn-primary flex items-center gap-2 text-base px-8 py-3 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Generando...
          </>
        ) : (
          <>
            <Sparkles size={18} /> Generar Descripción Mágica
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <p className="text-error text-sm p-3 rounded-lg bg-error/10">{error}</p>
      )}

      {/* Result */}
      {description && (
        <div className="glass-card rounded-xl p-6 relative">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-paradise-700 text-paradise-400 transition-colors"
            title="Copiar al portapapeles"
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
          </button>
          <p className="text-xs text-accent-400 font-semibold uppercase tracking-widest mb-3">
            Descripción Generada
          </p>
          <div className="text-paradise-200 text-sm leading-relaxed whitespace-pre-wrap pr-10">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
