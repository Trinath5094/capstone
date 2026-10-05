'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  PlusCircle,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Swords,
  ChevronRight,
  RefreshCw,
  Search,
  Flame,
  ExternalLink
} from 'lucide-react';
import { getStoredStartups, resetToDemoData } from '@/lib/storage';
import { CompleteStartupData } from '@/types/startup';
import { getScoreColor } from '@/lib/utils';
import { RiskBadge } from '@/components/ui/RiskBadge';

export default function DashboardPage() {
  const [startups, setStartups] = useState<Record<string, CompleteStartupData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [battleOpen, setBattleOpen] = useState(false);
  const [startupAId, setStartupAId] = useState('campusbite-ai');
  const [startupBId, setStartupBId] = useState('greencart');

  useEffect(() => {
    setStartups(getStoredStartups());
  }, []);

  const startupList = Object.values(startups);
  const filteredStartups = startupList.filter(s =>
    s.startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.startup.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIdeas = startupList.length;
  const validatedIdeas = startupList.filter(s => s.startup.status === 'Validated').length;
  const avgScore = totalIdeas > 0 
    ? Math.round(startupList.reduce((acc, cur) => acc + cur.analysis.validationScore, 0) / totalIdeas)
    : 78;
  const avgInvestorScore = totalIdeas > 0
    ? Math.round(startupList.reduce((acc, cur) => acc + cur.readiness.overallScore, 0) / totalIdeas)
    : 75;

  const handleResetData = () => {
    resetToDemoData();
    setStartups(getStoredStartups());
  };

  const startupA = startups[startupAId] || startups['campusbite-ai'];
  const startupB = startups[startupBId] || startups['greencart'];

  // Head-to-head winner calculation
  const scoreA = startupA?.analysis?.validationScore || 78;
  const scoreB = startupB?.analysis?.validationScore || 84;
  const winner = scoreA >= scoreB ? startupA : startupB;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Founder Operating System
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">All systems operational</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Good morning, Founder 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Let&apos;s turn your next idea into a validated, launch-ready opportunity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBattleOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-sm"
          >
            <Swords className="w-4 h-4 text-indigo-400" />
            <span>Startup Battle (Compare)</span>
          </button>

          <Link
            href="/new-analysis"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Startup Analysis</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Startup Ideas</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalIdeas}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across 3 market verticals</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Validated Opportunities</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">{validatedIdeas}</p>
          <p className="text-[11px] text-emerald-400/80 mt-1">100% complete analysis</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Avg. Validation Score</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-indigo-300">{avgScore} <span className="text-sm font-normal text-slate-500">/ 100</span></p>
          <p className="text-[11px] text-indigo-400 mt-1">Top tier venture grade</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Investor Readiness</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-300">{avgInvestorScore}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Based on 4-panel consensus</p>
        </div>
      </div>

      {/* Main Content: Startups Grid + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Startup Ideas List (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Your Startup Analyses</h2>
              <p className="text-xs text-slate-400">Click any card to open the 13-module deep-dive.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter startups..."
                  className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none w-48"
                />
              </div>

              <button
                onClick={handleResetData}
                title="Reset to default seed data"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredStartups.map((data) => {
              const s = data.startup;
              const a = data.analysis;
              const colors = getScoreColor(a.validationScore);
              const topRisk = a.risks[0] || { severity: 'HIGH' as const, title: 'Execution risk' };

              return (
                <Link
                  key={s.id}
                  href={`/analysis/${s.id}`}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 glass-card-hover transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Top line */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {s.name}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                            {s.location}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {s.tagline || s.solution}
                        </p>
                      </div>

                      {/* Score Badge */}
                      <div className="text-right shrink-0">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-black border ${colors.bg} ${colors.text} ${colors.border}`}>
                          Score: {a.validationScore}/100
                        </span>
                      </div>
                    </div>

                    {/* Problem snippet */}
                    <p className="text-xs text-slate-400 line-clamp-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 mb-4">
                      <span className="font-semibold text-slate-300">Problem: </span>
                      {s.problem}
                    </p>
                  </div>

                  {/* Footer Stats */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">Market TAM:</span>
                        <span className="text-white font-medium">{data.market.tam}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">Top Risk:</span>
                        <RiskBadge severity={topRisk.severity} size="sm" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                      <span>View Deep-Dive (13 Tabs)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 glass-card">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Recommended Next Steps</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Your AI Co-Founder generated 3 action items for CampusBite AI:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>Interview student persona &quot;Priya&quot; to test pause feature.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>Review Devil&apos;s Advocate warning on semester break churn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>Export Investor Readiness dossier for angel meeting.</span>
              </li>
            </ul>

            <Link
              href="/analysis/campusbite-ai/customer-simulator"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
            >
              <span>Launch Customer Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recent Activity Feed */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3 pb-3 border-b border-slate-800/60">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">CampusBite validation completed</p>
                  <p className="text-slate-400 text-[11px]">Score calculated at 78/100 • 2 hrs ago</p>
                </div>
              </div>

              <div className="flex gap-3 pb-3 border-b border-slate-800/60">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Market research data updated</p>
                  <p className="text-slate-400 text-[11px]">TAM ₹28,500 Cr verified • Yesterday</p>
                </div>
              </div>

              <div className="flex gap-3 pb-3 border-b border-slate-800/60">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Investor panel reviewed idea</p>
                  <p className="text-slate-400 text-[11px]">Angel & Shark Tank verdicts submitted • 2 days ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">GreenCart analysis created</p>
                  <p className="text-slate-400 text-[11px]">Circular grocery refill model • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Battle Modal */}
      {battleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-4xl p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Startup Battle Comparison</h3>
                  <p className="text-xs text-slate-400">Head-to-head algorithm evaluation of two startup concepts.</p>
                </div>
              </div>
              <button
                onClick={() => setBattleOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Startup A</label>
                <select
                  value={startupAId}
                  onChange={(e) => setStartupAId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {startupList.map(s => (
                    <option key={s.startup.id} value={s.startup.id}>{s.startup.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Startup B</label>
                <select
                  value={startupBId}
                  onChange={(e) => setStartupBId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {startupList.map(s => (
                    <option key={s.startup.id} value={s.startup.id}>{s.startup.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Winner Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Battle Winner</span>
                <h4 className="text-xl font-extrabold text-white mt-0.5">
                  🏆 {winner?.startup?.name} (Score: {winner?.analysis?.validationScore}/100)
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Why it wins: Superior unit margins, higher customer retention frequency, and lower competitive retaliation friction.
                </p>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Evaluation Metric</th>
                    <th className="py-2.5 px-4 font-semibold text-indigo-300">{startupA?.startup?.name}</th>
                    <th className="py-2.5 px-4 font-semibold text-purple-300">{startupB?.startup?.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-white">Validation Score</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-400">{startupA?.analysis?.validationScore}/100</td>
                    <td className="py-2.5 px-4 font-bold text-purple-400">{startupB?.analysis?.validationScore}/100</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-white">Market Size (TAM)</td>
                    <td className="py-2.5 px-4">{startupA?.market?.tam}</td>
                    <td className="py-2.5 px-4">{startupB?.market?.tam}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-white">Investor Readiness</td>
                    <td className="py-2.5 px-4">{startupA?.readiness?.overallScore}%</td>
                    <td className="py-2.5 px-4">{startupB?.readiness?.overallScore}%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-white">Initial Capital Required</td>
                    <td className="py-2.5 px-4">{startupA?.startup?.budget}</td>
                    <td className="py-2.5 px-4">{startupB?.startup?.budget}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-white">Break-Even Threshold</td>
                    <td className="py-2.5 px-4">{startupA?.financials?.breakEvenCustomers} Customers</td>
                    <td className="py-2.5 px-4">{startupB?.financials?.breakEvenCustomers} Customers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setBattleOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
