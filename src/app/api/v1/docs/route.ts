import { analyzeProduct } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const result = await analyzeProduct(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API /docs]', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
