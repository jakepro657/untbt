import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const docs = await prisma.history.findMany();

    return NextResponse.json(docs);
}

export async function POST(req: Request) {
    const { id } = await req.json();

    const doc = await prisma.history.findFirst({
        where: {
            id: id,
        },
    });

    return NextResponse.json({
        report: doc?.report,
        productDocument: doc?.productDocument,
    });
}
