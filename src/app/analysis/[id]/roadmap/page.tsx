'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById, updateMilestoneStatus } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, MilestoneStatus } from '@/types/startup';
import { Milestone, CheckCircle2, Clock, Circle, ArrowRight, Flag } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    setData(getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai']);
  }, [id]);

  if (!data) return null;
  const { startup, roadmap } = data;

  const handleStatusChange = (milestoneId: string, newStatus: MilestoneStatus) => {
    updateMilestoneStatus(startup.id, milestoneId, newStatus);
    const updatedPhases = roadmap.map((phase) => ({
      ...phase,
      milestones: phase.milestones.map((m) =>
        m.id === milestoneId ? { ...m, status: newStatus } : m
      ),
    }));
    setData({ ...data, roadmap: updatedPhases });
  };

  const getPriorityBadge = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'LOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 10 • Execution Timeline
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          5-Phase MVP Roadmap & Task Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Actionable milestone path from customer discovery to commercial seed fundraising.
        </p>
      </div>

      {/* 5-Phase Roadmap Cards */}
      <div className="space-y-6">
        {roadmap.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-extrabold text-xs">
                  0{phase.phaseNumber}
                </div>
                <h3 className="text-base font-bold text-white">{phase.phaseTitle}</h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Duration: {phase.duration}
              </span>
            </div>

            {/* Milestones Task Table */}
            <div className="space-y-3">
              {phase.milestones.map((ms) => (
                <div
                  key={ms.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(ms.priority)}`}>
                        {ms.priority} PRIORITY
                      </span>
                      <span className="text-slate-500">Est: {ms.estimatedDuration}</span>
                      {ms.dependencies !== 'None' && (
                        <span className="text-slate-500">Dep: {ms.dependencies}</span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-200">{ms.task}</p>
                  </div>

                  {/* Status Toggle Dropdown */}
                  <div className="shrink-0">
                    <select
                      value={ms.status}
                      onChange={(e) => handleStatusChange(ms.id, e.target.value as MilestoneStatus)}
                      className={`bg-slate-900 border rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none cursor-pointer ${
                        ms.status === 'Completed'
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                          : ms.status === 'In Progress'
                          ? 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10'
                          : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      <option value="Not Started">⚪ Not Started</option>
                      <option value="In Progress">🔵 In Progress</option>
                      <option value="Completed">🟢 Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/technology`} className="text-slate-400 hover:text-white">
          ← Previous: Technology Stack
        </Link>
        <Link
          href={`/analysis/${startup.id}/score`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Investor Readiness Score</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
