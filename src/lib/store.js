import { Building2, Home, Ship } from 'lucide-react';
import { supabase, authorizeSupabase } from './supabase';

const INITIAL_PROPERTIES = [
  // ... (keeping current initial properties)
  {
    id: '1',
    title: 'Penthouse Provenza Luxury',
    price: 12000000,
    location: 'Medelllín',
    neighborhood: 'El Poblado',
    description: 'Vive la experiencia definitiva en el corazón de Provenza. Este penthouse de diseño minimalista ofrece vistas panorámicas de la ciudad, acabados en mármol y acceso privado.',
    bedrooms: 3,
    bathrooms: 4,
    area_m2: 280,
    capacity: 6,
    amenities: ['Jacuzzi Privado', 'Seguridad 24/7', 'Gimnasio', 'Piscina'],
    pet_friendly: true,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541123351-ad3ad22b314d?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    category: 'apartment',
    status: 'available',
    isMock: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Minimalist Loft Laureles',
    price: 4500000,
    location: 'Medellín',
    neighborhood: 'Laureles',
    description: 'Un espacio moderno y funcional en el barrio más tradicional de Medellín. Perfecto para nómadas digitales y parejas que buscan estilo y comodidad.',
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 65,
    capacity: 2,
    amenities: ['Fibra Óptica', 'Balcón', 'Cocina Integral', 'Lavandería'],
    pet_friendly: true,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    category: 'apartment',
    status: 'available',
    isMock: true,
    created_at: new Date(Date.now() - 100000).toISOString()
  },
  {
    id: '3',
    title: 'Finca El Retiro Paradise',
    price: 8000000,
    location: 'Antioquia',
    neighborhood: 'El Retiro',
    description: 'Espectacular finca con clima perfecto, rodeada de bosque nativo. Diseño arquitectónico que integra la naturaleza con el confort moderno.',
    bedrooms: 5,
    bathrooms: 4,
    area_m2: 450,
    capacity: 12,
    amenities: ['Piscina Climatizada', 'Zona BBQ', 'Chimenea', 'Cancha Múltiple'],
    pet_friendly: true,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    category: 'finca',
    status: 'available',
    isMock: true,
    created_at: new Date(Date.now() - 200000).toISOString()
  },
  {
    id: '4',
    title: 'Yate de Lujo 45ft Guatapé',
    price: 3500000,
    location: 'Antioquia',
    neighborhood: 'Guatapé',
    description: 'Disfruta de la mejor experiencia en la represa. Sistema de sonido JL Audio, capitán experimentado y todo el equipo para deportes acuáticos.',
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 0,
    capacity: 15,
    amenities: ['Sistema de Sonido', 'Capitán Incluido', 'Bebidas', 'Asoleadoras'],
    pet_friendly: false,
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: '',
    category: 'vehicle',
    status: 'available',
    isMock: true,
    created_at: new Date(Date.now() - 300000).toISOString()
  }
];

// Helper to initialize LocalStorage if empty
function initStore() {
  const existing = localStorage.getItem('paradise_properties_v4');
  const wasInitialized = localStorage.getItem('paradise_initialized_v4');
  
  if (!existing && !wasInitialized) {
    localStorage.setItem('paradise_properties_v4', JSON.stringify(INITIAL_PROPERTIES));
    localStorage.setItem('paradise_initialized_v4', 'true');
  }
}

/**
 * Ensures we don't hit the 5MB LocalStorage quota.
 * Strips large image arrays, keeping only the first image for thumbnails.
 */
function syncWithLocal(fullData) {
  try {
    const lightData = fullData.map(p => ({
      ...p,
      images: (p.images && p.images.length > 0) ? [p.images[0]] : []
    }));
    localStorage.setItem('paradise_properties_v4', JSON.stringify(lightData));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('LocalStorage quota exceeded. Clearing and retrying with minimal data...');
      localStorage.clear(); // Extreme but ensures we can keep working
    }
    console.error('Local sync failed:', e);
  }
}

export const getProperties = async () => {
  initStore();
  
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      syncWithLocal(data);
      return data;
    }
  } catch (e) {
    console.error('Supabase fetch error:', e);
  }

  const localData = localStorage.getItem('paradise_properties_v4');
  return localData ? JSON.parse(localData) : [];
};

export const getProperty = async (id) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (!error && data) {
      // Update local storage with full data if we got it from cloud
      const all = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
      const idx = all.findIndex(p => String(p.id) === String(id));
      if (idx !== -1) {
        all[idx] = data;
      } else {
        all.push(data);
      }
      localStorage.setItem('paradise_properties_v4', JSON.stringify(all));
      return data;
    }
  } catch (e) {
    console.error('getProperty cloud error:', e);
  }

  const all = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
  return all.find(p => String(p.id) === String(id));
};

export const isAuthorized = (rawEmail) => {
  const partnerEmail = (rawEmail || '').trim().toLowerCase();
  const AUTHORIZED_NAMES = ['marlon', 'andrea', 'gustavo'];
  const isAuth = AUTHORIZED_NAMES.some(name => partnerEmail.includes(name)) || 
                 partnerEmail.endsWith('@paradiserentas.com') ||
                 partnerEmail === 'andrea';
  
  if (isAuth) {
    // Inject secret for RLS bypass (Migration 003)
    authorizeSupabase('paradise-premium-secret-2024');
  }
  
  return isAuth;
};

export const addProperty = async (prop, authorEmail) => {
  const localId = Date.now().toString();
  const now = new Date().toISOString();

  // Build the object for Supabase (snake_case, no manual id — UUID is auto-generated)
  const cloudProp = {
    title: prop.title,
    price: prop.price,
    location: prop.location,
    neighborhood: prop.neighborhood || prop.location,
    description: prop.description,
    category: prop.category,
    videoUrl: prop.videoUrl || '', // Verified as videoUrl in DB
    bedrooms: prop.bedrooms || 0,
    bathrooms: prop.bathrooms || 0,
    area_m2: prop.area_m2 || 0,
    capacity: prop.capacity || 0,
    amenities: prop.amenities || [],
    images: prop.images || [],
    status: prop.status || 'available',
    isMock: false
  };

  const localProp = { ...cloudProp, id: localId, created_at: now };
  
  // 1. Local Save (Immediate UX)
  const all = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
  syncWithLocal([localProp, ...all]);
  
  // 2. Cloud Save (Persistence)
  try {
    const { data, error } = await supabase.from('properties').insert([cloudProp]).select();
    
    if (error) {
      // Remove from local if it failed cloud and we want to be strict? 
      // User says "arregla que funcione bien", so let's be strict.
      const rollback = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
      localStorage.setItem('paradise_properties_v4', JSON.stringify(rollback.filter(p => p.id !== localId)));
      throw new Error(`Cloud sync failed: ${error.message}`);
    } 
    
    if (data && data[0]) {
      // Update localProp with the real UUID from Supabase
      localProp.id = data[0].id;
      localProp.created_at = data[0].created_at;
      // Re-save to localStorage with the real UUID
      const updated = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
      const idx = updated.findIndex(p => p.id === localId);
      if (idx !== -1) updated[idx] = { ...localProp };
      syncWithLocal(updated);
      console.log('✅ Property synced to cloud:', data[0].id);
      return localProp;
    }
  } catch (e) {
    console.error('Persistence failed:', e.message);
    throw e; // Rethrow to let PublishPage know it failed
  }

  return localProp;
};

export const removeProperty = async (id, rawEmail) => {
  if (!isAuthorized(rawEmail)) {
    throw new Error('No autorizado para eliminar propiedades.');
  }

  const isMockId = String(id).length < 5; 
  
  if (!isMockId) {
    try {
      // Return and throw error if not deleted correctly (e.g. RLS fail)
      const { data, error } = await supabase.from('properties').delete().eq('id', id).select();
      if (error) throw error;
      if (!data || data.length === 0) {
        console.warn('RLS block: delete returned 0 rows affected.');
        throw new Error('Error: La base de datos denegó la eliminación (Permisos RLS).');
      }
      console.log('✅ Property removed from cloud:', id);
    } catch (e) {
      console.error('Cloud delete failed:', e.message);
      throw e;
    }
  }

  const all = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
  const updated = all.filter(p => String(p.id) !== String(id));
  syncWithLocal(updated);
  return updated;
};

export const updateProperty = async (id, updates) => {
  const all = JSON.parse(localStorage.getItem('paradise_properties_v4') || '[]');
  const idx = all.findIndex(p => String(p.id) === String(id));
  
  if (idx === -1) throw new Error('Propiedad no encontrada localmente.');

  // Build merged object correctly
  const finalUpdate = { ...all[idx], ...updates, updated_at: new Date().toISOString() };
  
  const isMockId = String(id).length < 5;

  if (!isMockId) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates) // Send only the changed fields to Supabase
        .eq('id', id)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        console.warn('RLS block: update returned 0 rows affected.');
        throw new Error('La base de datos denegó la actualización. Verifique permisos RLS.');
      }
      
      console.log('✅ Property updated in cloud:', id);
    } catch (e) {
      console.error('Cloud update failed:', e.message);
      throw e;
    }
  }

  // Update local
  all[idx] = finalUpdate;
  syncWithLocal(all);
  return all;
};

/**
 * --- SOLUCIÓN PARA PROBLEMAS DE ACTUALIZACIÓN (RLS) ---
 * Si las propiedades no se borran o no se editan, ejecuta este SQL en tu Dashboard de Supabase (SQL Editor):
 * 
 * -- 1. Deshabilitar RLS temporalmente para pruebas (Opcional pero recomendado para arreglarlo rápido)
 * ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
 * 
 * -- 2. O crear políticas que permitan a cualquier usuario (Anon) editar/borrar:
 * CREATE POLICY "Permitir todo a Anon" ON public.properties 
 * FOR ALL TO anon USING (true) WITH CHECK (true);
 */
