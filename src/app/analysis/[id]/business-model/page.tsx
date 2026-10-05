'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById, saveStartupData } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, BusinessModelCanvas } from '@/types/startup';
import {
  CreditCard,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Layers,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessModelPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);
  const [canvas, setCanvas] = useState<BusinessModelCanvas | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const item = getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai'];
    setData(item);
    setCanvas(item.businessModel);
  }, [id]);

  if (!data || !canvas) return null;
  const { startup } = data;

  const handleRegenerateAI = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 600);
  };

  const handleEditItem = (key: keyof BusinessModelCanvas, index: number, value: string) => {
    if (!canvas || !Array.isArray(canvas[key])) return;
    const currentList = [...(canvas[key] as string[])];
    currentList[index] = value;
    const updated = { ...canvas, [key]: currentList };
    setCanvas(updated);
    saveStartupData({ ...data, businessModel: updated });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Module 07 • Monetization Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Interactive Business Model Canvas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Alexander Osterwalder 9-box framework integrated with AI revenue model recommendations.
          </p>
        </div>

        <button
          onClick={handleRegenerateAI}
          disabled={isRegenerating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>{isRegenerating ? 'Optimizing Canvas...' : 'Regenerate with AI'}</span>
        </button>
      </div>

      {/* AI Recommended Revenue Model Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 glass-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <CreditCard className="w-5 h-5" />
            <span>AI Recommended Revenue Architecture</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-extrabold">
            {canvas.recommendedModel.type}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Strategic Rationale (Why?)</span>
            <p className="text-slate-200 leading-relaxed">{canvas.recommendedModel.why}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Expected Initial Run-Rate</span>
            <p className="text-white font-bold text-sm">{canvas.recommendedModel.expectedMonthlyRevenue}</p>
            <p className="text-[11px] text-slate-400 mt-1">Based on student subscription passes</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-cyan-400">Structural Advantages</span>
            <ul className="space-y-0.5 text-slate-300">
              {canvas.recommendedModel.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-emerald-400">✓</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 9-Box Osterwalder Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Box 1: Key Partners */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            1. Key Partners
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.keyPartners.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('keyPartners', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 2: Key Activities */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            2. Key Activities
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.keyActivities.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('keyActivities', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 3: Value Propositions (Center) */}
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/40 space-y-2 lg:col-span-1 shadow-lg">
          <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
            3. Value Propositions
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.valuePropositions.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('valuePropositions', idx, e.target.value)}
                className="w-full bg-slate-950/80 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 4: Customer Relationships */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            4. Relationships
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.customerRelationships.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('customerRelationships', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 5: Customer Segments */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            5. Customer Segments
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.customerSegments.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('customerSegments', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 6: Key Resources */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-2">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            6. Key Resources
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.keyResources.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('keyResources', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 7: Channels */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 lg:col-span-3">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
            7. Distribution Channels
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {canvas.channels.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('channels', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 8: Cost Structure (Bottom Left) */}
        <div className="p-5 rounded-xl bg-rose-950/10 border border-rose-500/20 space-y-2 lg:col-span-2">
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
            8. Cost Structure
          </span>
          <div className="space-y-1.5 text-xs text-slate-300">
            {canvas.costStructure.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('costStructure', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>

        {/* Box 9: Revenue Streams (Bottom Right) */}
        <div className="p-5 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-2 lg:col-span-3">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            9. Revenue Streams
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {canvas.revenueStreams.map((item, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={item}
                onChange={(e) => handleEditItem('revenueStreams', idx, e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/investor-panel`} className="text-slate-400 hover:text-white">
          ← Previous: Investor Panel
        </Link>
        <Link
          href={`/analysis/${startup.id}/financials`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Financial Planning & Projections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
