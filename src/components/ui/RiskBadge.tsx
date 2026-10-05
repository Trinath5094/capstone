import React from 'react';
import { RiskSeverity } from '@/types/startup';
import { getSeverityBadge } from '@/lib/utils';

interface RiskBadgeProps {
  severity: RiskSeverity;
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ severity, size = 'md' }) => {
  const badge = getSeverityBadge(severity);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${badge.className} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          severity === 'HIGH'
            ? 'bg-rose-400 animate-pulse'
            : severity === 'MEDIUM'
            ? 'bg-amber-400'
            : 'bg-emerald-400'
        }`}
      />
      {badge.label}
    </span>
  );
};
