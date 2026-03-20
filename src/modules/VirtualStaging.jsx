// --------------------------------------------------------
// VirtualStaging — Módulo A: Drag & drop image upload
// --------------------------------------------------------
import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, ImagePlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Placeholder for future Virtual Staging / Autoenhance.ai integration.
 * Currently uploads images to Supabase Storage.
 */
async function processImage(fileUrl) {
  // TODO: Integrate Virtual Staging AI or Autoenhance.ai API
  // The fileUrl from Supabase Storage would be sent to the external API.
  // For now, return the original URL.
  return { enhanced: false, url: fileUrl };
}

export default function VirtualStaging() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
  }

  function handleFileSelect(e) {
    const selected = Array.from(e.target.files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (selected.length) setFiles((prev) => [...prev, ...selected]);
  }

  async function handleUpload() {
    if (!files.length) return;
    setUploading(true);
    setError('');
    const newResults = [];

    try {
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data, error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file, { contentType: file.type });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(data.path);

        const result = await processImage(urlData.publicUrl);
        newResults.push({ name: file.name, ...result });
      }
      setResults(newResults);
      setFiles([]);
    } catch (err) {
      setError(
        err.message || 'Error al subir imágenes. Verifica tu configuración de Supabase Storage.'
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-paradise-50 mb-1">
          Staging Virtual & Mejora de Imágenes
        </h3>
        <p className="text-sm text-paradise-400">
          Sube fotos de propiedades vacías o mal iluminadas para mejorarlas con IA
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? 'border-accent-500 bg-accent-500/5'
            : 'border-paradise-600/50 hover:border-paradise-500/70 hover:bg-paradise-800/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <ImagePlus size={40} className="mx-auto mb-4 text-paradise-400" />
        <p className="text-paradise-200 font-medium mb-1">
          Arrastra tus imágenes aquí
        </p>
        <p className="text-paradise-500 text-sm">
          o haz clic para seleccionar archivos (JPG, PNG, WebP)
        </p>
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-paradise-300">
            {files.length} archivo{files.length > 1 ? 's' : ''} seleccionado{files.length > 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-3">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-paradise-700/40 text-sm text-paradise-200"
              >
                <Upload size={14} className="text-accent-400" />
                <span className="max-w-[150px] truncate">{f.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Subiendo...
              </>
            ) : (
              <>
                <Upload size={16} /> Subir y Procesar
              </>
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-error text-sm p-3 rounded-lg bg-error/10">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-success flex items-center gap-2">
            <CheckCircle2 size={16} /> Imágenes subidas exitosamente
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <div key={i} className="glass-card rounded-lg overflow-hidden">
                <img src={r.url} alt={r.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <p className="text-xs text-paradise-400 truncate">{r.name}</p>
                  <p className="text-xs text-accent-400">
                    {r.enhanced ? 'Mejorada con IA' : 'Lista para procesamiento'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
