import { GoogleGenAI } from '@google/genai';
import type { AIService } from './types';
import {
  SEMANTIC_SEARCH_PROMPT,
  REPORT_PROMPT,
  REMOVED_REPORT_PROMPT,
  MODIFICATION_PROMPT,
} from './prompts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-2.5-flash-preview-05-20';

class GeminiService implements AIService {
  async classifyProduct(text: string): Promise<string | null> {
    const response = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: SEMANTIC_SEARCH_PROMPT },
      contents: text,
    });

    return response.text ?? null;
  }

  async analyzeTradeBarrier(userDoc: string, tbtDoc: string): Promise<string | null> {
    const response = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: REPORT_PROMPT },
      contents: [
        { role: 'user', parts: [{ text: `(PRODUCT DOCUMENT: ${userDoc})` }] },
        { role: 'user', parts: [{ text: `(TBT DOCUMENT: ${tbtDoc})` }] },
      ],
    });

    return response.text ?? null;
  }

  async identifyConflicts(userDoc: string, tbtDoc: string): Promise<string | null> {
    const response = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: REMOVED_REPORT_PROMPT },
      contents: `FIRST DOCUMENT: ${userDoc} / SECOND DOCUMENT: ${tbtDoc}`,
    });

    return response.text ?? null;
  }

  async autoFix(productDoc: string, report: string): Promise<string | null> {
    const response = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: MODIFICATION_PROMPT },
      contents: [
        { role: 'user', parts: [{ text: `PRODUCT_DOCUMENT: ${productDoc}` }] },
        { role: 'user', parts: [{ text: `REPORT: ${report}` }] },
      ],
    });

    return response.text ?? null;
  }
}

export const aiService: AIService = new GeminiService();
