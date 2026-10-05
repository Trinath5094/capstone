'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Key, Database, RefreshCw, CheckCircle2, Bot } from 'lucide-react';
import { resetToDemoData } from '@/lib/storage';

export default function SettingsPage() {
  const [demoMode, setDemoMode] = useState(true);
  const [openAiKey, setOpenAiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [tavilyKey, setTavilyKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    resetToDemoData();
    alert('Local demo database restored to default seed state!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
          System Configuration
        </span>
        <h1 className="text-3xl font-extrabold text-white">Platform Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure API credentials, toggle demo mode, or reset seed data.
        </p>
      </div>

      {/* Demo Mode Toggle Banner */}
      <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white">Demo Mode (Offline Fallback)</h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-lg">
              When active, StartupIQ uses deterministic seed datasets for validation, market research, and customer simulations without needing external paid API keys.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDemoMode(!demoMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            demoMode
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {demoMode ? '✓ Demo Mode Active' : 'Live API Mode'}
        </button>
      </div>

      {/* API Keys Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-indigo-400" />
          <span>API Key Configuration</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">OpenAI API Key (Optional)</label>
            <input
              type="password"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder="sk-proj-••••••••••••••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Google Gemini API Key (Optional)</label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy••••••••••••••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tavily Web Research Key (Optional)</label>
            <input
              type="password"
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              placeholder="tvly-••••••••••••••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
          >
            {saved ? '✓ Settings Saved!' : 'Save Settings'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold hover:bg-rose-500/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Storage</span>
          </button>
        </div>
      </form>
    </div>
  );
}
