import GPT_INSTANCE from '@/utils/document';
import prisma from '@/utils/prisma';
import QUERY_INSTANCE from '@/utils/query';
import { NextResponse } from 'next/server';

// DB 문서 불러오는 쿼리 API
export async function POST(req: Request) {
    const { text } = await req.json();

    const codes: any = await GPT_INSTANCE.getCodeResponse(text);

    console.log(codes);

    const [c1, c2] = codes.split('.');

    const tbtDocs = await QUERY_INSTANCE.operate({
        itemCategoryCode: c1,
        middleCategoryCode: c2,
    });

    // console.log(tbtDocs);

    //const response = await GPT_INSTANCE.getRemovedProblemResponse(text, tbtDocs);
    const response = await GPT_INSTANCE.getReportResponse(text, tbtDocs?.join('\n-------------------------------\n') || '');

    await prisma.history.create({
        data: {
            productDocument: text,
            report: response,
        },
    });

    const isTradable = response?.includes('YES');

    return NextResponse.json({
        message: response,
        isTradable: isTradable,
    });
}
