import GPT_INSTANCE from "@/utils/document";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { text } = await req.json();

    const keywords = await GPT_INSTANCE.getKeywordResponse(text);

    if (!keywords) return NextResponse.json({
        message: 'No keywords found',
        error: true
    })

    const response = await GPT_INSTANCE.getSearchResponse(keywords);

    return NextResponse.json({
        message: response
    })

}