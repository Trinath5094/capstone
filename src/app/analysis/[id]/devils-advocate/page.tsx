'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, RiskItem } from '@/types/startup';
import {
  Flame,
  AlertOctagon,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { RiskBadge } from '@/components/ui/RiskBadge';

export default function DevilsAdvocatePage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, analysis } = data;

  const filteredRisks = analysis.risks.filter(r => {
    if (filterSeverity === 'ALL') return true;
    return r.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-900 border border-rose-500/30 glass-card">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Core Differentiator
          </span>
          <span className="text-xs text-slate-400">Adversarial Intelligence</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          AI Devil&apos;s Advocate
        </h1>
        <p className="text-sm font-semibold text-rose-300/90 mt-1 italic">
          &quot;We don&apos;t just support your idea. We try to break it.&quot;
        </p>
        <p className="text-xs text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Most founders fail because they fall in love with their hypothesis and ignore early death flags.
          Below is a ruthless breakdown of unrealistic assumptions, hidden systemic risks, and specific countermeasures for {startup.name}.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>Filter by Severity:</span>
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                filterSeverity === sev
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">
          Showing {filteredRisks.length} flagged risk vectors
        </span>
      </div>

      {/* Ruthless Risk Items List */}
      <div className="space-y-4">
        {filteredRisks.map((rk, idx) => {
          const isHigh = rk.severity === 'HIGH';
          return (
            <div
              key={rk.id}
              className={`p-6 rounded-2xl bg-slate-900/70 border transition-all duration-200 glass-card-hover ${
                isHigh ? 'border-rose-500/30 bg-rose-950/10' : 'border-slate-800'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <RiskBadge severity={rk.severity} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Category: {rk.category} Risk
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  RISK VECTOR #{idx + 1}
                </span>
              </div>

              {/* Title & Explanation */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white leading-snug">
                  {rk.title}
                </h3>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Why This Breaks Your Startup (Explanation)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rk.explanation}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400">
                    Market Evidence & Historical Precedent
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {rk.evidence}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Recommended Countermeasure (How to Fix It)
                  </span>
                  <p className="text-xs text-emerald-200 font-semibold leading-relaxed">
                    {rk.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/swot`} className="text-slate-400 hover:text-white">
          ← Previous: SWOT Analysis
        </Link>
        <Link
          href={`/analysis/${startup.id}/customer-simulator`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Customer Interview Simulator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
