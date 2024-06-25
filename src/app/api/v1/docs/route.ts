import GPT_INSTANCE from "@/utils/document";
import { NextResponse } from "next/server";


// DB 문서 불러오는 쿼리 API
export async function POST(req: Request) {

    const { text } = await req.json();

    const response = text;

    return NextResponse.json({
        message: response
    })

}