import { fetchTbtInfo } from '@/lib/external/knowtbt';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchTbtInfo();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
