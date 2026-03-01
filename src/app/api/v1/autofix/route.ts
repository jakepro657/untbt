import { autoFixDocument } from '@/services/autofix.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { productDocument, report } = await req.json();
    const modifiedDocument = await autoFixDocument(productDocument, report);
    return NextResponse.json({ modifiedDocument });
  } catch (error) {
    console.error('[API /autofix]', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
