import GPT_INSTANCE from "@/utils/document";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { text } = await req.json();

    const response = await GPT_INSTANCE.getKeywordResponse(text);

    return NextResponse.json({
        message: response
    })

}