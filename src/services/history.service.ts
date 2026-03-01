import prisma from '@/lib/db/prisma';
import type { HistoryRecord } from '@/types';

export async function getAllHistory() {
  return prisma.history.findMany();
}

export async function getHistoryById(id: number): Promise<HistoryRecord | null> {
  return prisma.history.findFirst({ where: { id } });
}

export async function createHistory(productDocument: string, report: string | null) {
  return prisma.history.create({
    data: { productDocument, report },
  });
}
