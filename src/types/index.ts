export interface TbtApiParams {
  itemCategoryCode: string;
  middleCategoryCode: string;
}

export interface TradeDocumentQuery {
  itemCategoryCode: string;
  middleCategoryCode: string;
  notificationYear?: number;
  continentName?: string;
}

export interface AnalysisResult {
  message: string;
  isTradable: boolean;
}

export interface HistoryRecord {
  id: number;
  productDocument: string | null;
  report: string | null;
}
