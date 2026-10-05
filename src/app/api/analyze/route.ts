import { NextResponse } from 'next/server';
import { generateStartupAnalysis } from '@/lib/ai/generator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = generateStartupAnalysis({
      name: body.name || 'Untitled Startup',
      problem: body.problem || 'Market inefficiency',
      solution: body.solution || 'Digital solution',
      targetCustomer: body.targetCustomer || 'General Consumers',
      businessModel: body.businessModel || 'Subscription',
      location: body.location || 'India',
      budget: body.budget || '₹5,00,000',
      founderSkills: body.founderSkills || 'Software & Operations',
    });

    return NextResponse.json({
      success: true,
      analysis: result.analysis,
      market: result.market,
      readiness: result.readiness,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
