'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { CheckCircle2, AlertCircle, Sparkles, Target, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ValidationDeepDivePage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, analysis } = data;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 01 • Deep-Dive
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Problem & Solution Validation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Rigorous analysis of pain severity, value-proposition differentiation, and target customer urgency.
        </p>
      </div>

      {/* Problem Evaluation Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Target className="w-5 h-5" />
            <span>Problem Severity & Urgency Evaluation</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            Severity: {analysis.breakdown.problemStrength}/100 (Tier-1 Urgent)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Documented Problem</span>
          <p className="text-sm font-semibold text-white leading-relaxed">{startup.problem}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-semibold">Pain Frequency</span>
            <span className="text-white font-bold text-sm">High (3x / day touchpoint)</span>
            <p className="text-[11px] text-slate-500 mt-1">Recurring physical necessity with minimal tolerance for delivery failure.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-semibold">Willingness to Switch</span>
            <span className="text-emerald-400 font-bold text-sm">88% in customer surveys</span>
            <p className="text-[11px] text-slate-500 mt-1">High dissatisfaction with current campus mess and overpriced aggregators.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <span className="text-slate-400 block mb-1 font-semibold">Price Sensitivity</span>
            <span className="text-amber-400 font-bold text-sm">Very Sensitive (₹70-₹120)</span>
            <p className="text-[11px] text-slate-500 mt-1">Students will abandon carts if hidden delivery or packaging fees exceed ₹15.</p>
          </div>
        </div>
      </div>

      {/* Solution Feasibility Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>Solution Viability & Moat Potential</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
            Viability: {analysis.breakdown.solutionStrength}/100
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Proposed Solution</span>
          <p className="text-sm font-semibold text-white leading-relaxed">{startup.solution}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300">Why It Works (10x Improvement)</span>
            <p className="text-slate-300 leading-relaxed">
              Batch delivery drops at designated hostel hubs reduce courier fulfillment costs from ₹45 to under ₹9 per order, solving the unit-economic trap that killed earlier food delivery startups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300">Execution Vulnerability</span>
            <p className="text-slate-300 leading-relaxed">
              If meals arrive 15 minutes late between lectures, student trust collapses. Operational punctuality is non-negotiable for student retention.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Skills & Resource Fit */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <Shield className="w-5 h-5" />
          <span>Founder-Problem Fit & Capability Assessment</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Declared Founder Skills</span>
            <span className="font-bold text-white text-sm">{startup.founderSkills}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Initial Working Capital</span>
            <span className="font-bold text-emerald-400 text-sm">{startup.budget}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Execution Match Rating</span>
            <span className="font-bold text-indigo-400 text-sm">82% Fit</span>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-slate-400">Ready to inspect market sizing?</span>
          <Link
            href={`/analysis/${startup.id}/market`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
          >
            <span>Next: Market Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
