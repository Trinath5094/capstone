import { NextResponse } from 'next/server';
import { getCoFounderResponse } from '@/lib/ai/cofounder';
import { demoDatabase } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    const { startupId, userMessage } = await req.json();
    const data = demoDatabase[startupId] || demoDatabase['campusbite-ai'];
    const reply = getCoFounderResponse(data, userMessage || 'What should I do?');

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Co-Founder query failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
