import type { TradeDocumentQuery } from '@/types';
import prisma from './prisma';

export async function findTradeDocuments({
  itemCategoryCode,
  middleCategoryCode,
  notificationYear = 2019,
  continentName = '유럽',
}: TradeDocumentQuery): Promise<string[]> {
  const documents = await prisma.tradeDocument.findMany({
    where: {
      middleCategoryCode,
      itemCategoryCode,
      notificationYear,
      continentName,
    },
  });

  return documents
    .sort((a, b) => {
      const dateA = a.notificationDate?.getTime() ?? 0;
      const dateB = b.notificationDate?.getTime() ?? 0;
      return dateB - dateA;
    })
    .map((doc) => `${doc.itemNameKorean} ${doc.mainContentKorean}`);
}
