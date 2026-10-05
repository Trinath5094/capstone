'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getStartupById } from '@/lib/storage';
import { demoDatabase } from '@/lib/mockData';
import { CompleteStartupData } from '@/types/startup';
import { AnalysisSidebar } from '@/components/analysis/AnalysisSidebar';
import { CoFounderDrawer } from '@/components/ai/CoFounderDrawer';
import { Loader2 } from 'lucide-react';

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = (params?.id as string) || 'campusbite-ai';
  const [data, setData] = useState<CompleteStartupData | null>(null);

  useEffect(() => {
    const item = getStartupById(id) || demoDatabase[id] || demoDatabase['campusbite-ai'];
    setData(item);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-[#090d16]">
      {/* 13-Module Navigation Sidebar */}
      <AnalysisSidebar
        startupId={data.startup.id}
        startupName={data.startup.name}
        score={data.analysis.validationScore}
      />

      {/* Main Analysis Module Content */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </div>

      {/* Floating AI Co-Founder Drawer */}
      <CoFounderDrawer data={data} />
    </div>
  );
}
