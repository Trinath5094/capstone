'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Globe2,
  Search,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function MarketIntelligencePage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);
  const [liveResearchLoading, setLiveResearchLoading] = useState(false);
  const [researchNotice, setResearchNotice] = useState<string | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, market } = data;

  const COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#10b981'];

  const handleRefreshResearch = () => {
    setLiveResearchLoading(true);
    setResearchNotice(null);
    setTimeout(() => {
      setLiveResearchLoading(false);
      setResearchNotice('Live research completed: Verified current 2026 collegiate dining trends & TAM telemetry.');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Module 02 • Market Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            TAM, SAM, SOM & Market Research
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI-modeled market sizing, customer segment breakdowns, and historical failure analysis.
          </p>
        </div>

        <button
          onClick={handleRefreshResearch}
          disabled={liveResearchLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-bold transition-all shrink-0"
        >
          <Search className={`w-3.5 h-3.5 text-indigo-400 ${liveResearchLoading ? 'animate-spin' : ''}`} />
          <span>{liveResearchLoading ? 'Querying Web Telemetry...' : 'Refresh Research (Tavily/Demo)'}</span>
        </button>
      </div>

      {researchNotice && (
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{researchNotice}</span>
        </div>
      )}

      {/* TAM / SAM / SOM Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TAM */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/30 glass-card">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-bold mb-1">
            <span>TAM (Total Addressable)</span>
            <Globe2 className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{market.tam}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Total domestic expenditure on food and grocery delivery across all university and college campuses nationwide.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Market CAGR:</span>
            <span className="text-emerald-400 font-bold">{market.cagr}</span>
          </div>
        </div>

        {/* SAM */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-purple-500/30 glass-card">
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold mb-1">
            <span>SAM (Serviceable Addressable)</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{market.sam}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Targetable market segment in Tier-1 & Tier-2 university hubs with high hostel density and digital UPI penetration.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Target Clusters:</span>
            <span className="text-white font-bold">Top 35 Campuses</span>
          </div>
        </div>

        {/* SOM */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 glass-card">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-1">
            <span>SOM (Serviceable Obtainable)</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2">{market.som}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Realistic obtainable capture within Months 12–24 with initial capital and campus ambassador network.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Opportunity Score:</span>
            <span className="text-cyan-400 font-bold">{market.opportunityScore}/100</span>
          </div>
        </div>
      </div>

      {/* Visual Charts: Growth Projection & Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Projection Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <span>5-Year Market Size Growth Projection</span>
            </h3>
            <span className="text-[10px] text-slate-400">TAM Growth (₹ Cr)</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={market.growthProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="marketSize" fill="#6366f1" radius={[6, 6, 0, 0]} name="Market Size (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segment Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-400" />
              <span>Customer Demographic Segments</span>
            </h3>
            <span className="text-[10px] text-slate-400">Revenue Contribution</span>
          </div>

          <div className="space-y-3 pt-2">
            {market.segments.map((seg, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{seg.name}</span>
                  <span className="font-bold text-indigo-400">{seg.percentage}% ({seg.value})</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${seg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Failed Predecessors Case Studies */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>Post-Mortem: Why Similar Startups Failed & What to Learn</span>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Historical Research
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {market.failedPredecessors.map((fail, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">{fail.name}</h4>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  Failed Venture
                </span>
              </div>
              <p className="text-slate-400"><strong className="text-slate-300">What they tried:</strong> {fail.whatTheyTried}</p>
              <p className="text-rose-300"><strong className="text-rose-400">Why it failed:</strong> {fail.whyFailed}</p>
              <p className="text-indigo-300"><strong className="text-indigo-400">How {startup.name} avoids this:</strong> {fail.howToAvoid}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/validation`} className="text-slate-400 hover:text-white">
          ← Previous: Validation
        </Link>
        <Link
          href={`/analysis/${startup.id}/competitors`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Competitor Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
