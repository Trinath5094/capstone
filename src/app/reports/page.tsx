'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getStoredStartups } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import {
  Printer, Download, Share2, ShieldCheck, Sparkles, TrendingUp, Flame,
  Users, Award, Layers, CheckCircle2, AlertTriangle, Target, Cpu,
  Milestone, Grid2X2, LineChart, Swords, Zap, History, ArrowRight
} from 'lucide-react';

/* ─────────────────────────── helpers ─────────────────────────── */
function SectionHeader({ icon: Icon, number, title, color = 'text-indigo-400' }: {
  icon: React.ElementType; number: string; title: string; color?: string;
}) {
  return (
    <div className={`flex items-center gap-3 pb-2 border-b-2 border-slate-700 print:border-gray-300 mb-4`}>
      <div className="w-8 h-8 rounded-lg bg-slate-800 print:bg-gray-100 flex items-center justify-center shrink-0">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-black text-slate-500 print:text-gray-400 uppercase tracking-widest">{number}</span>
        <h2 className="text-base font-extrabold text-white print:text-black uppercase tracking-wide">{title}</h2>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = pct >= 80 ? '#34d399' : pct >= 65 ? '#818cf8' : '#fbbf24';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-slate-400 print:text-gray-600">{label}</span>
        <span className="font-bold text-white print:text-black">{value}/{max}</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-800 print:bg-gray-200 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${color}`}>
      {text}
    </span>
  );
}

function severityStyle(s: string) {
  if (s === 'HIGH') return 'bg-red-900/60 text-red-300 print:bg-red-100 print:text-red-700';
  if (s === 'MEDIUM') return 'bg-amber-900/60 text-amber-300 print:bg-amber-100 print:text-amber-700';
  return 'bg-emerald-900/60 text-emerald-300 print:bg-emerald-100 print:text-emerald-700';
}

function verdictStyle(v: string) {
  if (v === 'Strong Interest') return 'text-emerald-400 print:text-emerald-700';
  if (v === 'Interested with Conditions') return 'text-indigo-400 print:text-indigo-700';
  if (v === 'Needs Traction') return 'text-amber-400 print:text-amber-700';
  return 'text-red-400 print:text-red-700';
}

/* ─────────────────────────── main content ─────────────────────── */
function ReportsContent() {
  const searchParams = useSearchParams();
  const startupParam = searchParams.get('startup') || 'campusbite-ai';

  const [startups, setStartups] = useState<Record<string, CompleteStartupData>>({});
  const [selectedId, setSelectedId] = useState(startupParam);
  const [shared, setShared] = useState(false);

  useEffect(() => { setStartups(getStoredStartups()); }, []);

  const data = startups[selectedId] || demoDatabase[selectedId] || demoDatabase['campusbite-ai'];
  if (!data) return null;

  const {
    startup, analysis, market, swot, competitors, personas,
    investorReviews, businessModel, financials, techStack,
    roadmap, readiness, pivots, versions, competitiveAdvantage
  } = data;

  const handlePrint = () => window.print();

  const handleExport = () => {
    const sections: string[] = [
      `═══════════════════════════════════════════════════════`,
      `  STARTUPIQ — COMPLETE ANALYSIS DOSSIER`,
      `  ${startup.name.toUpperCase()}`,
      `  "${startup.tagline}"`,
      `═══════════════════════════════════════════════════════`,
      ``,
      `VALIDATION SCORE : ${analysis.validationScore}/100`,
      `INVESTOR SCORE   : ${readiness.overallScore}/100`,
      `LOCATION         : ${startup.location}`,
      `BUDGET           : ${startup.budget}`,
      `STATUS           : ${startup.status}`,
      ``,
      `── 1. EXECUTIVE SUMMARY ──────────────────────────────`,
      analysis.summary,
      ``,
      `── 2. SCORE BREAKDOWN ───────────────────────────────`,
      `Problem Strength       : ${analysis.breakdown.problemStrength}/100`,
      `Solution Strength      : ${analysis.breakdown.solutionStrength}/100`,
      `Market Opportunity     : ${analysis.breakdown.marketOpportunity}/100`,
      `Competition Defense    : ${analysis.breakdown.competition}/100`,
      `Business Model         : ${analysis.breakdown.businessModel}/100`,
      `Scalability            : ${analysis.breakdown.scalability}/100`,
      `Financial Feasibility  : ${analysis.breakdown.financialFeasibility}/100`,
      `Execution Risk         : ${analysis.breakdown.executionRisk}/100`,
      ``,
      `── 3. STRENGTHS ──────────────────────────────────────`,
      ...analysis.strengths.map(s => `  ✓ ${s}`),
      ``,
      `── 4. WEAKNESSES ─────────────────────────────────────`,
      ...analysis.weaknesses.map(w => `  ✗ ${w}`),
      ``,
      `── 5. OPPORTUNITIES ──────────────────────────────────`,
      ...analysis.opportunities.map(o => `  → ${o}`),
      ``,
      `── 6. AI RECOMMENDATIONS ─────────────────────────────`,
      ...analysis.recommendations.map((r, i) => `  ${i + 1}. ${r}`),
      ``,
      `── 7. MARKET INTELLIGENCE ────────────────────────────`,
      `TAM : ${market.tam}  |  SAM : ${market.sam}  |  SOM : ${market.som}`,
      `CAGR: ${market.cagr}  |  Opportunity Score: ${market.opportunityScore}/100`,
      ``,
      `Market Segments:`,
      ...market.segments.map(s => `  ${s.name}: ${s.percentage}% (${s.value})`),
      ``,
      `Key Trends:`,
      ...market.trends.map(t => `  • ${t}`),
      ``,
      `Failed Predecessors:`,
      ...market.failedPredecessors.map(f => `  [${f.name}] ${f.whyFailed}\n  Lesson: ${f.lesson}`),
      ``,
      `── 8. SWOT ANALYSIS ──────────────────────────────────`,
      `STRENGTHS:`,
      ...swot.strengths.map(s => `  + ${s.text} [${s.impact}]`),
      `WEAKNESSES:`,
      ...swot.weaknesses.map(w => `  - ${w.text} [${w.impact}]`),
      `OPPORTUNITIES:`,
      ...swot.opportunities.map(o => `  → ${o.text} [${o.impact}]`),
      `THREATS:`,
      ...swot.threats.map(t => `  ! ${t.text} [${t.impact}]`),
      ``,
      `Strategic Actions:`,
      ...swot.strategicActions.map((a, i) => `  ${i + 1}. ${a}`),
      ``,
      `── 9. COMPETITOR ANALYSIS ────────────────────────────`,
      ...competitors.map(c => [
        `  [${c.name}] Market Share: ${c.marketShare}%`,
        `  Strength: ${c.strength}`,
        `  Weakness: ${c.weakness}`,
        `  Our Edge: ${c.differentiator}`,
        ``
      ].join('\n')),
      ``,
      `── 10. CUSTOMER PERSONAS ─────────────────────────────`,
      ...personas.map(p => [
        `  ${p.name} (${p.role}, ${p.age}y, ${p.location})`,
        `  Income: ${p.income} | Budget: ${p.budget} | ${p.techAdoption}`,
        `  Pain Points: ${p.painPoints.join('; ')}`,
        `  Goals: ${p.goals.join('; ')}`,
        `  Quote: "${p.quote}"`,
        ``
      ].join('\n')),
      ``,
      `── 11. AI DEVIL'S ADVOCATE RISKS ────────────────────`,
      ...analysis.risks.map(r => [
        `  [${r.severity}] ${r.title} (${r.category})`,
        `  ${r.explanation}`,
        `  Evidence: ${r.evidence}`,
        `  Fix: ${r.recommendation}`,
        ``
      ].join('\n')),
      ``,
      `── 12. BUSINESS MODEL CANVAS ─────────────────────────`,
      `Key Partners: ${businessModel.keyPartners.join('; ')}`,
      `Key Activities: ${businessModel.keyActivities.join('; ')}`,
      `Key Resources: ${businessModel.keyResources.join('; ')}`,
      `Value Propositions: ${businessModel.valuePropositions.join('; ')}`,
      `Customer Segments: ${businessModel.customerSegments.join('; ')}`,
      `Channels: ${businessModel.channels.join('; ')}`,
      `Customer Relationships: ${businessModel.customerRelationships.join('; ')}`,
      `Revenue Streams: ${businessModel.revenueStreams.join('; ')}`,
      `Cost Structure: ${businessModel.costStructure.join('; ')}`,
      `Recommended Model: ${businessModel.recommendedModel.type}`,
      `Why: ${businessModel.recommendedModel.why}`,
      ``,
      `── 13. FINANCIAL MODEL ───────────────────────────────`,
      `Monthly Revenue   : ${financials.monthlyRevenue}`,
      `Monthly Expenses  : ${financials.monthlyExpenses}`,
      `Gross Profit      : ${financials.grossProfit}`,
      `Burn Rate         : ${financials.burnRate}`,
      `Break-Even Cust.  : ${financials.breakEvenCustomers}`,
      `Runway            : ${financials.runwayMonths} months`,
      ``,
      `12-Month Projections:`,
      `Month | Revenue | Expenses | Profit | Customers`,
      ...financials.projections.map(p =>
        `  ${p.month.padEnd(8)} | ${String(p.revenue).padEnd(8)} | ${String(p.expenses).padEnd(9)} | ${String(p.profit).padEnd(7)} | ${p.customers}`
      ),
      ``,
      `── 14. TECHNOLOGY STACK ──────────────────────────────`,
      ...Object.entries(techStack).map(([k, v]) =>
        `  ${k.toUpperCase().padEnd(12)}: ${(v as { name: string; reason: string }).name} — ${(v as { name: string; reason: string }).reason}`
      ),
      ``,
      `── 15. MVP ROADMAP ───────────────────────────────────`,
      ...roadmap.map(phase => [
        `  Phase ${phase.phaseNumber}: ${phase.phaseTitle} (${phase.duration})`,
        ...phase.milestones.map(m => `    • [${m.priority}] ${m.task} (${m.estimatedDuration}) — ${m.status}`),
        ``
      ].join('\n')),
      ``,
      `── 16. INVESTOR PANEL ────────────────────────────────`,
      ...investorReviews.map(inv => [
        `  ${inv.name} (${inv.persona}) — ${inv.firm}`,
        `  Verdict: ${inv.verdict} | Score: ${inv.confidenceScore}/100`,
        `  Strengths: ${inv.strengths.join('; ')}`,
        `  Concerns: ${inv.concerns.join('; ')}`,
        `  Recommendation: ${inv.recommendation}`,
        ``
      ].join('\n')),
      ``,
      `── 17. INVESTOR READINESS ────────────────────────────`,
      `Overall Score: ${readiness.overallScore}/100`,
      ...readiness.categories.map(c => `  ${c.name.padEnd(25)}: ${c.score}/100 — ${c.comment}`),
      ``,
      `Top Reasons to Invest:`,
      ...readiness.topReasonsToInvest.map(r => `  ✓ ${r}`),
      `Top Reasons to Reject:`,
      ...readiness.topReasonsToReject.map(r => `  ✗ ${r}`),
      `Improvement Roadmap:`,
      ...readiness.improvementRoadmap.map((r, i) => `  ${i + 1}. ${r}`),
      ``,
      `── 18. PIVOT OPTIONS ─────────────────────────────────`,
      ...pivots.map(p => [
        `  ${p.title}`,
        `  ${p.description}`,
        `  Market Potential: ${p.marketPotential} | Risk: ${p.risk} | Investment: ${p.investment}`,
        `  Revenue: ${p.revenuePotential}`,
        ``
      ].join('\n')),
      ``,
      `── 19. VERSION TIMELINE ──────────────────────────────`,
      ...versions.map(v => `  v${v.versionNumber} (${v.date}) — Score: ${v.score}/100\n  ${v.changes}`),
      ``,
      `═══════════════════════════════════════════════════════`,
      `Generated by StartupIQ AI Co-Founder Platform`,
      `Report ID: ${startup.id} | ${new Date().toLocaleDateString()}`,
      `═══════════════════════════════════════════════════════`,
    ];
    const blob = new Blob([sections.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${startup.name.replace(/\s+/g, '-')}-full-analysis.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 print:p-0 print:space-y-0">

      {/* ── Toolbar (hidden on print) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:hidden">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Complete Analysis Report</span>
          <h1 className="text-3xl font-extrabold text-white">Full Startup Intelligence Dossier</h1>
          <p className="text-xs text-slate-400 mt-1">All 19 analysis modules in one printable PDF</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded-xl px-3 py-2.5"
          >
            {Object.values(startups).map(s => (
              <option key={s.startup.id} value={s.startup.id}>{s.startup.name}</option>
            ))}
          </select>
          <button onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/25">
            <Printer className="w-4 h-4" /><span>Print / Save PDF</span>
          </button>
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/40 text-slate-200 text-xs font-bold transition-all">
            <Download className="w-4 h-4 text-indigo-400" /><span>Export .txt</span>
          </button>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); setShared(true); setTimeout(() => setShared(false), 2000); }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold transition-all">
            <Share2 className="w-4 h-4 text-cyan-400" /><span>{shared ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* ════════════════════ PRINTABLE BODY ════════════════════ */}
      <div className="space-y-8 print:space-y-6 text-[13px]">

        {/* ── COVER ── */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 print:bg-white print:border-gray-300 print:rounded-none">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">IQ</div>
                <span className="text-xs font-black text-indigo-400 print:text-indigo-700 uppercase tracking-widest">StartupIQ Complete Dossier</span>
              </div>
              <h1 className="text-4xl font-black text-white print:text-black">{startup.name}</h1>
              <p className="text-sm text-indigo-300 print:text-indigo-700 font-semibold italic">"{startup.tagline}"</p>
              <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-slate-400 print:text-gray-600">
                <span>📍 {startup.location}</span>
                <span>💰 Budget: {startup.budget}</span>
                <span>🎯 {startup.targetCustomer}</span>
                <span>📅 {new Date(startup.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="shrink-0 text-right space-y-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 print:text-gray-500">Validation Score</p>
                <p className="text-5xl font-black text-emerald-400 print:text-emerald-700 leading-none">{analysis.validationScore}</p>
                <p className="text-xs text-slate-500 print:text-gray-500">/100</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 print:text-gray-500">Investor Readiness</p>
                <p className="text-3xl font-black text-indigo-400 print:text-indigo-700 leading-none">{readiness.overallScore}</p>
                <p className="text-xs text-slate-500 print:text-gray-500">/100</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 print:text-emerald-700 justify-end">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black">AI Co-Founder Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 1. EXECUTIVE SUMMARY ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Sparkles} number="01" title="Executive Summary" />
          <p className="text-slate-300 print:text-gray-800 leading-relaxed">{analysis.summary}</p>
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-800/60 print:bg-gray-50 border border-slate-700 print:border-gray-200">
              <p className="text-slate-500 print:text-gray-500 mb-1">Business Model</p>
              <p className="text-white print:text-black font-semibold">{startup.businessModel}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 print:bg-gray-50 border border-slate-700 print:border-gray-200">
              <p className="text-slate-500 print:text-gray-500 mb-1">Founder Skills</p>
              <p className="text-white print:text-black font-semibold">{startup.founderSkills}</p>
            </div>
          </div>
        </div>

        {/* ── 2. SCORE BREAKDOWN ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Sparkles} number="02" title="8-Dimensional Score Breakdown" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['Problem Strength', analysis.breakdown.problemStrength],
              ['Solution Strength', analysis.breakdown.solutionStrength],
              ['Market Opportunity', analysis.breakdown.marketOpportunity],
              ['Competition Defense', analysis.breakdown.competition],
              ['Business Model', analysis.breakdown.businessModel],
              ['Scalability', analysis.breakdown.scalability],
              ['Financial Feasibility', analysis.breakdown.financialFeasibility],
              ['Execution Risk Tolerance', analysis.breakdown.executionRisk],
            ].map(([label, val]) => (
              <ScoreBar key={label as string} label={label as string} value={val as number} />
            ))}
          </div>
        </div>

        {/* ── 3. STRENGTHS / WEAKNESSES / OPPORTUNITIES / RECOMMENDATIONS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={CheckCircle2} number="03" title="Strategic SWOT Highlights & Recommendations" color="text-emerald-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 print:bg-green-50 border border-emerald-500/20 print:border-green-200 space-y-2">
              <p className="text-xs font-black text-emerald-400 print:text-emerald-700 uppercase">Core Strengths</p>
              <ul className="space-y-1.5">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                    <span className="text-emerald-400 shrink-0">✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/30 print:bg-amber-50 border border-amber-500/20 print:border-amber-200 space-y-2">
              <p className="text-xs font-black text-amber-400 print:text-amber-700 uppercase">Key Weaknesses</p>
              <ul className="space-y-1.5">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                    <span className="text-amber-400 shrink-0">!</span>{w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/30 print:bg-indigo-50 border border-indigo-500/20 print:border-indigo-200 space-y-2">
              <p className="text-xs font-black text-indigo-400 print:text-indigo-700 uppercase">Opportunities</p>
              <ul className="space-y-1.5">
                {analysis.opportunities.map((o, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                    <span className="text-indigo-400 shrink-0">→</span>{o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/30 print:bg-purple-50 border border-purple-500/20 print:border-purple-200 space-y-2">
              <p className="text-xs font-black text-purple-400 print:text-purple-700 uppercase">AI Recommendations</p>
              <ul className="space-y-1.5">
                {analysis.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                    <span className="font-black text-purple-400 shrink-0">0{i + 1}</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── 4. MARKET INTELLIGENCE ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={TrendingUp} number="04" title="Market Intelligence" color="text-emerald-400" />
          {/* TAM/SAM/SOM */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'TAM (Total)', value: market.tam, sub: 'Total Addressable Market', color: 'text-indigo-400 print:text-indigo-700' },
              { label: 'SAM (Serviceable)', value: market.sam, sub: 'Serviceable Available Market', color: 'text-purple-400 print:text-purple-700' },
              { label: 'SOM (Obtainable)', value: market.som, sub: 'Serviceable Obtainable Market', color: 'text-emerald-400 print:text-emerald-700' },
            ].map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-slate-800/60 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-1">
                <p className="text-[10px] text-slate-500 print:text-gray-500 uppercase font-bold">{m.label}</p>
                <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                <p className="text-[10px] text-slate-500 print:text-gray-500">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200">
              <p className="text-slate-500 print:text-gray-500 font-bold uppercase text-[10px]">CAGR</p>
              <p className="text-white print:text-black font-black text-base">{market.cagr}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200">
              <p className="text-slate-500 print:text-gray-500 font-bold uppercase text-[10px]">Opportunity Score</p>
              <p className="text-emerald-400 print:text-emerald-700 font-black text-base">{market.opportunityScore}/100</p>
            </div>
          </div>
          {/* Segments */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">Market Segments</p>
            {market.segments.map((seg, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] text-slate-300 print:text-gray-800 w-48 shrink-0">{seg.name}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 print:bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${seg.percentage}%` }} />
                </div>
                <span className="text-[11px] font-bold text-indigo-400 print:text-indigo-700 w-10 text-right">{seg.percentage}%</span>
                <span className="text-[11px] text-slate-400 print:text-gray-500 w-20 text-right">{seg.value}</span>
              </div>
            ))}
          </div>
          {/* Growth Projections */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">5-Year Growth Projection</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 print:border-gray-300">
                    <th className="text-left text-slate-500 print:text-gray-500 py-2 pr-4">Year</th>
                    <th className="text-right text-slate-500 print:text-gray-500 py-2 pr-4">Market Size (₹Cr)</th>
                    <th className="text-right text-slate-500 print:text-gray-500 py-2">Projected Share (₹Cr)</th>
                  </tr>
                </thead>
                <tbody>
                  {market.growthProjection.map(g => (
                    <tr key={g.year} className="border-b border-slate-800/50 print:border-gray-200">
                      <td className="py-1.5 pr-4 font-bold text-white print:text-black">{g.year}</td>
                      <td className="py-1.5 pr-4 text-right text-slate-300 print:text-gray-700">{g.marketSize}</td>
                      <td className="py-1.5 text-right text-emerald-400 print:text-emerald-700 font-bold">{g.projectedShare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Trends */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">Key Market Trends</p>
            <ul className="space-y-1">
              {market.trends.map((t, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                  <span className="text-indigo-400 shrink-0">•</span>{t}
                </li>
              ))}
            </ul>
          </div>
          {/* Failed Predecessors */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">Failed Predecessor Post-Mortem</p>
            {market.failedPredecessors.map((fp, i) => (
              <div key={i} className="p-4 rounded-xl bg-rose-950/20 print:bg-red-50 border border-rose-500/20 print:border-red-200 space-y-1 text-[11px]">
                <p className="font-black text-rose-400 print:text-red-700">{fp.name}</p>
                <p className="text-slate-400 print:text-gray-600"><span className="font-bold text-slate-300 print:text-gray-700">What they tried:</span> {fp.whatTheyTried}</p>
                <p className="text-slate-400 print:text-gray-600"><span className="font-bold text-slate-300 print:text-gray-700">Why failed:</span> {fp.whyFailed}</p>
                <p className="text-slate-400 print:text-gray-600"><span className="font-bold text-slate-300 print:text-gray-700">Lesson:</span> {fp.lesson}</p>
                <p className="text-indigo-300 print:text-indigo-700 font-semibold"><span className="font-black">How we avoid it:</span> {fp.howToAvoid}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. SWOT ANALYSIS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Layers} number="05" title="Full SWOT Analysis" color="text-blue-400" />
          <p className="text-[11px] text-slate-400 print:text-gray-600 italic">{swot.aiSummary}</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Strengths', items: swot.strengths, color: 'border-emerald-500/30 bg-emerald-950/20 print:border-green-200 print:bg-green-50', hdr: 'text-emerald-400 print:text-emerald-700', dot: 'bg-emerald-400' },
              { label: 'Weaknesses', items: swot.weaknesses, color: 'border-amber-500/30 bg-amber-950/20 print:border-amber-200 print:bg-amber-50', hdr: 'text-amber-400 print:text-amber-700', dot: 'bg-amber-400' },
              { label: 'Opportunities', items: swot.opportunities, color: 'border-indigo-500/30 bg-indigo-950/20 print:border-indigo-200 print:bg-indigo-50', hdr: 'text-indigo-400 print:text-indigo-700', dot: 'bg-indigo-400' },
              { label: 'Threats', items: swot.threats, color: 'border-rose-500/30 bg-rose-950/20 print:border-red-200 print:bg-red-50', hdr: 'text-rose-400 print:text-red-700', dot: 'bg-rose-400' },
            ].map(({ label, items, color, hdr, dot }) => (
              <div key={label} className={`p-4 rounded-xl border ${color} space-y-2`}>
                <p className={`text-xs font-black uppercase ${hdr}`}>{label}</p>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-[10px] text-slate-300 print:text-gray-800 flex gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0 mt-1`} />
                      <span>{item.text} <span className={`font-bold ${hdr}`}>[{item.impact}]</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-2">
            <p className="text-[11px] font-black text-white print:text-black uppercase">Strategic Actions</p>
            <ol className="space-y-1">
              {swot.strategicActions.map((a, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-slate-300 print:text-gray-800">
                  <span className="font-black text-indigo-400 print:text-indigo-700 shrink-0">{i + 1}.</span>{a}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── 6. COMPETITOR ANALYSIS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Swords} number="06" title="Competitor Analysis" color="text-rose-400" />
          {competitiveAdvantage && (
            <p className="text-[11px] text-indigo-300 print:text-indigo-700 bg-indigo-950/30 print:bg-indigo-50 border border-indigo-500/20 print:border-indigo-200 rounded-xl p-3 font-semibold">
              🏆 Competitive Advantage: {competitiveAdvantage}
            </p>
          )}
          <div className="space-y-4">
            {competitors.map((c, i) => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-black text-white print:text-black">{c.name}</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-slate-700 print:bg-gray-200 text-slate-300 print:text-gray-700 px-2 py-0.5 rounded-full font-bold">
                      {c.marketShare}% share
                    </span>
                    <span className="text-[10px] bg-slate-700 print:bg-gray-200 text-slate-300 print:text-gray-700 px-2 py-0.5 rounded-full font-bold">
                      {c.pricing}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div>
                    <p className="text-slate-500 print:text-gray-500 font-bold uppercase mb-0.5">Their Strength</p>
                    <p className="text-slate-300 print:text-gray-800">{c.strength}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 print:text-gray-500 font-bold uppercase mb-0.5">Their Weakness</p>
                    <p className="text-slate-300 print:text-gray-800">{c.weakness}</p>
                  </div>
                  <div>
                    <p className="text-emerald-500 print:text-emerald-700 font-bold uppercase mb-0.5">Our Differentiator</p>
                    <p className="text-emerald-300 print:text-emerald-800">{c.differentiator}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-[10px]">
                  <div>
                    <span className="text-slate-500 print:text-gray-500">Price Point: </span>
                    <span className="font-bold text-white print:text-black">{c.pricePoint}/10</span>
                  </div>
                  <div>
                    <span className="text-slate-500 print:text-gray-500">Features: </span>
                    <span className="font-bold text-white print:text-black">{c.featureCompleteness}/10</span>
                  </div>
                  <div>
                    <span className="text-slate-500 print:text-gray-500">Target: </span>
                    <span className="font-bold text-white print:text-black">{c.targetMarket}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. CUSTOMER PERSONAS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Users} number="07" title="Customer Personas" color="text-purple-400" />
          <div className="space-y-4">
            {personas.map((p, i) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-black shrink-0">
                    {p.avatar}
                  </div>
                  <div>
                    <p className="font-black text-white print:text-black">{p.name}</p>
                    <p className="text-[11px] text-slate-400 print:text-gray-600">{p.role} · {p.age}y · {p.location}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <span className="text-[10px] bg-indigo-900/60 print:bg-indigo-100 text-indigo-300 print:text-indigo-700 px-2 py-0.5 rounded-full font-bold">{p.techAdoption}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10px]">
                  <div>
                    <p className="text-slate-500 print:text-gray-500 font-bold uppercase mb-1">Pain Points</p>
                    <ul className="space-y-0.5">
                      {p.painPoints.map((pp, j) => <li key={j} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-rose-400">•</span>{pp}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-slate-500 print:text-gray-500 font-bold uppercase mb-1">Goals</p>
                    <ul className="space-y-0.5">
                      {p.goals.map((g, j) => <li key={j} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-emerald-400">•</span>{g}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4 text-[10px]">
                  <span className="text-slate-500 print:text-gray-500">Budget: <span className="text-white print:text-black font-bold">{p.budget}</span></span>
                  <span className="text-slate-500 print:text-gray-500">Income: <span className="text-white print:text-black font-bold">{p.income}</span></span>
                </div>
                <blockquote className="text-[11px] italic text-indigo-300 print:text-indigo-700 border-l-2 border-indigo-500 pl-3">
                  "{p.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. DEVIL'S ADVOCATE ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Flame} number="08" title="AI Devil's Advocate — Full Risk Analysis" color="text-rose-400" />
          <div className="space-y-4">
            {analysis.risks.map((risk, i) => (
              <div key={risk.id} className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-black text-white print:text-black text-[13px]">{risk.title}</p>
                  <div className="flex gap-2 shrink-0">
                    <Pill text={risk.severity} color={severityStyle(risk.severity)} />
                    <Pill text={risk.category} color="bg-slate-700 text-slate-300 print:bg-gray-200 print:text-gray-700" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 print:text-gray-600">{risk.explanation}</p>
                <p className="text-[11px] text-amber-300 print:text-amber-700 bg-amber-950/20 print:bg-amber-50 border border-amber-500/20 print:border-amber-200 rounded-lg p-2">
                  <span className="font-black">Evidence:</span> {risk.evidence}
                </p>
                <p className="text-[11px] text-emerald-300 print:text-emerald-700 bg-emerald-950/20 print:bg-emerald-50 border border-emerald-500/20 print:border-emerald-200 rounded-lg p-2">
                  <span className="font-black">→ Fix:</span> {risk.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 9. BUSINESS MODEL CANVAS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Grid2X2} number="09" title="Business Model Canvas" color="text-cyan-400" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px]">
            {[
              { label: 'Key Partners', items: businessModel.keyPartners, color: 'border-indigo-500/20' },
              { label: 'Key Activities', items: businessModel.keyActivities, color: 'border-purple-500/20' },
              { label: 'Key Resources', items: businessModel.keyResources, color: 'border-blue-500/20' },
              { label: 'Value Propositions', items: businessModel.valuePropositions, color: 'border-emerald-500/20' },
              { label: 'Customer Relationships', items: businessModel.customerRelationships, color: 'border-cyan-500/20' },
              { label: 'Customer Segments', items: businessModel.customerSegments, color: 'border-teal-500/20' },
              { label: 'Channels', items: businessModel.channels, color: 'border-amber-500/20' },
              { label: 'Cost Structure', items: businessModel.costStructure, color: 'border-rose-500/20' },
              { label: 'Revenue Streams', items: businessModel.revenueStreams, color: 'border-green-500/20' },
            ].map(({ label, items, color }) => (
              <div key={label} className={`p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border ${color} print:border-gray-200 space-y-1`}>
                <p className="font-black text-white print:text-black uppercase text-[9px] tracking-wider">{label}</p>
                <ul className="space-y-0.5">
                  {items.map((item, j) => (
                    <li key={j} className="text-slate-400 print:text-gray-600 flex gap-1">
                      <span className="text-indigo-400 shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-indigo-950/30 print:bg-indigo-50 border border-indigo-500/20 print:border-indigo-200 space-y-2">
            <p className="text-[11px] font-black text-indigo-400 print:text-indigo-700 uppercase">Recommended Revenue Model: {businessModel.recommendedModel.type}</p>
            <p className="text-[11px] text-slate-300 print:text-gray-800">{businessModel.recommendedModel.why}</p>
            <p className="text-[11px] font-bold text-emerald-400 print:text-emerald-700">Expected Monthly Revenue: {businessModel.recommendedModel.expectedMonthlyRevenue}</p>
          </div>
        </div>

        {/* ── 10. FINANCIAL MODEL ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={LineChart} number="10" title="Financial Model & Projections" color="text-emerald-400" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            {[
              { label: 'Monthly Revenue', value: String(financials.monthlyRevenue), color: 'text-emerald-400 print:text-emerald-700' },
              { label: 'Monthly Expenses', value: String(financials.monthlyExpenses), color: 'text-slate-300 print:text-gray-800' },
              { label: 'Gross Profit', value: String(financials.grossProfit), color: 'text-indigo-400 print:text-indigo-700' },
              { label: 'Burn Rate / mo', value: String(financials.burnRate), color: 'text-rose-400 print:text-red-700' },
              { label: 'Break-Even Customers', value: String(financials.breakEvenCustomers), color: 'text-amber-400 print:text-amber-700' },
              { label: 'Runway', value: `${financials.runwayMonths} months`, color: 'text-cyan-400 print:text-cyan-700' },
              { label: 'Price / Customer', value: `₹${financials.pricePerCustomer}`, color: 'text-purple-400 print:text-purple-700' },
              { label: 'Expected Customers', value: String(financials.expectedCustomers), color: 'text-blue-400 print:text-blue-700' },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-1">
                <p className="text-slate-500 print:text-gray-500 text-[9px] uppercase font-bold">{item.label}</p>
                <p className={`font-black text-base ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          {/* 12-month projection table */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">12-Month Revenue Projection</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-slate-800/60 print:bg-gray-100">
                    <th className="text-left text-slate-400 print:text-gray-600 px-3 py-2 font-bold">Month</th>
                    <th className="text-right text-slate-400 print:text-gray-600 px-3 py-2 font-bold">Revenue (₹)</th>
                    <th className="text-right text-slate-400 print:text-gray-600 px-3 py-2 font-bold">Expenses (₹)</th>
                    <th className="text-right text-slate-400 print:text-gray-600 px-3 py-2 font-bold">Profit (₹)</th>
                    <th className="text-right text-slate-400 print:text-gray-600 px-3 py-2 font-bold">Customers</th>
                  </tr>
                </thead>
                <tbody>
                  {financials.projections.map((proj, i) => (
                    <tr key={i} className="border-b border-slate-800/50 print:border-gray-200">
                      <td className="px-3 py-1.5 font-bold text-white print:text-black">{proj.month}</td>
                      <td className="px-3 py-1.5 text-right text-emerald-400 print:text-emerald-700 font-semibold">{proj.revenue.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right text-slate-300 print:text-gray-700">{proj.expenses.toLocaleString()}</td>
                      <td className={`px-3 py-1.5 text-right font-bold ${proj.profit >= 0 ? 'text-emerald-400 print:text-emerald-700' : 'text-rose-400 print:text-red-700'}`}>
                        {proj.profit.toLocaleString()}
                      </td>
                      <td className="px-3 py-1.5 text-right text-indigo-400 print:text-indigo-700">{proj.customers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 11. TECHNOLOGY STACK ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Cpu} number="11" title="Recommended Technology Stack" color="text-blue-400" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(techStack).map(([key, tech]) => {
              const t = tech as { name: string; category: string; reason: string; pros: string[] };
              return (
                <div key={key} className="p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-white print:text-black">{t.name}</p>
                    <span className="text-[9px] font-bold uppercase text-blue-400 print:text-blue-700 bg-blue-900/40 print:bg-blue-100 px-2 py-0.5 rounded-full">{key}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 print:text-gray-600">{t.reason}</p>
                  <div className="flex flex-wrap gap-1">
                    {t.pros.map((pro, j) => (
                      <span key={j} className="text-[9px] bg-slate-700 print:bg-gray-200 text-slate-300 print:text-gray-700 px-1.5 py-0.5 rounded">{pro}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 12. MVP ROADMAP ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Milestone} number="12" title="5-Phase MVP Execution Roadmap" color="text-pink-400" />
          <div className="space-y-4">
            {roadmap.map(phase => (
              <div key={phase.phaseNumber} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <p className="font-black text-white print:text-black">{phase.phaseTitle}</p>
                    <p className="text-[10px] text-slate-400 print:text-gray-500">{phase.duration}</p>
                  </div>
                </div>
                <div className="ml-10 space-y-1.5">
                  {phase.milestones.map(m => (
                    <div key={m.id} className="flex items-start gap-2 text-[10px]">
                      <span className={`shrink-0 px-1.5 py-0.5 rounded font-black ${
                        m.priority === 'HIGH' ? 'bg-rose-900/50 text-rose-300 print:bg-red-100 print:text-red-700' :
                        m.priority === 'MEDIUM' ? 'bg-amber-900/50 text-amber-300 print:bg-amber-100 print:text-amber-700' :
                        'bg-slate-700 text-slate-300 print:bg-gray-200 print:text-gray-600'
                      }`}>{m.priority}</span>
                      <span className="text-slate-300 print:text-gray-800 flex-1">{m.task}</span>
                      <span className="text-slate-500 print:text-gray-500 shrink-0">{m.estimatedDuration}</span>
                      <span className={`shrink-0 font-bold ${
                        m.status === 'Completed' ? 'text-emerald-400 print:text-emerald-700' :
                        m.status === 'In Progress' ? 'text-indigo-400 print:text-indigo-700' :
                        'text-slate-500 print:text-gray-400'
                      }`}>{m.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 13. INVESTOR PANEL ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Award} number="13" title="Simulated Investor Panel" color="text-amber-400" />
          <div className="space-y-4">
            {investorReviews.map(inv => (
              <div key={inv.id} className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg font-black shrink-0">
                    {inv.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-white print:text-black">{inv.name}</p>
                    <p className="text-[10px] text-slate-400 print:text-gray-600">{inv.title} · {inv.firm}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${verdictStyle(inv.verdict)}`}>{inv.verdict}</p>
                    <p className="text-[10px] text-slate-500 print:text-gray-500">{inv.confidenceScore}/100 confidence</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div>
                    <p className="text-emerald-500 print:text-emerald-700 font-bold uppercase mb-1">Strengths Noted</p>
                    <ul className="space-y-0.5">
                      {inv.strengths.map((s, j) => <li key={j} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-emerald-400">•</span>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-rose-500 print:text-red-700 font-bold uppercase mb-1">Concerns</p>
                    <ul className="space-y-0.5">
                      {inv.concerns.map((c, j) => <li key={j} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-rose-400">•</span>{c}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-amber-500 print:text-amber-700 font-bold uppercase mb-1">Questions</p>
                    <ul className="space-y-0.5">
                      {inv.questions.map((q, j) => <li key={j} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-amber-400">?</span>{q}</li>)}
                    </ul>
                  </div>
                </div>
                <p className="text-[11px] text-indigo-300 print:text-indigo-700 border-l-2 border-indigo-500 pl-3 font-semibold italic">
                  "{inv.recommendation}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 14. INVESTOR READINESS REPORT ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={ShieldCheck} number="14" title="Investor Readiness Report" color="text-emerald-400" />
          <div className="grid grid-cols-2 gap-3 text-[11px] mb-2">
            <div className="p-3 rounded-xl bg-slate-800/60 print:bg-gray-50 border border-slate-700 print:border-gray-200 text-center">
              <p className="text-slate-500 print:text-gray-500 text-[10px] uppercase font-bold">Overall Readiness</p>
              <p className="text-3xl font-black text-emerald-400 print:text-emerald-700">{readiness.overallScore}<span className="text-sm text-slate-400">/100</span></p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 print:bg-gray-50 border border-slate-700 print:border-gray-200 text-center">
              <p className="text-slate-500 print:text-gray-500 text-[10px] uppercase font-bold">Founder Readiness</p>
              <p className="text-3xl font-black text-indigo-400 print:text-indigo-700">{readiness.founderReadiness.overallScore}<span className="text-sm text-slate-400">/100</span></p>
            </div>
          </div>
          {/* Categories */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">Category Scores</p>
            {readiness.categories.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-300 print:text-gray-700">{cat.name}</span>
                  <span className="text-slate-400 print:text-gray-500 text-[9px] italic mr-2">{cat.comment}</span>
                  <span className="font-black text-white print:text-black w-12 text-right">{cat.score}/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 print:bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${cat.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-[10px]">
            <div className="p-3 rounded-xl bg-emerald-950/20 print:bg-green-50 border border-emerald-500/20 print:border-green-200 space-y-1">
              <p className="font-black text-emerald-400 print:text-emerald-700 uppercase text-[9px]">Top Reasons to Invest</p>
              {readiness.topReasonsToInvest.map((r, i) => (
                <p key={i} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-emerald-400 shrink-0">✓</span>{r}</p>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-rose-950/20 print:bg-red-50 border border-rose-500/20 print:border-red-200 space-y-1">
              <p className="font-black text-rose-400 print:text-red-700 uppercase text-[9px]">Top Reasons to Reject</p>
              {readiness.topReasonsToReject.map((r, i) => (
                <p key={i} className="text-slate-300 print:text-gray-800 flex gap-1"><span className="text-rose-400 shrink-0">✗</span>{r}</p>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-1 text-[10px]">
            <p className="font-black text-white print:text-black uppercase text-[9px]">Improvement Roadmap</p>
            {readiness.improvementRoadmap.map((r, i) => (
              <p key={i} className="text-slate-300 print:text-gray-800 flex gap-2"><span className="font-black text-indigo-400 print:text-indigo-700 shrink-0">{i + 1}.</span>{r}</p>
            ))}
          </div>
          {/* Founder readiness scores */}
          <div className="space-y-2">
            <p className="text-[11px] font-black text-slate-400 print:text-gray-500 uppercase">Founder Skill Assessment</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                ['Technical Skills', readiness.founderReadiness.technicalSkills],
                ['Business Knowledge', readiness.founderReadiness.businessKnowledge],
                ['Marketing Acumen', readiness.founderReadiness.marketingAcumen],
                ['Financial Prep', readiness.founderReadiness.financialPreparation],
                ['Team Strength', readiness.founderReadiness.teamStrength],
                ['Leadership', readiness.founderReadiness.leadership],
                ['Execution', readiness.founderReadiness.executionCapability],
              ].map(([label, val]) => (
                <div key={label as string} className="p-2 rounded-lg bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-1">
                  <p className="text-[9px] text-slate-500 print:text-gray-500 uppercase font-bold">{label}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-slate-700 print:bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${val}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-white print:text-black">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 15. PIVOT OPTIONS ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={Zap} number="15" title="Strategic Pivot Options" color="text-yellow-400" />
          <div className="space-y-4">
            {pivots.map((piv, i) => (
              <div key={piv.id} className="p-4 rounded-xl bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-200 space-y-2">
                <div className="flex items-start justify-between">
                  <p className="font-black text-white print:text-black">{piv.title}</p>
                  <div className="flex gap-2 shrink-0">
                    <Pill text={`Market: ${piv.marketPotential}`} color="bg-indigo-900/50 text-indigo-300 print:bg-indigo-100 print:text-indigo-700" />
                    <Pill text={`Risk: ${piv.risk}`} color={
                      piv.risk === 'Low' ? 'bg-emerald-900/50 text-emerald-300 print:bg-emerald-100 print:text-emerald-700' :
                      piv.risk === 'Medium' ? 'bg-amber-900/50 text-amber-300 print:bg-amber-100 print:text-amber-700' :
                      'bg-rose-900/50 text-rose-300 print:bg-red-100 print:text-red-700'
                    } />
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 print:text-gray-800">{piv.description}</p>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div><span className="text-slate-500 print:text-gray-500">Investment: </span><span className="font-bold text-white print:text-black">{piv.investment}</span></div>
                  <div><span className="text-slate-500 print:text-gray-500">Revenue: </span><span className="font-bold text-emerald-400 print:text-emerald-700">{piv.revenuePotential}</span></div>
                  <div><span className="text-slate-500 print:text-gray-500">Difficulty: </span><span className="font-bold text-white print:text-black">{piv.difficulty}</span></div>
                </div>
                <p className="text-[10px] italic text-indigo-300 print:text-indigo-700 border-l-2 border-indigo-500 pl-2">{piv.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 16. VERSION TIMELINE ── */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 print:bg-white print:border-gray-300 print:rounded-none space-y-4">
          <SectionHeader icon={History} number="16" title="Startup Version & Evolution Timeline" color="text-slate-400" />
          <div className="relative pl-6 border-l border-slate-700 print:border-gray-300 space-y-5">
            {versions.map((ver, idx) => (
              <div key={ver.id} className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 print:bg-white border-2 border-indigo-500 flex items-center justify-center" />
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-black text-white print:text-black">Version {ver.versionNumber}</span>
                  <span className="text-[10px] text-slate-400 print:text-gray-500">{ver.date}</span>
                  <span className="ml-auto text-xs font-black text-indigo-400 print:text-indigo-700">{ver.score}/100</span>
                </div>
                <p className="text-[11px] text-slate-300 print:text-gray-800 font-medium">{ver.changes}</p>
                <p className="text-[10px] text-slate-500 print:text-gray-500 mt-0.5 italic">{ver.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-purple-950/20 border border-indigo-500/20 print:bg-white print:border-gray-300 print:rounded-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-white print:text-black">StartupIQ — AI Co-Founder Platform</p>
              <p className="text-[10px] text-slate-500 print:text-gray-500">Complete Intelligence Dossier · Report ID: {startup.id}</p>
              <p className="text-[10px] text-slate-500 print:text-gray-500">Generated: {new Date().toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 print:text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
              <div>
                <p className="text-xs font-black">Verified AI Co-Founder Seal</p>
                <p className="text-[10px] text-slate-400 print:text-gray-500">16 modules · {
                  analysis.risks.length + personas.length + investorReviews.length + competitors.length + roadmap.reduce((a, p) => a + p.milestones.length, 0)
                }+ data points analyzed</p>
              </div>
            </div>
          </div>
        </div>

      </div>{/* end printable body */}
    </div>
  );
}

/* ─────────────────────────── page export ─────────────────────── */
export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading Full Report...</p>
        </div>
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
}
