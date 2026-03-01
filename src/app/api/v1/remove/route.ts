import { identifyConflicts } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, tbtDocs } = await req.json();
    const message = await identifyConflicts(text, tbtDocs);
    return NextResponse.json({ message });
  } catch (error) {
    console.error('[API /remove]', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
