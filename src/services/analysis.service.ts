import { aiService } from '@/lib/ai/gemini';
import { findTradeDocuments } from '@/lib/db/trade-document.repository';
import type { AnalysisResult } from '@/types';
import { createHistory } from './history.service';

export async function analyzeProduct(text: string): Promise<AnalysisResult> {
  const codes = await aiService.classifyProduct(text);
  if (!codes) throw new Error('Failed to classify product');

  const [c1, c2] = codes.split('.');

  const tbtDocs = await findTradeDocuments({
    itemCategoryCode: c1,
    middleCategoryCode: c2,
  });

  const tbtContent = tbtDocs.join('\n-------------------------------\n');
  const report = await aiService.analyzeTradeBarrier(text, tbtContent);

  await createHistory(text, report);

  const isTradable = report?.includes('YES') ?? false;

  return { message: report ?? '', isTradable };
}

export async function identifyConflicts(text: string, tbtDocs: string): Promise<string> {
  const result = await aiService.identifyConflicts(text, tbtDocs);
  return result ?? '';
}
