import { NextResponse } from 'next/server';
import { simulateCustomerResponse } from '@/lib/ai/customerSimulator';

export async function POST(req: Request) {
  try {
    const { personaKey, userMessage, startupContext } = await req.json();
    const result = simulateCustomerResponse(
      personaKey || 'college-student',
      userMessage || 'Hello',
      startupContext || { name: 'Startup', problem: '', solution: '' }
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Simulation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
