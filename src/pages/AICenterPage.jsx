// --------------------------------------------------------
// AICenterPage — Limpieza de Copiloto (Ahora es Global)
// --------------------------------------------------------
import { useState, useEffect } from 'react';
import {
  ImagePlus,
  FileText,
  TrendingUp,
  Sparkles,
  Lock
} from 'lucide-react';
import VirtualStaging from '../modules/VirtualStaging';
import DescriptionGenerator from '../modules/DescriptionGenerator';
import ValuationAI from '../modules/ValuationAI';
import { supabase } from '../lib/supabase';

export default function AICenterPage() {
  const [activeTab, setActiveTab] = useState('staging');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = prompt('Centro IA - Acceso Restringido\nIngrese su correo de socio para autorizar:');
    const AUTHORIZED = ['marlon@paradise.com', 'andrea@paradise.com', 'gustavo@paradise.com'];
    
    if (AUTHORIZED.includes(userEmail)) {
      setIsAdmin(true);
      setLoading(false);
    } else {
      alert('Solo Marlon, Andrea y Gustavo pueden acceder al Centro IA.');
      window.location.href = '/';
    }
  }, []);

  const TABS = [
    { id: 'staging', label: 'Staging Virtual', icon: ImagePlus, component: VirtualStaging, adminOnly: false },
    { id: 'description', label: 'Generador IA', icon: FileText, component: DescriptionGenerator, adminOnly: true },
    { id: 'valuation', label: 'Tasación Renta', icon: TrendingUp, component: ValuationAI, adminOnly: false },
  ];

  const visibleTabs = TABS.filter(tab => !tab.adminOnly || (tab.adminOnly && isAdmin));
  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || VirtualStaging;

  if (loading) return <div className="p-10 text-paradise-400">Verificando acceso...</div>;

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-paradise-900 to-accent-600 flex items-center justify-center border border-accent-500/30">
            <Sparkles size={24} className="text-accent-400" />
          </div>
          <div>
            <h1 className="heading-display text-3xl md:text-4xl text-paradise-50">
              Centro IA
            </h1>
            <p className="text-paradise-400 text-sm font-medium tracking-wide">
              Herramientas inteligentes para propietarios y agentes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
              activeTab === tab.id
                ? 'bg-accent-500/20 text-accent-400 border-accent-500/40 shadow-xl scale-105'
                : 'text-paradise-500 bg-paradise-900/40 border-paradise-800 hover:text-paradise-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.adminOnly && <Lock size={12} className="ml-1 opacity-60" />}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        <ActiveComponent />
      </div>
    </div>
  );
}
