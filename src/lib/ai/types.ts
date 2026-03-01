export interface AIService {
  classifyProduct(text: string): Promise<string | null>;
  analyzeTradeBarrier(userDoc: string, tbtDoc: string): Promise<string | null>;
  identifyConflicts(userDoc: string, tbtDoc: string): Promise<string | null>;
  autoFix(productDoc: string, report: string): Promise<string | null>;
}
