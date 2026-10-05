'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById, updateSWOT } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, SWOTItem } from '@/types/startup';
import {
  Grid2X2,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  Plus,
  Trash2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function SWOTAnalysisPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);
  const [newText, setNewText] = useState('');
  const [activeQuad, setActiveQuad] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('strengths');

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, swot } = data;

  const handleAddItem = (quadrant: 'strengths' | 'weaknesses' | 'opportunities' | 'threats') => {
    if (!newText.trim()) return;
    const newItem: SWOTItem = {
      id: `item-${Date.now()}`,
      text: newText.trim(),
      impact: 'High',
      suggestedAction: 'Prioritize validation testing.',
    };
    const updated = [...swot[quadrant], newItem];
    updateSWOT(startup.id, quadrant, updated);
    setData({
      ...data,
      swot: { ...data.swot, [quadrant]: updated },
    });
    setNewText('');
  };

  const handleDeleteItem = (quadrant: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', itemId: string) => {
    const updated = swot[quadrant].filter(item => item.id !== itemId);
    updateSWOT(startup.id, quadrant, updated);
    setData({
      ...data,
      swot: { ...data.swot, [quadrant]: updated },
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 04 • Strategic Architecture
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Interactive 2x2 SWOT Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Internal capabilities and external market forces mapped with actionable AI suggestions.
        </p>
      </div>

      {/* Add New Item Toolbar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <select
          value={activeQuad}
          onChange={(e) => setActiveQuad(e.target.value as any)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
        >
          <option value="strengths">Add to Strengths (+)</option>
          <option value="weaknesses">Add to Weaknesses (-)</option>
          <option value="opportunities">Add to Opportunities (↗)</option>
          <option value="threats">Add to Threats (⚠)</option>
        </select>

        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Type a new SWOT strategic observation..."
          className="flex-1 w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          onClick={() => handleAddItem(activeQuad)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Observation</span>
        </button>
      </div>

      {/* 2x2 SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>STRENGTHS (Internal)</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              {swot.strengths.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {swot.strengths.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 group">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-200">{item.text}</p>
                  <button
                    onClick={() => handleDeleteItem('strengths', item.id)}
                    className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.suggestedAction && (
                  <p className="text-[11px] text-emerald-300 font-medium">
                    → AI Action: {item.suggestedAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/20 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>WEAKNESSES (Internal)</span>
            </h3>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
              {swot.weaknesses.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {swot.weaknesses.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 group">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-200">{item.text}</p>
                  <button
                    onClick={() => handleDeleteItem('weaknesses', item.id)}
                    className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.suggestedAction && (
                  <p className="text-[11px] text-amber-300 font-medium">
                    → AI Action: {item.suggestedAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/20 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>OPPORTUNITIES (External)</span>
            </h3>
            <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
              {swot.opportunities.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {swot.opportunities.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 group">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-200">{item.text}</p>
                  <button
                    onClick={() => handleDeleteItem('opportunities', item.id)}
                    className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.suggestedAction && (
                  <p className="text-[11px] text-indigo-300 font-medium">
                    → AI Action: {item.suggestedAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Threats */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>THREATS (External)</span>
            </h3>
            <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
              {swot.threats.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {swot.threats.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1 group">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-200">{item.text}</p>
                  <button
                    onClick={() => handleDeleteItem('threats', item.id)}
                    className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.suggestedAction && (
                  <p className="text-[11px] text-rose-300 font-medium">
                    → AI Action: {item.suggestedAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggested Strategic Actions */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 glass-card space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Suggested Strategic Actions</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">{swot.aiSummary}</p>
        <div className="space-y-2 pt-2">
          {swot.strategicActions.map((act, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/competitors`} className="text-slate-400 hover:text-white">
          ← Previous: Competitors
        </Link>
        <Link
          href={`/analysis/${startup.id}/devils-advocate`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors shadow-lg shadow-rose-600/20"
        >
          <span>Next: AI Devil&apos;s Advocate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
