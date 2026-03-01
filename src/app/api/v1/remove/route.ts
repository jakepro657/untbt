import { identifyConflicts } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, tbtDocs } = await req.json();
  const message = await identifyConflicts(text, tbtDocs);
  return NextResponse.json({ message });
}
