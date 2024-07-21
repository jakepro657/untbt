import GPT_INSTANCE from '@/utils/document';
import QUERY_INSTANCE from '@/utils/query';
import { NextResponse } from 'next/server';

// DB 문서 불러오는 쿼리 API
export async function POST(req: Request) {
    const { text, tbtDocs } = await req.json();
    // const tbtDocs = await QUERY_INSTANCE.operate({});

    // console.log(tbtDocs)

    //const response = await GPT_INSTANCE.getRemovedProblemResponse(text, tbtDocs);
    const response = await GPT_INSTANCE.getRemovedProblemResponse(text, tbtDocs);

    return NextResponse.json({
        message: response,
    });
}
