'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ReadinessScorePage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, readiness } = data;
  const { founderReadiness } = readiness;

  const founderSkillsList = [
    { label: 'Technical Skills', score: founderReadiness.technicalSkills },
    { label: 'Business Knowledge', score: founderReadiness.businessKnowledge },
    { label: 'Marketing Acumen', score: founderReadiness.marketingAcumen },
    { label: 'Financial Preparation', score: founderReadiness.financialPreparation },
    { label: 'Team Strength', score: founderReadiness.teamStrength },
    { label: 'Leadership', score: founderReadiness.leadership },
    { label: 'Execution Capability', score: founderReadiness.executionCapability },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 11 • Investor & Founder Scorecard
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Investor Readiness & Founder Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Quantified fundraising score across 10 institutional diligence vectors.
        </p>
      </div>

      {/* Main Score Cards Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investor Readiness Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 glass-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Institutional Venture Capital
            </span>
            <h2 className="text-xl font-bold text-white">Investor Readiness Score</h2>
            <p className="text-xs text-slate-400">Consensus from 4 simulated investor reviews</p>
          </div>
          <ScoreRing score={readiness.overallScore} size={110} strokeWidth={8} label="" />
        </div>

        {/* Founder Readiness Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 glass-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Entrepreneur Capability
            </span>
            <h2 className="text-xl font-bold text-white">Founder Readiness Score</h2>
            <p className="text-xs text-slate-400">Evaluated on technical & market execution</p>
          </div>
          <ScoreRing score={founderReadiness.overallScore} size={110} strokeWidth={8} label="" />
        </div>
      </div>

      {/* 10 Investor Categories Breakdown Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Detailed Diligence Vector Breakdown</span>
        </h3>

        <div className="space-y-3">
          {readiness.categories.map((cat, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{cat.name} ({cat.weight})</span>
                <span className="font-bold text-indigo-400">{cat.score}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{cat.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 Reasons to Invest vs Top 3 Reasons to Reject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 3 Reasons to Invest */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 glass-card space-y-3">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Top 3 Reasons Investors Will Invest</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {readiness.topReasonsToInvest.map((reason, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold text-emerald-400">#0{i + 1}</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 3 Reasons to Reject */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 glass-card space-y-3">
          <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Top 3 Reasons Investors May Reject</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {readiness.topReasonsToReject.map((reason, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold text-rose-400">#0{i + 1}</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Founder Capability Radar / Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-purple-400" />
          <span>Founder Capability Audit (7 Dimensions)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {founderSkillsList.map((sk, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">{sk.label}</span>
              <span className="text-lg font-bold text-white">{sk.score}/100</span>
              <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-400" style={{ width: `${sk.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/roadmap`} className="text-slate-400 hover:text-white">
          ← Previous: MVP Roadmap
        </Link>
        <Link
          href={`/reports?startup=${startup.id}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Export Full PDF Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
