'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData, InterviewMessage, CustomerInterviewEvaluation } from '@/types/startup';
import { predefinedPersonas } from '@/lib/ai/customerSimulator';
import {
  MessageSquare,
  Users,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerSimulatorPage() {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  const [selectedPersonaKey, setSelectedPersonaKey] = useState<string>('college-student');
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<CustomerInterviewEvaluation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai'];
    setData(item);

    // Load initial interview messages for the startup
    if (item.interviews && item.interviews['persona-1']) {
      setMessages(item.interviews['persona-1'].messages);
      setEvaluation(item.interviews['persona-1'].evaluation);
    } else {
      setMessages([
        {
          id: 'init-1',
          sender: 'customer',
          text: `Hey, I hear you're building ${item.startup.name}. What is this actually going to do for me, and why should I stop using my current routine?`,
          timestamp: 'Just now',
        },
      ]);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!data) return null;
  const { startup } = data;
  const currentPersona = predefinedPersonas[selectedPersonaKey] || predefinedPersonas['college-student'];

  const handlePersonaChange = (key: string) => {
    setSelectedPersonaKey(key);
    const persona = predefinedPersonas[key];
    setMessages([
      {
        id: `init-${key}-${Date.now()}`,
        sender: 'customer',
        text: `Hello. I am ${persona.name}. You mentioned ${startup.name} is supposed to solve our issues with ${startup.problem.slice(0, 70)}... What exactly are you offering me, and how much will it cost?`,
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: InterviewMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: nowStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/customer-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaKey: selectedPersonaKey,
          userMessage: userText,
          startupContext: {
            name: startup.name,
            problem: startup.problem,
            solution: startup.solution,
          },
        }),
      });
      const result = await res.json();
      const replyText = result?.data?.reply || `That sounds interesting, but will it be reliable during peak rush?`;

      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'customer',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'customer',
          text: `I'm skeptical about hidden charges. If you deliver as promised and let me try it first, I might consider it.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
          Module 05 • Roleplay Simulation
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Talk to Your Customers Before Building
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          The AI strictly roleplays as your target customer — pushing back on pricing, questioning value, and highlighting switching costs.
        </p>
      </div>

      {/* Persona Selection Carousel */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          Select Target Customer Persona to Interview:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(predefinedPersonas).map(([key, p]) => {
            const isSelected = selectedPersonaKey === key;
            return (
              <button
                key={key}
                onClick={() => handlePersonaChange(key)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-slate-700 shrink-0">
                  <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-white line-clamp-1">{p.role}</span>
                <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Simulation Window */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-500/40">
              <img src={currentPersona.avatar} alt={currentPersona.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{currentPersona.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Simulated Customer
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{currentPersona.context}</p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 hidden sm:block">
            Targeting: <span className="text-indigo-400 font-semibold">{startup.name}</span>
          </div>
        </div>

        {/* Message Log */}
        <div className="p-5 h-80 overflow-y-auto space-y-4 bg-slate-950/70">
          {messages.map((m) => {
            const isCustomer = m.sender === 'customer';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isCustomer ? 'justify-start' : 'justify-end'}`}
              >
                {isCustomer && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shrink-0 mt-0.5">
                    <img src={currentPersona.avatar} alt={currentPersona.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isCustomer
                      ? 'bg-slate-900 border border-slate-800 text-slate-200'
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      isCustomer ? 'text-slate-500' : 'text-indigo-200 text-right'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {!isCustomer && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 text-white text-xs font-bold mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>{currentPersona.name} is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${currentPersona.name} (e.g. "Would you pay ₹2,499/mo for this?")...`}
              className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Post-Interview Evaluation Dossier */}
      {evaluation && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Customer Interview Synthesis & Willingness to Pay</span>
            </h3>
            <span className="text-[10px] text-slate-400">Post-Roleplay Evaluation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Customer Interest Score</span>
              <span className="text-3xl font-extrabold text-emerald-400">
                {evaluation.interestScore}/100
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Pain Point Severity</span>
              <span className="text-3xl font-extrabold text-indigo-400">
                {evaluation.painPointScore}/100
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-1">Willingness to Pay</span>
              <span className="text-lg font-bold text-cyan-300">
                {evaluation.willingnessToPay}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/40 border border-rose-500/20 space-y-2">
              <span className="font-bold text-rose-400 block">Reported Objections</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {evaluation.objections.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-indigo-500/20 space-y-2">
              <span className="font-bold text-indigo-400 block">Key Behavioral Insights</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {evaluation.keyInsights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-emerald-500/20 space-y-2">
              <span className="font-bold text-emerald-400 block">Recommended Changes</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {evaluation.recommendedChanges.map((chg, i) => (
                  <li key={i}>{chg}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-xs">
        <Link href={`/analysis/${startup.id}/devils-advocate`} className="text-slate-400 hover:text-white">
          ← Previous: AI Devil&apos;s Advocate
        </Link>
        <Link
          href={`/analysis/${startup.id}/investor-panel`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <span>Next: Simulated Investor Panel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
