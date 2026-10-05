import { NextResponse } from 'next/server';
import { demoDatabase } from '@/lib/mockData';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startup = demoDatabase[id];

  if (!startup) {
    return NextResponse.json(
      { success: false, error: 'Startup not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: startup,
  });
}
