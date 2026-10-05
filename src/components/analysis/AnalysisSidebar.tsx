'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  Users2,
  Grid2X2,
  Flame,
  MessageSquare,
  Award,
  CreditCard,
  LineChart,
  Cpu,
  Milestone,
  FileCheck,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { getScoreColor } from '@/lib/utils';

interface AnalysisSidebarProps {
  startupId: string;
  startupName: string;
  score: number;
}

export const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  startupId,
  startupName,
  score,
}) => {
  const pathname = usePathname();
  const colors = getScoreColor(score);

  const navItems = [
    { label: 'Overview', href: `/analysis/${startupId}`, icon: LayoutDashboard },
    { label: 'Validation Deep-Dive', href: `/analysis/${startupId}/validation`, icon: CheckCircle2 },
    { label: 'Market Intelligence', href: `/analysis/${startupId}/market`, icon: TrendingUp },
    { label: 'Competitor Analysis', href: `/analysis/${startupId}/competitors`, icon: Users2 },
    { label: 'SWOT Analysis', href: `/analysis/${startupId}/swot`, icon: Grid2X2 },
    { 
      label: "AI Devil's Advocate", 
      href: `/analysis/${startupId}/devils-advocate`, 
      icon: Flame, 
      badge: 'Critical',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
    },
    { label: 'Customer Simulator', href: `/analysis/${startupId}/customer-simulator`, icon: MessageSquare, badge: 'Live Chat' },
    { label: 'Investor Panel', href: `/analysis/${startupId}/investor-panel`, icon: Award },
    { label: 'Business Model', href: `/analysis/${startupId}/business-model`, icon: CreditCard },
    { label: 'Financial Projections', href: `/analysis/${startupId}/financials`, icon: LineChart },
    { label: 'Technology Stack', href: `/analysis/${startupId}/technology`, icon: Cpu },
    { label: 'MVP Roadmap', href: `/analysis/${startupId}/roadmap`, icon: Milestone },
    { label: 'Investor Readiness', href: `/analysis/${startupId}/score`, icon: FileCheck },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/60 p-4 lg:min-h-[calc(100vh-4rem)]">
      {/* Back to dashboard */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white mb-4 group transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to All Startups
      </Link>

      {/* Startup Badge Card */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Active Startup
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
            {score}/100
          </span>
        </div>
        <h2 className="text-base font-bold text-white truncate" title={startupName}>
          {startupName}
        </h2>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All 13 Modules Ready</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="space-y-1">
        <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Analysis Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge ? (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                    item.badgeColor || 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? 'opacity-100 text-indigo-400' : 'text-slate-500'
                  }`}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Switcher & Report CTA */}
      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <Link
          href={`/reports?startup=${startupId}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all text-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Full PDF Report</span>
        </Link>
      </div>
    </aside>
  );
};
