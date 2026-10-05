'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import {
  Award,
  DollarSign,
  Briefcase,
  Building,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function InvestorPanelPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, investorReviews, investorConfidenceScore } = data;

  const getVerdictBadge = (verdict: string) => {
    if (verdict.includes('Strong Interest')) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
    if (verdict.includes('Conditions')) {
      return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
    if (verdict.includes('Traction')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
    return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner with Investor Confidence Score */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Module 06 • Capital Readiness
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Simulated 4-Investor Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Simulated feedback across four distinct funding philosophies: Angel, Institutional VC, Debt/Bank Officer, and Shark Tank Consumer Judge.
          </p>
        </div>

        <div className="shrink-0 p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Investor Confidence Score
          </span>
          <span className="text-4xl font-black text-amber-400">
            {investorConfidenceScore}
            <span className="text-sm font-normal text-slate-500"> / 100</span>
          </span>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">
            Qualified for Seed Syndicate
          </p>
        </div>
      </div>

      {/* 4 Investor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investorReviews.map((inv) => (
          <div
            key={inv.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 glass-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              {/* Profile Bar */}
              <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src={inv.avatar} alt={inv.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{inv.name}</h3>
                    <p className="text-xs text-indigo-300 font-medium">{inv.persona}</p>
                    <p className="text-[11px] text-slate-400">{inv.firm}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getVerdictBadge(inv.verdict)}`}>
                    {inv.verdict}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">
                    Score: {inv.confidenceScore}/100
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-3 text-xs mb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">
                    What Impressed Me:
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {inv.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concerns */}
                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-rose-400">
                    My Core Concerns:
                  </span>
                  <ul className="space-y-1 text-slate-400">
                    {inv.concerns.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Due Diligence Questions */}
                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    Due Diligence Questions:
                  </span>
                  <ul className="space-y-1 text-slate-300 italic">
                    {inv.questions.map((q, i) => (
                      <li key={i}>&quot;{q}&quot;</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Recommendation */}
            <div className="pt-3 border-t border-slate-800/80 p-3 rounded-xl bg-slate-950/60 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                My Verdict & Recommendation:
              </span>
              <p className="text-slate-200 font-medium">{inv.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/customer-simulator`} className="text-slate-400 hover:text-white">
          ← Previous: Customer Simulator
        </Link>
        <Link
          href={`/analysis/${startup.id}/business-model`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Business Model Canvas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
