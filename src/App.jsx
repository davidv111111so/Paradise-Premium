// --------------------------------------------------------
// App.jsx — Router con nuevas rutas de detalle y publicación
// --------------------------------------------------------
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
