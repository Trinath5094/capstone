import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">
                Startup<span className="text-indigo-400">IQ</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              StartupIQ is an AI-powered startup validation and business intelligence platform.
              We don&apos;t just praise your idea — we challenge your assumptions, simulate customers and investors, and engineer launch-ready businesses.
            </p>
            <p className="text-xs text-indigo-400 font-medium">
              &quot;Validate. Challenge. Improve. Launch.&quot;
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Intelligence Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">AI Idea Validation</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">AI Devil&apos;s Advocate</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Customer Simulator</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Investor Panel</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Business Model Canvas</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/new-analysis" className="hover:text-white transition-colors">New Analysis Wizard</Link></li>
              <li><Link href="/reports" className="hover:text-white transition-colors">Executive Reports</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Settings & API Keys</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Demo Credentials</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StartupIQ. Built for ambitious founders and investors.</p>
          <div className="flex items-center gap-1">
            <span>Powered by Next.js, Supabase, OpenAI, and FastAPI.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
