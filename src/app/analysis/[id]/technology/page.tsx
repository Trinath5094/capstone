'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, TechItem } from '@/types/startup';
import { Cpu, CheckCircle2, Layers, Server, Database, Cloud, Lock, Bot, HardDrive, BarChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TechnologyStackPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, techStack } = data;

  const stackCategories: { key: keyof typeof techStack; label: string; icon: React.ElementType }[] = [
    { key: 'frontend', label: 'Frontend & PWA', icon: Layers },
    { key: 'backend', label: 'Backend Architecture', icon: Server },
    { key: 'database', label: 'Primary Database', icon: Database },
    { key: 'cloud', label: 'Cloud & Edge Hosting', icon: Cloud },
    { key: 'auth', label: 'Identity & Authentication', icon: Lock },
    { key: 'aiModel', label: 'AI Reasoning Engine', icon: Bot },
    { key: 'vectorDb', label: 'Vector DB & Memory', icon: HardDrive },
    { key: 'storage', label: 'Media & Asset Storage', icon: HardDrive },
    { key: 'analytics', label: 'Product Telemetry', icon: BarChart },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 09 • Systems Architecture
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          AI Technology Stack Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Custom technical architecture tailored for fast development velocity, low initial capex, and sub-second scale.
        </p>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stackCategories.map(({ key, label, icon: Icon }) => {
          const item: TechItem = techStack[key];
          return (
            <div
              key={key}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 glass-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {label}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.reason}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Key Advantages:</span>
                {item.pros.map((pro, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/financials`} className="text-slate-400 hover:text-white">
          ← Previous: Financial Projections
        </Link>
        <Link
          href={`/analysis/${startup.id}/roadmap`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: MVP Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
