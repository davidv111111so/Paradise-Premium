import { Building2, Home, Ship } from 'lucide-react';

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

// Helper to initialize LocalStorage if empty
function initStore() {
  const existing = localStorage.getItem('paradise_properties');
  if (!existing) {
    localStorage.setItem('paradise_properties', JSON.stringify(INITIAL_PROPERTIES));
  }
}

export const getProperties = () => {
  initStore();
  const data = localStorage.getItem('paradise_properties');
  return data ? JSON.parse(data) : [];
};

export const getProperty = (id) => {
  const all = getProperties();
  return all.find(p => p.id === String(id));
};

export const addProperty = (prop) => {
  const all = getProperties();
  const newProp = {
    ...prop,
    id: Math.random().toString(36).substring(2, 9),
    created_at: new Date().toISOString()
  };
  localStorage.setItem('paradise_properties', JSON.stringify([newProp, ...all]));
  return newProp;
};

export const removeProperty = (id) => {
  const all = getProperties();
  const updated = all.filter(p => p.id !== String(id));
  localStorage.setItem('paradise_properties', JSON.stringify(updated));
  return updated;
};
