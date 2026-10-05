'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Flame,
  Users,
  Award,
  Layers,
  Clock,
  History,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { getScoreColor } from '@/lib/utils';

export default function AnalysisOverviewPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;

  const { startup, analysis, readiness, versions } = data;
  const colors = getScoreColor(analysis.validationScore);

  const breakdownMetrics = [
    { label: 'Problem Strength', value: analysis.breakdown.problemStrength },
    { label: 'Solution Strength', value: analysis.breakdown.solutionStrength },
    { label: 'Market Opportunity', value: analysis.breakdown.marketOpportunity },
    { label: 'Competition Defensibility', value: analysis.breakdown.competition },
    { label: 'Business Model', value: analysis.breakdown.businessModel },
    { label: 'Scalability', value: analysis.breakdown.scalability },
    { label: 'Financial Feasibility', value: analysis.breakdown.financialFeasibility },
    { label: 'Execution Risk Tolerance', value: analysis.breakdown.executionRisk },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Executive AI Synthesis
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">Validated by StartupIQ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {startup.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        <div className="shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-center">
          <ScoreRing
            score={analysis.validationScore}
            size={120}
            strokeWidth={9}
            label="Overall Score"
            sublabel="Venture Ready"
          />
        </div>
      </div>

      {/* 8-Dimensional Score Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>8-Dimensional Validation Breakdown</span>
          </h2>
          <span className="text-xs text-slate-400">Algorithmic scoring 0–100</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {breakdownMetrics.map((item, idx) => {
            const sc = getScoreColor(item.value);
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{item.label}</span>
                  <span className={`font-bold ${sc.text}`}>{item.value}/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.value >= 80 ? 'bg-emerald-400' : item.value >= 65 ? 'bg-indigo-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Quad: Strengths, Weaknesses, Opportunities, Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 glass-card space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Core Strengths & Unfair Advantages</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {analysis.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/20 glass-card space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Operational Weaknesses & Friction</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {analysis.weaknesses.map((wk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/20 glass-card space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Market Expansion Opportunities</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {analysis.opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Risks */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 glass-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Flame className="w-4 h-4" />
              <span>AI Devil&apos;s Advocate Critical Risks</span>
            </div>
            <Link
              href={`/analysis/${startup.id}/devils-advocate`}
              className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300"
            >
              View all risks →
            </Link>
          </div>
          <div className="space-y-3">
            {analysis.risks.slice(0, 2).map((rk) => (
              <div key={rk.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white line-clamp-1">{rk.title}</span>
                  <RiskBadge severity={rk.severity} size="sm" />
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-2">{rk.explanation}</p>
                <p className="text-[11px] text-indigo-300 font-medium">
                  → Fix: {rk.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Co-Founder Actionable Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-500/30 glass-card space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Co-Founder Strategic Recommendations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-indigo-400">PRIORITY 0{i + 1}</span>
              <p className="text-slate-200 leading-relaxed font-medium">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Startup Version History Timeline */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Startup Evolution & Version Timeline</span>
          </h3>
          <span className="text-xs text-slate-400">Current: Version {versions.length}</span>
        </div>

        <div className="relative pl-6 border-l border-slate-800 space-y-6">
          {versions.map((ver, idx) => (
            <div key={ver.id} className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-white">
                  Version {ver.versionNumber} ({ver.date})
                </span>
                <span className="text-xs font-bold text-indigo-400">
                  Validation Score: {ver.score}/100
                </span>
              </div>
              <p className="text-xs font-medium text-slate-300">{ver.changes}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Reason: {ver.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
