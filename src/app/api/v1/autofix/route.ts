import GPT_INSTANCE from '@/utils/document';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { productDocument, report } = await req.json();

    const modifiedDocument = await GPT_INSTANCE.getAutoFixResponse(productDocument, report);

    return NextResponse.json({
        modifiedDocument: modifiedDocument,
    });
}
