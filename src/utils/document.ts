import { GPT_REPORT_PROMPT, GPT_SEMANTIC_SEARCH_PROMPT, GPT_REMOVED_REPORT_PROMPT, GPT_MODIFICATION_PROMPT } from '@/constant/prompt';
import OpenAI from 'openai';

class GPT {
    private apiKey: string | undefined;
    private openai: OpenAI;

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async getCodeResponse(text: string): Promise<string | null> {
        const GPTResponse = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: GPT_SEMANTIC_SEARCH_PROMPT,
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
        });

        return GPTResponse.choices[0].message.content;
    }

    // public async getKeywordResponse(text: string): Promise<string | null> {
    //     const GPTResponse = await this.openai.chat.completions.create({
    //         model: 'gpt-4o',
    //         messages: [
    //             {
    //                 role: 'system',
    //                 content: GPT_SEMANTIC_FILTER_PROMPT,
    //             },
    //             {
    //                 role: 'user',
    //                 content: text,
    //             },
    //         ],
    //     });

    //     return GPTResponse.choices[0].message.content;
    // }

    public async getReportResponse(textForUserDoc: string, textForTBT: string): Promise<string | null> {
        const GPTResponse = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: GPT_REPORT_PROMPT,
                },
                {
                    role: 'user',
                    content: `(PRODUCT DOCUMENT: ${textForUserDoc})`,
                },
                {
                    role: 'user',
                    content: `(TBT DOCUMENT: ${textForTBT})`,
                },
            ],
        });

        return GPTResponse.choices[0].message.content;
    }

    public async getRemovedProblemResponse(textForUserDoc: string, textForTBT: string): Promise<string | null> {
        const GPTResponse = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: GPT_REMOVED_REPORT_PROMPT,
                },
                {
                    role: 'user',
                    content: `FIRST DOCUMENT: ${textForUserDoc} / SECOND DOCUMENT: ${textForTBT}`,
                },
            ],
        });

        return GPTResponse.choices[0].message.content;
    }

    public async getAutoFixResponse(productDocument: string, report: string): Promise<string | null> {
        const GPTResponse = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: GPT_MODIFICATION_PROMPT,
                },
                {
                    role: 'user',
                    content: `PRODUCT_DOCUMENT: ${productDocument}`,
                },
                {
                    role: 'user',
                    content: `REPORT: ${report}`,
                },
            ],
        });

        return GPTResponse.choices[0].message.content;
    }
}

const GPT_INSTANCE = new GPT();

export default GPT_INSTANCE;
