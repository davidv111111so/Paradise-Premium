import { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Home, 
  Truck, 
  BarChart3, 
  Info,
  ChevronRight,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';

export default function FinancialCalculator() {
  const [form, setForm] = useState({
    price: 850000000,
    renovation: 50000000,
    closingCostsPct: 3.5,
    monthlyRent: 8500000,
    monthlyExpenses: 1200000,
    occupancyRate: 85,
    financingPct: 0,
    interestRate: 12.5,
    years: 15
  });

  const stats = useMemo(() => {
    const closingCosts = (form.price * form.closingCostsPct) / 100;
    const totalInvestment = Number(form.price) + Number(form.renovation) + closingCosts;
    
    // Revenue
    const potentialAnnualRevenue = form.monthlyRent * 12;
    const actualAnnualRevenue = potentialAnnualRevenue * (form.occupancyRate / 100);
    
    // Operating Expenses
    const annualExpenses = form.monthlyExpenses * 12;
    const netOperatingIncome = actualAnnualRevenue - annualExpenses;
    
    // Capitalization Rate
    const capRate = (netOperatingIncome / totalInvestment) * 100;
    
    // ROI (assuming no financing for simplicity in first pass, or basic calculation)
    const roi = (netOperatingIncome / totalInvestment) * 100;

    // Simple Tax Estimation (Colombian Context - Simplified)
    // 19% IVA on services if applicable, but usually 1% - 3.5% property tax is more relevant
    const propertyTax = totalInvestment * 0.01; // Average 1% predicador
    
    return {
      totalInvestment,
      closingCosts,
      actualAnnualRevenue,
      netOperatingIncome,
      capRate,
      roi,
      propertyTax
    };
  }, [form]);

  const f = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center border border-accent-500/20">
              <Calculator className="text-accent-400" size={20} />
            </div>
            <h2 className="text-2xl font-black text-paradise-50 uppercase tracking-tighter">Calculadora de ROI Premium</h2>
          </div>
          <p className="text-paradise-400 text-sm">Analiza la rentabilidad y proyección fiscal de tu inversión inmobiliaria.</p>
        </div>
        <div className="flex items-center gap-4 bg-paradise-900/50 p-2 rounded-2xl border border-paradise-800">
          <button className="px-4 py-2 rounded-xl bg-accent-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-500/20">Inmuebles</button>
          <button className="px-4 py-2 rounded-xl text-paradise-400 text-[10px] font-black uppercase tracking-widest hover:bg-paradise-800 transition-colors">Vehículos</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Parametros */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 border-paradise-800/50">
            <div className="flex items-center gap-2 mb-6">
              <RefreshCcw size={14} className="text-accent-500" />
              <h3 className="text-[10px] font-black text-paradise-300 uppercase tracking-widest">Inversión Inicial</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Precio Compra</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-500" />
                  <input 
                    type="number" 
                    value={form.price} 
                    onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Renovación / Mobiliario</label>
                <div className="relative">
                  <ShieldCheck size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input 
                    type="number" 
                    value={form.renovation} 
                    onChange={e => setForm({...form, renovation: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Gastos Cierre %</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={form.closingCostsPct} 
                    onChange={e => setForm({...form, closingCostsPct: e.target.value})}
                    className="w-full px-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50 flex-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Ocupación %</label>
                  <input 
                    type="number" 
                    value={form.occupancyRate} 
                    onChange={e => setForm({...form, occupancyRate: e.target.value})}
                    className="w-full px-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-paradise-800/50">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={14} className="text-emerald-500" />
              <h3 className="text-[10px] font-black text-paradise-300 uppercase tracking-widest">Estimación Mensual</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Valor Arriendo</label>
                <div className="relative">
                  <Home size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-500" />
                  <input 
                    type="number" 
                    value={form.monthlyRent} 
                    onChange={e => setForm({...form, monthlyRent: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-paradise-500 font-bold uppercase tracking-wider ml-1">Gastos Operativos (Adm, Impuestos...)</label>
                <div className="relative">
                  <Info size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-paradise-500" />
                  <input 
                    type="number" 
                    value={form.monthlyExpenses} 
                    onChange={e => setForm({...form, monthlyExpenses: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-paradise-950/60 border border-paradise-700/40 rounded-xl text-sm text-paradise-100 outline-none focus:border-accent-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard de Resultados */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card p-6 rounded-3xl border-paradise-700/50 bg-gradient-to-br from-accent-500/5 to-transparent">
              <p className="text-[10px] font-black text-accent-400 uppercase tracking-[0.2em] mb-3">Inversión Total</p>
              <h4 className="text-2xl font-black text-paradise-50 tracking-tighter">{f(stats.totalInvestment)}</h4>
              <div className="mt-4 flex items-center justify-between text-[11px] text-paradise-400">
                <span>Escrituración</span>
                <span className="font-bold text-paradise-200">{f(stats.closingCosts)}</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">Retorno (ROI)</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-4xl font-black text-emerald-400 tracking-tighter">{stats.roi.toFixed(2)}%</h4>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="mt-2 text-[10px] text-emerald-500/60 font-bold uppercase">Anual Neto</p>
            </div>

            <div className="glass-card p-6 rounded-3xl border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-3">Cap Rate</p>
              <h4 className="text-4xl font-black text-amber-400 tracking-tighter">{stats.capRate.toFixed(2)}%</h4>
              <p className="mt-2 text-[10px] text-amber-500/60 font-bold uppercase">Eficiencia de Capital</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border-paradise-800/50">
            <div className="bg-paradise-900/40 p-6 border-b border-paradise-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 size={18} className="text-accent-400" />
                <h3 className="text-sm font-black text-paradise-100 uppercase tracking-widest">Análisis Financiero Detallado</h3>
              </div>
              <div className="px-3 py-1 bg-accent-500/10 rounded-full text-[9px] font-black text-accent-400 uppercase tracking-widest border border-accent-500/20">
                PROYECCIÓN ANUAL
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-paradise-400 font-medium">Ingresos Brutos Anuales</p>
                    <p className="text-sm font-bold text-paradise-100">{f(stats.actualAnnualRevenue)}</p>
                  </div>
                  <div className="w-full h-1.5 bg-paradise-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[100%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-paradise-400 font-medium font-medium">Gastos Operativos Totales</p>
                    <p className="text-sm font-bold text-amber-500">-{f(form.monthlyExpenses * 12)}</p>
                  </div>
                  <div className="w-full h-1.5 bg-paradise-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500" 
                      style={{ width: `${Math.min(100, (form.monthlyExpenses * 12 / stats.actualAnnualRevenue) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-paradise-400 font-medium">Impuesto Predial Estimado</p>
                    <p className="text-sm font-bold text-paradise-300">-{f(stats.propertyTax)}</p>
                  </div>
                  <div className="w-full h-1.5 bg-paradise-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-paradise-500" 
                      style={{ width: `${Math.min(100, (stats.propertyTax / stats.actualAnnualRevenue) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-paradise-800/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-paradise-200 uppercase tracking-widest">Utilidad Neta (EBITDA)</p>
                    <p className="text-xl font-black text-emerald-400">{f(stats.netOperatingIncome - stats.propertyTax)}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card bg-accent-500/5 border-dashed border-accent-500/30 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-black text-accent-400 uppercase tracking-widest mb-4">Nota del Asesor IA</h5>
                  <p className="text-xs text-paradise-300 leading-relaxed italic">
                    \"Basado en un precio de {f(form.price)} y una ocupación del {form.occupancyRate}%, tu activo genera un flujo de caja saludable. 
                    Considera que un ROI del {stats.roi.toFixed(1)}% supera el promedio del mercado ({form.city || 'Nacional'}) del 6.5%. 
                    Te recomendamos optimizar los gastos operativos para subir el Cap Rate.\"
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 mt-6 w-full py-3 bg-accent-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-600 transition-all">
                  Descargar Reporte PDF <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
