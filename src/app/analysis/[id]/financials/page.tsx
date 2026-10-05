'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById, saveStartupData } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { formatCurrency } from '@/lib/utils';
import {
  LineChart as LineChartIcon,
  DollarSign,
  TrendingUp,
  Flame,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function FinancialPlanningPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  // Financial interactive controls
  const [currency, setCurrency] = useState('₹');
  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [pricePerCustomer, setPricePerCustomer] = useState(2499);
  const [customers, setCustomers] = useState(450);
  const [marketingCost, setMarketingCost] = useState(25000);
  const [techCost, setTechCost] = useState(12000);
  const [fixedOpsCost, setFixedOpsCost] = useState(85000);
  const [cogsRatio, setCogsRatio] = useState(0.68); // 68% food cost / vendor payout

  useEffect(() => {
    const item = getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai'];
    setData(item);
    if (item.financials) {
      setInitialInvestment(item.financials.initialInvestment);
      setPricePerCustomer(item.financials.pricePerCustomer);
      setCustomers(item.financials.expectedCustomers);
      setMarketingCost(item.financials.marketingCost);
      setTechCost(item.financials.technologyCost);
      setCurrency(item.financials.currency || '₹');
    }
  }, [id]);

  if (!data) return null;
  const { startup } = data;

  // Real-time calculations
  const monthlyRevenue = customers * pricePerCustomer;
  const directCogs = monthlyRevenue * cogsRatio;
  const fixedExpenses = fixedOpsCost + marketingCost + techCost;
  const monthlyExpenses = directCogs + fixedExpenses;
  const monthlyProfit = monthlyRevenue - monthlyExpenses;

  // Margin per customer
  const grossMarginPerUnit = pricePerCustomer * (1 - cogsRatio);
  const breakEvenCustomers = grossMarginPerUnit > 0 ? Math.ceil(fixedExpenses / grossMarginPerUnit) : 0;

  // Runway calculation
  const monthlyBurn = monthlyProfit < 0 ? Math.abs(monthlyProfit) : 0;
  const runwayMonths = monthlyBurn > 0 ? (initialInvestment / monthlyBurn).toFixed(1) : 'Profitable (Infinite)';

  // Projections 12 Months
  const dynamicProjections = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;
    const growthFactor = 1 + (monthIndex - 1) * 0.15;
    const projectedUsers = Math.round(customers * 0.4 * growthFactor);
    const rev = projectedUsers * pricePerCustomer;
    const exp = rev * cogsRatio + fixedExpenses * (1 + (monthIndex - 1) * 0.05);
    const prof = rev - exp;
    return {
      month: `M${monthIndex}`,
      revenue: Math.round(rev),
      expenses: Math.round(exp),
      profit: Math.round(prof),
      activeCustomers: projectedUsers,
    };
  });

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header & Currency Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Module 08 • Financial Model
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Financial Planning & Runway Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interactive sensitivity analysis: Adjust pricing and subscriber numbers to calculate break-even point and runway.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          {['₹', '$'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                currency === curr
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {curr === '₹' ? 'INR (₹)' : 'USD ($)'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Monthly Gross Revenue</span>
          <span className="text-2xl font-extrabold text-white">
            {formatCurrency(monthlyRevenue, currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">From {customers} active users</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Total Monthly Expenses</span>
          <span className="text-2xl font-extrabold text-slate-300">
            {formatCurrency(monthlyExpenses, currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">COGS + Fixed Overhead</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Net Monthly Profit</span>
          <span className={`text-2xl font-extrabold ${monthlyProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(monthlyProfit, currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">
            {monthlyProfit >= 0 ? 'Contribution Positive' : 'Monthly Cash Burn'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">Break-Even Threshold</span>
          <span className="text-2xl font-extrabold text-indigo-400">
            {breakEvenCustomers}
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Paying customers required</span>
        </div>
      </div>

      {/* Interactive Sliders Panel */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 glass-card space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Interactive Financial Sliders</span>
          </h3>
          <span className="text-xs text-indigo-400 font-semibold">Real-time simulation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Slider 1: Expected Customers */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Active Subscribers / Customers:</span>
              <span className="text-indigo-400 font-bold">{customers}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2500}
              step={25}
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Price per Customer */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Average Subscription / Ticket Price:</span>
              <span className="text-indigo-400 font-bold">{formatCurrency(pricePerCustomer, currency)}</span>
            </div>
            <input
              type="range"
              min={currency === '₹' ? 499 : 10}
              max={currency === '₹' ? 8000 : 200}
              step={currency === '₹' ? 100 : 5}
              value={pricePerCustomer}
              onChange={(e) => setPricePerCustomer(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Marketing Spend */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Monthly Performance & Campus Marketing:</span>
              <span className="text-indigo-400 font-bold">{formatCurrency(marketingCost, currency)}</span>
            </div>
            <input
              type="range"
              min={currency === '₹' ? 5000 : 100}
              max={currency === '₹' ? 150000 : 3000}
              step={currency === '₹' ? 5000 : 50}
              value={marketingCost}
              onChange={(e) => setMarketingCost(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Slider 4: Initial Working Capital */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Available Starting Capital:</span>
              <span className="text-emerald-400 font-bold">{formatCurrency(initialInvestment, currency)}</span>
            </div>
            <input
              type="range"
              min={currency === '₹' ? 100000 : 2000}
              max={currency === '₹' ? 2500000 : 50000}
              step={currency === '₹' ? 50000 : 1000}
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Runway Summary Pill */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Estimated Cash Runway:</span>
          </div>
          <span className="font-extrabold text-amber-400 text-sm">
            {typeof runwayMonths === 'number' ? `${runwayMonths} Months` : runwayMonths}
          </span>
        </div>
      </div>

      {/* 12-Month Projected Growth Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-indigo-400" />
            <span>12-Month Financial Trajectory (Revenue vs. Expenses vs. Profit)</span>
          </h3>
          <span className="text-[10px] text-slate-400">Values in {currency}</span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dynamicProjections}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2.5} name="Net Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/business-model`} className="text-slate-400 hover:text-white">
          ← Previous: Business Model Canvas
        </Link>
        <Link
          href={`/analysis/${startup.id}/technology`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Technology Stack Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
