import { supabase, authorizeSupabase } from './supabase';

const INITIAL_PROPERTIES = [
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

const STORAGE_KEY = 'paradise_properties_v5';
const INIT_KEY = 'paradise_initialized_v5';
const SYNC_KEY = 'paradise_last_sync_v5';

// Asynchronous LocalStorage Helpers
const storage = {
  get: () => new Promise(res => {
    setTimeout(() => {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        res(JSON.parse(data));
      } else {
        // Migration from v4 if v5 is empty
        const oldData = localStorage.getItem('paradise_properties_v4');
        if (oldData) {
          const parsed = JSON.parse(oldData);
          localStorage.setItem(STORAGE_KEY, oldData);
          res(parsed);
        } else {
          res([]);
        }
      }
    }, 0);
  }),
  set: (data) => new Promise(res => {
    setTimeout(() => {
      // Lightening images to prevent QuotaExceededError for storage
      const lightData = data.map(p => ({
        ...p,
        images: (p.images && p.images.length > 0) ? [p.images[0]] : []
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightData));
      res();
    }, 0);
  })
};

export const getProperties = async () => {
  const cached = await storage.get();
  const wasInitialized = localStorage.getItem(INIT_KEY);

  // If no cached data and not initialized, show mocks
  if (cached.length === 0 && !wasInitialized) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    localStorage.setItem(INIT_KEY, 'true');
    return INITIAL_PROPERTIES;
  }

  const lastSync = parseInt(localStorage.getItem(SYNC_KEY) || '0', 10);
  const CACHE_TTL = 2 * 60 * 1000; // 2 minutes cache for better freshness

  // Background sync if cache is stale or we have mock data
  if (Date.now() - lastSync > CACHE_TTL || cached.some(p => p.isMock)) {
    supabase.from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({data, error}) => {
        if (!error && data && data.length > 0) {
          storage.set(data);
          localStorage.setItem(SYNC_KEY, Date.now().toString());
          localStorage.setItem(INIT_KEY, 'true');
        }
      }).catch(err => console.warn('[Store] Background sync failed:', err));
  }

  return cached.length > 0 ? cached : INITIAL_PROPERTIES;
};

export const getProperty = async (id) => {
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
  if (!error && data) {
    const all = await storage.get();
    const idx = all.findIndex(p => String(p.id) === String(id));
    if (idx !== -1) all[idx] = data; else all.push(data);
    await storage.set(all);
    return data;
  }
  const all = await storage.get();
  return all.find(p => String(p.id) === String(id));
};

export const isAuthorized = (rawEmail) => {
  const partnerEmail = (rawEmail || '').trim().toLowerCase();
  const AUTHORIZED_NAMES = ['marlon', 'andrea', 'gustavo'];
  const isAuth = AUTHORIZED_NAMES.some(name => partnerEmail.includes(name)) || 
                 partnerEmail.endsWith('@paradiserentas.com');
  
  if (isAuth) authorizeSupabase('paradise-premium-secret-2024');
  return isAuth;
};

export const addProperty = async (prop) => {
  const { data, error } = await supabase.from('properties').insert([prop]).select();
  if (error) throw new Error(error.message);
  
  if (data && data[0]) {
    const all = await storage.get();
    await storage.set([data[0], ...all]);
    return data[0];
  }
};

export const removeProperty = async (id, email) => {
  if (!isAuthorized(email)) throw new Error('No autorizado');
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) throw error;
  
  const all = await storage.get();
  const updated = all.filter(p => String(p.id) !== String(id));
  await storage.set(updated);
  return updated;
};

export const updateProperty = async (id, updates) => {
  const { data, error } = await supabase.from('properties').update(updates).eq('id', id).select();
  if (error) throw error;

  if (data && data[0]) {
    const all = await storage.get();
    const idx = all.findIndex(p => String(p.id) === String(id));
    if (idx !== -1) all[idx] = data[0]; else all.push(data[0]);
    await storage.set(all);
    return all;
  }
};
