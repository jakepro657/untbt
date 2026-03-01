import { autoFixDocument } from '@/services/autofix.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { productDocument, report } = await req.json();
  const modifiedDocument = await autoFixDocument(productDocument, report);
  return NextResponse.json({ modifiedDocument });
}
