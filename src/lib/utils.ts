import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = '₹'): string {
  if (currency === '₹') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  ring: string;
} {
  if (score >= 80) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      ring: 'stroke-emerald-400',
    };
  }
  if (score >= 65) {
    return {
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      ring: 'stroke-indigo-400',
    };
  }
  if (score >= 50) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      ring: 'stroke-amber-400',
    };
  }
  return {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    ring: 'stroke-rose-400',
  };
}

export function getSeverityBadge(severity: 'HIGH' | 'MEDIUM' | 'LOW'): {
  label: string;
  className: string;
} {
  switch (severity) {
    case 'HIGH':
      return {
        label: 'High Risk',
        className: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      };
    case 'MEDIUM':
      return {
        label: 'Medium Risk',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    case 'LOW':
      return {
        label: 'Low Risk',
        className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
  }
}
