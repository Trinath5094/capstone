'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BrainCircuit,
  Bot,
  Loader2,
  DollarSign,
  MapPin,
  Users,
  Target,
  Wand2
} from 'lucide-react';
import { generateStartupAnalysis } from '@/lib/ai/generator';
import { saveStartupData } from '@/lib/storage';

export default function NewAnalysisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    solution: '',
    targetCustomer: '',
    businessModel: 'Subscription',
    location: 'India',
    budget: '₹5,00,000',
    founderSkills: 'Full-stack engineering & product design',
  });

  const phases = [
    'Understanding your idea & core value hypothesis...',
    'Analyzing market dynamics, CAGR, and TAM/SAM/SOM...',
    'Identifying direct, indirect & substitute competitors...',
    'Challenging assumptions with AI Devil’s Advocate...',
    'Simulating customer personas and investor review panels...',
    'Generating 5-phase MVP roadmap and financial ledger...',
  ];

  const handleQuickFill = (sampleType: 'food' | 'health' | 'edtech') => {
    if (sampleType === 'food') {
      setFormData({
        name: 'CampusBite AI',
        problem: 'College students struggle to find affordable, healthy and convenient meals near campus. Food delivery fees often exceed 50% of meal cost.',
        solution: 'An AI-powered campus food marketplace connecting students with verified local home kitchens via scheduled batch drops at hostel gates.',
        targetCustomer: 'College and university students aged 18–25 living in dorms and hostels.',
        businessModel: 'Monthly meal passes (₹2,499/mo) + 12% vendor commission.',
        location: 'Bengaluru, Pune, Kota (Tier-1 & 2 campus hubs)',
        budget: '₹5,00,000',
        founderSkills: 'Full-stack engineering and campus ambassador operations.',
      });
    } else if (sampleType === 'health') {
      setFormData({
        name: 'MediSync AI',
        problem: 'Independent neighborhood clinics suffer from 35% patient no-shows and fragmented paper medical records.',
        solution: 'An intelligent WhatsApp-native appointment scheduling and patient follow-up copilot that automates clinical summaries and medicine reminders.',
        targetCustomer: 'Solo practitioners and small private clinics with 1–3 doctors.',
        businessModel: 'B2B SaaS subscription (₹1,999/month per clinic).',
        location: 'Tier-1 & Tier-2 Indian Cities',
        budget: '₹8,00,000',
        founderSkills: 'HealthTech backend engineer and medical sales advisor.',
      });
    } else {
      setFormData({
        name: 'SkillBridge AI',
        problem: 'Tier-2 college graduates lack practical job-ready skills with less than 8% verified job placement.',
        solution: 'An AI-guided micro-apprenticeship platform where students solve corporate code bounties and match with startups.',
        targetCustomer: 'Engineering students from Tier-2/3 universities.',
        businessModel: '15% platform take-rate on freelance earnings + employer hiring fees.',
        location: 'Pan-India Remote',
        budget: '₹3,50,000',
        founderSkills: 'AI engineering and curriculum development.',
      });
    }
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);

    // Progress through animated AI phases
    for (let i = 0; i < phases.length; i++) {
      setAnalysisPhase(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // Generate comprehensive data
    const completeData = generateStartupAnalysis({
      name: formData.name || 'My New Startup',
      problem: formData.problem || 'Market inefficiency',
      solution: formData.solution || 'AI-driven solution',
      targetCustomer: formData.targetCustomer || 'Digital consumers',
      businessModel: formData.businessModel,
      location: formData.location,
      budget: formData.budget,
      founderSkills: formData.founderSkills,
    });

    // Save to storage
    saveStartupData(completeData);

    // Redirect to the newly generated analysis
    router.push(`/analysis/${completeData.startup.id}`);
  };

  const stepsList = [
    { num: 1, title: 'Startup Name' },
    { num: 2, title: 'Problem' },
    { num: 3, title: 'Solution' },
    { num: 4, title: 'Target Customer' },
    { num: 5, title: 'Business Model' },
    { num: 6, title: 'Location' },
    { num: 7, title: 'Initial Budget' },
    { num: 8, title: 'Founder Skills' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Wizard Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Startup Validation Wizard</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Validate Your Startup Idea</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Complete 8 quick parameters. Our AI Co-Founder will evaluate market viability, challenge assumptions, and assemble your financial model.
        </p>

        {/* Quick Fill presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <span className="text-xs text-slate-500">Quick Test Templates:</span>
          <button
            type="button"
            onClick={() => handleQuickFill('food')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] text-indigo-300 border border-indigo-500/30 transition-colors"
          >
            <Wand2 className="w-3 h-3 text-indigo-400" />
            CampusBite AI
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('health')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 border border-cyan-500/30 transition-colors"
          >
            <Wand2 className="w-3 h-3 text-cyan-400" />
            MediSync AI
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('edtech')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] text-purple-300 border border-purple-500/30 transition-colors"
          >
            <Wand2 className="w-3 h-3 text-purple-400" />
            SkillBridge AI
          </button>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300">
            Step {currentStep} of 8: {stepsList[currentStep - 1].title}
          </span>
          <span className="text-xs text-indigo-400 font-bold">
            {Math.round((currentStep / 8) * 100)}% Completed
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
        {!isAnalyzing ? (
          <div>
            {/* Step 1: Startup Name */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">What is your startup called?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose a working project title. You can always rename it later.
                  </p>
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. CampusBite AI, GreenCart, HealthPilot"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Problem */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">What specific problem are you solving?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Describe who experiences this frustration, how painful it is, and why existing alternatives fail.
                  </p>
                </div>
                <textarea
                  rows={4}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="e.g. College students struggle to find affordable, healthy meals near campus. Food aggregators charge 40% delivery fees and campus mess food is repetitive and unhygienic."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                  autoFocus
                />
              </div>
            )}

            {/* Step 3: Solution */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">What is your proposed solution?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    How does your product solve the problem 10x better, faster, or cheaper than current methods?
                  </p>
                </div>
                <textarea
                  rows={4}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="e.g. An AI-powered campus food marketplace connecting students with verified local cooks and cloud kitchens using scheduled batch delivery drops to campus pickup hubs for zero delivery fee."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                  autoFocus
                />
              </div>
            )}

            {/* Step 4: Target Customer */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Who is your primary target customer?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Be as specific as possible (age, occupation, location, income). Avoid &quot;everyone&quot;.
                  </p>
                </div>
                <input
                  type="text"
                  value={formData.targetCustomer}
                  onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                  placeholder="e.g. College students aged 18–25 living in university dorms and off-campus hostels."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
            )}

            {/* Step 5: Business Model */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">How will you generate revenue?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your primary monetization strategy.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Subscription', label: 'Subscription / Recurring Passes', desc: 'Predictable monthly or weekly recurring charge' },
                    { id: 'Commission', label: 'Marketplace Commission (Take Rate)', desc: '10–25% cut per completed transaction' },
                    { id: 'Freemium SaaS', label: 'Freemium / Tiered SaaS', desc: 'Free tier with premium power features' },
                    { id: 'Usage-based', label: 'Usage-based / Pay-as-you-go', desc: 'Pay strictly for compute, volume, or credits' },
                  ].map((model) => (
                    <div
                      key={model.id}
                      onClick={() => setFormData({ ...formData, businessModel: model.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.businessModel === model.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{model.label}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{model.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Location */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Where is your initial target market?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Which city, region, or campus cluster will you dominate first?
                  </p>
                </div>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru, Pune, Delhi NCR, or Remote Pan-India"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
            )}

            {/* Step 7: Initial Budget */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">What is your initial budget / capital?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Helps the AI estimate your financial runway and break-even customer threshold.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['₹2,00,000', '₹5,00,000', '₹15,00,000', '₹50,00,000+'].map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: bg })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.budget === bg
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Custom amount (e.g. ₹5,00,000)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            )}

            {/* Step 8: Founder Skills */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">What are your team&apos;s core skills?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Used to evaluate founder readiness and technical execution capability.
                  </p>
                </div>
                <input
                  type="text"
                  value={formData.founderSkills}
                  onChange={(e) => setFormData({ ...formData, founderSkills: e.target.value })}
                  placeholder="e.g. Full-stack software engineering, digital marketing, operations"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>
            )}

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>

              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(8, prev + 1))}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold shadow-xl shadow-indigo-600/40 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Analyze My Startup</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Animated AI Processing Screen */
          <div className="py-12 px-4 text-center space-y-8">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 animate-pulse">
                <BrainCircuit className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="absolute -inset-3 rounded-3xl bg-indigo-500/10 blur-xl animate-ping" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">
                StartupIQ is analyzing {formData.name || 'your startup'}...
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Running synthesis across market heuristics, risk telemetry, competitor positioning, and customer roleplay engines.
              </p>
            </div>

            {/* Checklist of phases */}
            <div className="max-w-md mx-auto space-y-3 text-left bg-slate-950 p-5 rounded-2xl border border-slate-800">
              {phases.map((text, idx) => {
                const isPassed = idx < analysisPhase;
                const isCurrent = idx === analysisPhase;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                      isPassed
                        ? 'text-emerald-400 font-medium'
                        : isCurrent
                        ? 'text-indigo-300 font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0 inline-block" />
                    )}
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
