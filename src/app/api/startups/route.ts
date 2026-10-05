import { NextResponse } from 'next/server';
import { allStartupsList, demoDatabase } from '@/lib/mockData';
import { generateStartupAnalysis } from '@/lib/ai/generator';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: allStartupsList,
    demoMode: true,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.problem || !body.solution || !body.targetCustomer) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory startup fields' },
        { status: 400 }
      );
    }

    const fullAnalysis = generateStartupAnalysis({
      name: body.name,
      problem: body.problem,
      solution: body.solution,
      targetCustomer: body.targetCustomer,
      businessModel: body.businessModel || 'Subscription',
      location: body.location || 'India',
      budget: body.budget || '₹5,00,000',
      founderSkills: body.founderSkills || 'Full-Stack Developer',
    });

    return NextResponse.json({
      success: true,
      data: fullAnalysis,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
