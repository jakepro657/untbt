import type { AIService } from './types';

class GeminiService implements AIService {
  async classifyProduct(text: string): Promise<string | null> {
    // TODO: Gemini API 구현 - SEMANTIC_SEARCH_PROMPT 사용
    throw new Error('Not implemented: Gemini classifyProduct');
  }

  async analyzeTradeBarrier(userDoc: string, tbtDoc: string): Promise<string | null> {
    // TODO: Gemini API 구현 - REPORT_PROMPT 사용
    throw new Error('Not implemented: Gemini analyzeTradeBarrier');
  }

  async identifyConflicts(userDoc: string, tbtDoc: string): Promise<string | null> {
    // TODO: Gemini API 구현 - REMOVED_REPORT_PROMPT 사용
    throw new Error('Not implemented: Gemini identifyConflicts');
  }

  async autoFix(productDoc: string, report: string): Promise<string | null> {
    // TODO: Gemini API 구현 - MODIFICATION_PROMPT 사용
    throw new Error('Not implemented: Gemini autoFix');
  }
}

export const aiService: AIService = new GeminiService();
