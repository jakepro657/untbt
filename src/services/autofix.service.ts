import { aiService } from '@/lib/ai/gemini';

export async function autoFixDocument(productDocument: string, report: string): Promise<string> {
  const result = await aiService.autoFix(productDocument, report);
  return result ?? '';
}
