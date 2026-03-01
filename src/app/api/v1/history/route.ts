import { getAllHistory, getHistoryById } from '@/services/history.service';
import { NextResponse } from 'next/server';

export async function GET() {
  const docs = await getAllHistory();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const { id } = await req.json();
  const doc = await getHistoryById(id);
  return NextResponse.json({
    report: doc?.report,
    productDocument: doc?.productDocument,
  });
}
