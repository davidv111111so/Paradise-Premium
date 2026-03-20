// --------------------------------------------------------
// ValuationAI — Módulo C: Predictive RENTAL valuation
// --------------------------------------------------------
import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calculator, Loader2, Calendar } from 'lucide-react';

// Simulated RENTAL market data by neighborhood in Medellín (Monthly prices)
const MARKET_DATA = {
  'El Poblado': { avgRentPerM2: 65000, growth: 12.5, trend: 'up' }, // Premium
  'Laureles':   { avgRentPerM2: 45000, growth: 8.2,  trend: 'up' },
  'Envigado':   { avgRentPerM2: 40000, growth: 7.5,  trend: 'up' },
  'Sabaneta':   { avgRentPerM2: 35000, growth: 9.1,  trend: 'up' },
  'Belen':      { avgRentPerM2: 30000, growth: 5.4,  trend: 'stable' },
};

function generateChartData(basePrice) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.map((month, i) => {
    const variance = 0.98 + Math.random() * 0.04; // Less variance in rent vs sales
    const growth = 1 + (i * 0.008); // Higher growth in premium rentals
    const price = basePrice * variance * growth;
    return {
      month,
      min: Math.round(price * 0.92),
      avg: Math.round(price),
      max: Math.round(price * 1.08),
    };
  });
}

const formatCOP = (val) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(val);

export default function ValuationAI() {
  const [area, setArea] = useState(80);
  const [neighborhood, setNeighborhood] = useState('El Poblado');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function calculate() {
    setLoading(true);
    setTimeout(() => {
      const market = MARKET_DATA[neighborhood] || MARKET_DATA['El Poblado'];
      const basePrice = area * market.avgRentPerM2;
      
      // Enforce the range mentioned (2M - 12M approximately, but calculated by m2)
      // Ajuste de realismo para Medellín
      const resultAvg = basePrice < 2000000 ? 2000000 : basePrice > 15000000 ? 15000000 : basePrice;

      setResult({
        minPrice: Math.round(resultAvg * 0.9),
        maxPrice: Math.round(resultAvg * 1.1),
        avgPrice: resultAvg,
        pricePerM2: market.avgRentPerM2,
        growth: market.growth,
        chartData: generateChartData(resultAvg),
      });
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
        <div className="flex items-center gap-3 mb-1">
          <Calendar size={18} className="text-accent-400" />
          <h3 className="text-lg font-bold text-paradise-50">Estimador de Renta Mensual</h3>
        </div>
        <p className="text-xs text-paradise-300">
          Calcula el canon de arrendamiento justo basado en m² y ubicación actual en Medellín.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-accent-400 uppercase tracking-widest">Área total</label>
            <span className="text-paradise-50 font-bold bg-paradise-900 px-3 py-1 rounded-lg border border-paradise-700">{area} m²</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="5"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-1.5 bg-paradise-800 rounded-lg appearance-none cursor-pointer accent-accent-500"
          />
        </div>

        <div>
           <label className="text-xs font-bold text-accent-400 uppercase tracking-widest mb-3 block">Sector / Barrio</label>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.keys(MARKET_DATA).map((n) => (
              <button
                key={n}
                onClick={() => setNeighborhood(n)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  neighborhood === n
                    ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                    : 'border-paradise-700 bg-paradise-900/40 text-paradise-400 hover:border-paradise-500/40'
                }`}
              >
                {n}
              </button>
            ))}
           </div>
        </div>

        <button
          onClick={calculate}
          disabled={loading}
          className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-accent-500/20 transition-all uppercase tracking-widest text-xs"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
          Calcular Canon Estimado
        </button>
      </div>

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 text-center rounded-2xl border-paradise-700/50">
               <p className="text-[10px] text-paradise-400 uppercase font-bold mb-1 tracking-widest">Renta Mínima</p>
               <p className="text-xl font-bold text-paradise-100">{formatCOP(result.minPrice)}</p>
            </div>
            <div className="glass-card p-5 text-center rounded-2xl border-accent-500/40 scale-105 shadow-2xl relative overflow-hidden bg-accent-500/5">
               <div className="absolute top-0 right-0 p-1">
                 <Star size={10} className="text-accent-500 fill-accent-500" />
               </div>
               <p className="text-[10px] text-accent-400 uppercase font-bold mb-1 tracking-widest">Renta Sugerida</p>
               <p className="text-2xl font-black text-gradient">{formatCOP(result.avgPrice)}</p>
            </div>
            <div className="glass-card p-5 text-center rounded-2xl border-paradise-700/50">
               <p className="text-[10px] text-paradise-400 uppercase font-bold mb-1 tracking-widest">Renta Máxima</p>
               <p className="text-xl font-bold text-paradise-100">{formatCOP(result.maxPrice)}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <TrendingUp size={18} className="text-success" />
                 <span className="text-xs font-bold text-paradise-100 uppercase tracking-widest">Tendencia en {neighborhood}</span>
               </div>
               <span className="text-success font-bold text-sm">+{result.growth}% anual</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={result.chartData}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f766e40" vertical={false} />
                <XAxis dataKey="month" stroke="#134e4a" fontSize={10} />
                <YAxis stroke="#134e4a" fontSize={10} tickFormatter={(v) => formatCOP(v)} />
                <Tooltip 
                   contentStyle={{ background: '#022c22', border: '1px solid #92400e', borderRadius: '12px' }}
                   itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="avg" stroke="#d97706" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
