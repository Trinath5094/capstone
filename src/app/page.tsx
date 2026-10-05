'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  Users,
  Award,
  LineChart,
  Grid2X2,
  Milestone,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { campusBiteData, allStartupsList } from '@/lib/mockData';
import { getScoreColor } from '@/lib/utils';

export default function LandingPage() {
  const previewScore = 78;
  const colors = getScoreColor(previewScore);

  const features = [
    {
      title: 'AI Idea Validation',
      description: 'End-to-end evaluation of problem clarity, solution feasibility, and scalability with an objective 0–100 score.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'AI Devil’s Advocate',
      description: 'We don’t just praise your idea. We identify hidden assumptions, operational blindspots, and failure modes.',
      icon: Flame,
      color: 'from-rose-500 to-amber-500',
      highlight: 'Key Differentiator',
    },
    {
      title: 'Customer Simulator',
      description: 'Roleplay with simulated AI personas (students, doctors, SMBs) before writing a single line of code.',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Investor Panel',
      description: 'Get simulated critical feedback from Angel, VC, Bank Officer, and Shark Tank judges.',
      icon: Award,
      color: 'from-amber-500 to-yellow-500',
    },
    {
      title: 'Market Intelligence',
      description: 'Automated TAM, SAM, SOM calculations, growth projections, and post-mortems of failed predecessor startups.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Business Model Canvas',
      description: 'Interactive 9-box canvas with AI generation and recommended revenue model monetization analysis.',
      icon: Grid2X2,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Financial Planning',
      description: 'Dynamic burn rate, break-even customer threshold, runway calculator, and 12-month projections.',
      icon: LineChart,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'MVP Roadmap',
      description: 'Actionable 5-phase execution plan from customer discovery to commercial seed fundraising.',
      icon: Milestone,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const steps = [
    { step: '01', title: 'Idea', desc: 'Input your raw startup hypothesis, target audience, and initial budget.' },
    { step: '02', title: 'Validate', desc: 'AI scores problem severity, solution viability, and initial defensibility.' },
    { step: '03', title: 'Challenge', desc: 'Devil’s advocate reveals blindspots and ruthless failure risks.' },
    { step: '04', title: 'Research', desc: 'TAM/SAM/SOM sizing and competitor differentiation matrix.' },
    { step: '05', title: 'Improve', desc: 'Simulate customer interviews and stress-test unit economics.' },
    { step: '06', title: 'Launch', desc: 'Export an institutional-ready pitch dossier and 5-phase MVP roadmap.' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The AI Co-Founder for Startup Validation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Validate your startup <br />
            <span className="gradient-text">before the market does.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            An AI-powered startup co-founder that challenges your assumptions, analyzes your market, simulates customers and investors, and helps you turn ideas into launch-ready businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/new-analysis"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Validate My Idea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/analysis/campusbite-ai"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-white font-bold text-sm backdrop-blur-md transition-all duration-200"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Explore Demo (CampusBite AI)</span>
            </Link>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            Zero setup required • Includes preloaded validation models for CampusBite AI, GreenCart & SkillBridge
          </p>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800/40 to-slate-950 shadow-2xl">
          <div className="rounded-[15px] bg-slate-950/90 p-6 sm:p-8 backdrop-blur-2xl border border-slate-800/80">
            {/* Top Bar of Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-lg">
                  CB
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">CampusBite AI</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Predictive Campus Food Marketplace & Smart Meal Subscriptions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/analysis/campusbite-ai"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  <span>Open Full Analysis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Grid of Preview Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Score Ring Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
                <ScoreRing score={previewScore} size={110} strokeWidth={8} label="Validation Score" sublabel="Top 15% of Ideas" />
              </div>

              {/* Market Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Market Opportunity</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">₹28,500 Cr</p>
                  <p className="text-[11px] text-slate-400 mt-1">Total Addressable Market (TAM)</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-medium flex items-center justify-between">
                  <span>CAGR 17.8%</span>
                  <span className="text-slate-400">SOM: ₹420 Cr</span>
                </div>
              </div>

              {/* Devil's Advocate Risk */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-rose-400 mb-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      AI Devil&apos;s Advocate
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      HIGH RISK
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 mt-2 line-clamp-2">
                    Customer acquisition cost spike beyond primary campus
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Expanding across non-metro universities requires distinct hyper-local playbooks.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-indigo-400 font-medium">
                  → Countermeasure: 50 pre-orders required
                </div>
              </div>

              {/* Investor Readiness */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Investor Readiness</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">74 / 100</p>
                  <p className="text-[11px] text-slate-400 mt-1">4 Investors Panel Verdict</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Angel: Interested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Everything You Need to Validate a Startup */}
      <section className="py-20 bg-slate-950/60 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Complete Intelligence Suite
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything you need to validate a startup
            </h3>
            <p className="text-sm text-slate-400">
              StartupIQ delivers full-spectrum business intelligence from unit economics to investor roleplay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 glass-card-hover group flex flex-col justify-between"
                >
                  {feat.highlight && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {feat.highlight}
                    </span>
                  )}
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-0.5 mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Why StartupIQ? */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The Fundamental Difference
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Traditional tools generate reports. <br />
              <span className="gradient-text">StartupIQ stress-tests reality.</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most AI tools act like polite yes-men that automatically applaud whatever startup idea you type into the prompt box. They never challenge your unit economics, never mention customer acquisition fatigue, and never simulate critical investor pushback.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Ruthless Failure Detection</h5>
                  <p className="text-xs text-slate-400">Our AI Devil&apos;s Advocate actively tries to break your business model before you spend savings on engineers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Interactive Customer Simulation</h5>
                  <p className="text-xs text-slate-400">Interview student, doctor, or merchant personas who push back on price, usability, and switching costs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <LineChart className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Defensible Financial Mechanics</h5>
                  <p className="text-xs text-slate-400">Calculates exact break-even customer numbers and runway months based on your initial capital.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
              <span>Generic AI Chatbot vs. StartupIQ</span>
              <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">Head-to-head</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1">Generic AI Generator:</span>
                <p className="text-slate-400">&quot;Great idea! Campus food delivery is a massive multi-billion dollar market. Here is a generic 5-paragraph marketing plan.&quot;</p>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                <span className="font-bold text-indigo-300 block mb-1">StartupIQ AI Co-Founder:</span>
                <p className="text-slate-200">&quot;Your unit economics will fail on individual on-demand deliveries. Traditional couriers cost ₹45 on a ₹90 order. You must switch to batch deliveries at hostel pickup hubs or student CAC will destroy your runway in 3 months.&quot;</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ready to test your concept?</span>
              <Link href="/new-analysis" className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                Start Analysis <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: From Idea → Launch Timeline */}
      <section className="py-20 bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h3 className="text-3xl font-extrabold text-white">
              From Idea → Launch
            </h3>
            <p className="text-sm text-slate-400">
              The continuous validation methodology used by top startup accelerators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400">{st.step}</span>
                  <h4 className="text-base font-bold text-white mt-1 mb-2">{st.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800/60 text-indigo-400 text-xs flex items-center justify-end">
                  {i < steps.length - 1 ? <ArrowRight className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preloaded Demo Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Preloaded Demo Showcase</h3>
            <p className="text-xs text-slate-400 mt-1">Explore real validation datasets ready for classroom, investor, or jury demonstration.</p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
          >
            <span>View All Startups in Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allStartupsList.map((startup) => {
            const score = startup.id === 'campusbite-ai' ? 78 : startup.id === 'greencart' ? 84 : 72;
            const sc = getScoreColor(score);
            return (
              <Link
                key={startup.id}
                href={`/analysis/${startup.id}`}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 glass-card-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-400">{startup.location}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                      Score: {score}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {startup.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {startup.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Budget: {startup.budget}</span>
                  <span className="font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Analysis <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
