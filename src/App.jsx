// --------------------------------------------------------
// App.jsx — Router con nuevas rutas de detalle y publicación
// --------------------------------------------------------
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ApartmentsPage from './pages/ApartmentsPage';
import FincasPage from './pages/FincasPage';
import WaterVehiclesPage from './pages/WaterVehiclesPage';
import SupportPage from './pages/SupportPage';
import AICenterPage from './pages/AICenterPage';
import AboutPage from './pages/AboutPage';
import MedellinGuidePage from './pages/MedellinGuidePage';
import PublishPage from './pages/PublishPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

export default function App() {
  // Load Tawk.to chat widget safely via useEffect (avoids TrustedHTML CSP issues)
  useEffect(() => {
    // Definir configuración antes de cargar el script
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      window.Tawk_API.setAttributes({
        'language': 'es'
      }, function(error){});
    };
    // Forzar idioma del visitante
    window.Tawk_API.visitor = {
      language: 'es'
    };

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69c458060976361c3598d20c/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);
    
    return () => { 
      try { 
        // No removemos el script en cada render para evitar parpadeos
      } catch(e) {} 
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="apartments" element={<ApartmentsPage />} />
          <Route path="fincas" element={<FincasPage />} />
          <Route path="water-vehicles" element={<WaterVehiclesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="medellin-guide" element={<MedellinGuidePage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="ai-center" element={<AICenterPage />} />
          <Route path="publish" element={<PublishPage />} />
          <Route path="property/:id" element={<PropertyDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
