import { analyzeProduct } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  const result = await analyzeProduct(text);
  return NextResponse.json(result);
}
