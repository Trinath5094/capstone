'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { Users2, ShieldCheck, Sparkles, ArrowRight, Crosshair } from 'lucide-react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function CompetitorsPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, competitors, competitiveAdvantage } = data;

  // Scatter plot data for competitive landscape
  const scatterData = [
    { name: startup.name, price: 4, features: 8.5, isUs: true },
    ...competitors.map(c => ({
      name: c.name,
      price: c.pricePoint,
      features: c.featureCompleteness,
      isUs: false,
    })),
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 03 • Market Positioning
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Competitor Analysis & Positioning
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Direct, indirect, and substitute competitors mapped against pricing and feature completeness.
        </p>
      </div>

      {/* Your Competitive Advantage Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-slate-900 border border-indigo-500/30 glass-card space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Sparkles className="w-5 h-5" />
          <span>Your Unfair Competitive Advantage</span>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {competitiveAdvantage}
        </p>
      </div>

      {/* Competitive Positioning Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <span>Competitive Matrix: Affordability vs. Specialization</span>
          </h3>
          <span className="text-[10px] text-slate-400">Higher Features + Lower Price = Ideal Wedge</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                dataKey="price"
                name="Price Level"
                unit="/10"
                domain={[0, 10]}
                stroke="#64748b"
                fontSize={11}
                label={{ value: 'Price Level (Low → Premium)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 10 }}
              />
              <YAxis
                type="number"
                dataKey="features"
                name="Specialization"
                unit="/10"
                domain={[0, 10]}
                stroke="#64748b"
                fontSize={11}
                label={{ value: 'Feature Completeness', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className={`font-bold ${d.isUs ? 'text-indigo-400' : 'text-white'}`}>{d.name}</p>
                        <p className="text-slate-400">Price Tier: {d.price}/10</p>
                        <p className="text-slate-400">Features: {d.features}/10</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Competitors" data={scatterData} fill="#6366f1" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitors Comparison Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users2 className="w-4 h-4 text-indigo-400" />
          <span>Detailed Competitor Breakdown</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Competitor</th>
                <th className="py-3 px-4 font-semibold">Pricing</th>
                <th className="py-3 px-4 font-semibold">Target Market</th>
                <th className="py-3 px-4 font-semibold">Key Strength</th>
                <th className="py-3 px-4 font-semibold">Key Weakness</th>
                <th className="py-3 px-4 font-semibold text-indigo-300">How You Win</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {competitors.map((c) => (
                <tr key={c.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{c.name}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{c.pricing}</td>
                  <td className="py-3.5 px-4">{c.targetMarket}</td>
                  <td className="py-3.5 px-4 text-emerald-400">{c.strength}</td>
                  <td className="py-3.5 px-4 text-rose-300">{c.weakness}</td>
                  <td className="py-3.5 px-4 font-medium text-indigo-300">{c.differentiator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/market`} className="text-slate-400 hover:text-white">
          ← Previous: Market Intelligence
        </Link>
        <Link
          href={`/analysis/${startup.id}/swot`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: SWOT Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
