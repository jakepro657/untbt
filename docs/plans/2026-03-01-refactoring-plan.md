# UNTBT Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the entire UNTBT codebase into clean layered architecture (lib → services → API routes → UI) and redesign the frontend.

**Architecture:** Bottom-up refactoring: create new lib/services layers first, then refactor API routes to use them, restructure components, redesign UI, and finally clean up old files. AI integration uses an interface with Gemini TODO stubs.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma (PostgreSQL), Headless UI, Heroicons

---

### Task 1: Create types and AI service interface

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/ai/types.ts`

**Step 1: Create consolidated types file**

```typescript
// src/types/index.ts
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
```

**Step 2: Create AI service interface**

```typescript
// src/lib/ai/types.ts
export interface AIService {
  classifyProduct(text: string): Promise<string | null>;
  analyzeTradeBarrier(userDoc: string, tbtDoc: string): Promise<string | null>;
  identifyConflicts(userDoc: string, tbtDoc: string): Promise<string | null>;
  autoFix(productDoc: string, report: string): Promise<string | null>;
}
```

**Step 3: Commit**

```bash
git add src/types/index.ts src/lib/ai/types.ts
git commit -m "refactor: add consolidated types and AIService interface"
```

---

### Task 2: Migrate prompts

**Files:**
- Create: `src/lib/ai/prompts.ts` (content from `src/constant/prompt.ts`)

**Step 1: Create prompts file**

Copy content from `src/constant/prompt.ts` to `src/lib/ai/prompts.ts`. Remove commented-out code. Keep the 4 prompt constants:
- `SEMANTIC_SEARCH_PROMPT` (rename from `GPT_SEMANTIC_SEARCH_PROMPT`)
- `REPORT_PROMPT` (rename from `GPT_REPORT_PROMPT`)
- `REMOVED_REPORT_PROMPT` (rename from `GPT_REMOVED_REPORT_PROMPT`)
- `MODIFICATION_PROMPT` (rename from `GPT_MODIFICATION_PROMPT`)

Remove the `GPT_` prefix since they're no longer GPT-specific.

**Step 2: Commit**

```bash
git add src/lib/ai/prompts.ts
git commit -m "refactor: migrate prompts to lib/ai with vendor-neutral naming"
```

---

### Task 3: Create Gemini service stub

**Files:**
- Create: `src/lib/ai/gemini.ts`

**Step 1: Create GeminiService with TODO stubs**

```typescript
// src/lib/ai/gemini.ts
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
```

**Step 2: Commit**

```bash
git add src/lib/ai/gemini.ts
git commit -m "refactor: add GeminiService stub with TODO implementations"
```

---

### Task 4: Migrate Prisma singleton

**Files:**
- Create: `src/lib/db/prisma.ts` (content from `src/utils/prisma.ts`)

**Step 1: Move and simplify Prisma singleton**

Use the standard Next.js Prisma singleton pattern (globalThis-based) instead of the class-based approach.

```typescript
// src/lib/db/prisma.ts
import { PrismaClient } from '@prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

**Step 2: Commit**

```bash
git add src/lib/db/prisma.ts
git commit -m "refactor: migrate Prisma singleton to lib/db with globalThis pattern"
```

---

### Task 5: Create TradeDocument repository

**Files:**
- Create: `src/lib/db/trade-document.repository.ts`

**Step 1: Create repository**

Extract logic from `src/utils/query.ts`. Parameterize the hardcoded filters but keep them as defaults.

```typescript
// src/lib/db/trade-document.repository.ts
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
```

**Step 2: Commit**

```bash
git add src/lib/db/trade-document.repository.ts
git commit -m "refactor: create TradeDocument repository with parameterized queries"
```

---

### Task 6: Create KnowTBT client

**Files:**
- Create: `src/lib/external/knowtbt.ts`

**Step 1: Create KnowTBT client**

Extract logic from `src/app/api/v1/know/route.ts`. Replace custom `https` wrapper with native `fetch`. Move credentials to environment variables.

```typescript
// src/lib/external/knowtbt.ts
const KNOWTBT_HOST = process.env.KNOWTBT_HOST || 'https://www.KnowTBT.kr';

function base64Encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

async function getToken(): Promise<string> {
  const clientId = process.env.KNOWTBT_CLIENT_ID!;
  const clientSecret = process.env.KNOWTBT_CLIENT_SECRET!;
  const username = process.env.KNOWTBT_USERNAME!;
  const password = process.env.KNOWTBT_PASSWORD!;

  const body = new URLSearchParams({
    grant_type: 'password',
    scope: 'read',
    username,
    password,
  });

  const auth = base64Encode(`${clientId}:${clientSecret}`);

  const response = await fetch(`${KNOWTBT_HOST}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get KnowTBT access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function fetchTbtInfo() {
  const token = await getToken();

  const response = await fetch(`${KNOWTBT_HOST}/api/v1/tbtInfo`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch KnowTBT data');
  }

  return response.json();
}
```

**Step 2: Commit**

```bash
git add src/lib/external/knowtbt.ts
git commit -m "refactor: create KnowTBT client with fetch API and env vars"
```

---

### Task 7: Create history service

**Files:**
- Create: `src/services/history.service.ts`

**Step 1: Create service**

```typescript
// src/services/history.service.ts
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
```

**Step 2: Commit**

```bash
git add src/services/history.service.ts
git commit -m "refactor: create history service"
```

---

### Task 8: Create analysis service

**Files:**
- Create: `src/services/analysis.service.ts`

**Step 1: Create service**

Extract business logic from `src/app/api/v1/docs/route.ts` and `src/app/api/v1/remove/route.ts`.

```typescript
// src/services/analysis.service.ts
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
```

**Step 2: Commit**

```bash
git add src/services/analysis.service.ts
git commit -m "refactor: create analysis service with business logic"
```

---

### Task 9: Create autofix service

**Files:**
- Create: `src/services/autofix.service.ts`

**Step 1: Create service**

```typescript
// src/services/autofix.service.ts
import { aiService } from '@/lib/ai/gemini';

export async function autoFixDocument(productDocument: string, report: string): Promise<string> {
  const result = await aiService.autoFix(productDocument, report);
  return result ?? '';
}
```

**Step 2: Commit**

```bash
git add src/services/autofix.service.ts
git commit -m "refactor: create autofix service"
```

---

### Task 10: Refactor API routes

**Files:**
- Modify: `src/app/api/v1/docs/route.ts`
- Modify: `src/app/api/v1/remove/route.ts`
- Modify: `src/app/api/v1/autofix/route.ts`
- Modify: `src/app/api/v1/history/route.ts`
- Modify: `src/app/api/v1/know/route.ts`

**Step 1: Refactor docs route**

```typescript
// src/app/api/v1/docs/route.ts
import { analyzeProduct } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  const result = await analyzeProduct(text);
  return NextResponse.json(result);
}
```

**Step 2: Refactor remove route**

```typescript
// src/app/api/v1/remove/route.ts
import { identifyConflicts } from '@/services/analysis.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, tbtDocs } = await req.json();
  const message = await identifyConflicts(text, tbtDocs);
  return NextResponse.json({ message });
}
```

**Step 3: Refactor autofix route**

```typescript
// src/app/api/v1/autofix/route.ts
import { autoFixDocument } from '@/services/autofix.service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { productDocument, report } = await req.json();
  const modifiedDocument = await autoFixDocument(productDocument, report);
  return NextResponse.json({ modifiedDocument });
}
```

**Step 4: Refactor history route**

```typescript
// src/app/api/v1/history/route.ts
import { getAllHistory, getHistoryById } from '@/services/history.service';
import { NextResponse } from 'next/server';

export async function GET() {
  const docs = await getAllHistory();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  const { id } = await req.json();
  const doc = await getHistoryById(id);
  return NextResponse.json({
    report: doc?.report,
    productDocument: doc?.productDocument,
  });
}
```

**Step 5: Refactor know route**

```typescript
// src/app/api/v1/know/route.ts
import { fetchTbtInfo } from '@/lib/external/knowtbt';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchTbtInfo();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

**Step 6: Commit**

```bash
git add src/app/api/v1/
git commit -m "refactor: slim down API routes to use service layer"
```

---

### Task 11: Restructure components

**Files:**
- Move: `src/components/Button.tsx` → `src/components/ui/Button.tsx`
- Move: `src/components/CircleLoading.tsx` → `src/components/ui/CircleLoading.tsx`
- Move: `src/components/SearchInput.tsx` → `src/components/ui/SearchInput.tsx`
- Move: `src/components/nav/TopNavbar.tsx` → `src/components/layout/TopNavbar.tsx`
- Move: `src/components/theme/Background.tsx` → `src/components/layout/Background.tsx`
- Create: `src/utils/diff.ts` (content from `src/utils/utils.ts`)

**Step 1: Create new directory structure and move files**

Move each component to its new location. Update import paths in:
- `src/app/(Service)/layout.tsx` (TopNavbar, Background)
- `src/app/(Service)/(Home)/page.tsx` (CircleLoading, SearchInput)
- `src/app/(Service)/(Autofix)/autofix/page.tsx` (CircleLoading)

Move `findMissingParts` from `src/utils/utils.ts` to `src/utils/diff.ts`. Update import in Home page.

**Step 2: Commit**

```bash
git add src/components/ src/utils/diff.ts
git add src/app/\(Service\)/
git commit -m "refactor: restructure components into ui/layout directories"
```

---

### Task 12: Clean up old files and dependencies

**Files:**
- Delete: `src/utils/document.ts`
- Delete: `src/utils/query.ts`
- Delete: `src/utils/prisma.ts`
- Delete: `src/utils/utils.ts`
- Delete: `src/constant/prompt.ts`
- Delete: `src/types/type.d.ts`
- Delete: `src/components/nav/` (directory)
- Delete: `src/components/theme/` (directory)
- Delete: `src/components/Button.tsx` (old location)
- Delete: `src/components/CircleLoading.tsx` (old location)
- Delete: `src/components/SearchInput.tsx` (old location)
- Modify: `package.json` (remove `openai` dependency)

**Step 1: Delete old files**

Remove all old source files that have been migrated to new locations.

**Step 2: Remove openai dependency**

```bash
# package.json에서 openai 의존성 제거
yarn remove openai
```

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor: remove old files and openai dependency"
```

---

### Task 13: Build verification

**Step 1: Run TypeScript compilation check**

```bash
yarn build
```

Expected: Build succeeds with no type errors. If there are errors, fix import paths.

**Step 2: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors from refactoring"
```

---

### Task 14: Redesign Service layout and TopNavbar

**Files:**
- Modify: `src/app/(Service)/layout.tsx`
- Modify: `src/components/layout/TopNavbar.tsx`

**Step 1: Redesign TopNavbar**

현대적이고 깔끔한 네비게이션 바로 재설계:
- 로고 텍스트 "UNTBT" 사용 (외부 이미지 대신)
- 불필요한 프로필 드롭다운, 알림 벨 제거
- 깔끔한 네비게이션 링크 (Next.js Link 사용)
- 반응형 유지

**Step 2: Redesign Service layout**

- 배경 이미지 제거 또는 미니멀하게 변경
- 깔끔한 레이아웃 구조

**Step 3: Commit**

```bash
git add src/app/\(Service\)/layout.tsx src/components/layout/
git commit -m "feat: redesign navigation bar and service layout"
```

---

### Task 15: Redesign Home page

**Files:**
- Modify: `src/app/(Service)/(Home)/page.tsx`
- Modify: `src/components/ui/SearchInput.tsx`

**Step 1: Redesign Home page UI**

현재 3-컬럼 레이아웃을 개선:
- 상단: 제목 + 설명
- 중앙: 넓은 텍스트 입력 영역 + 검색 버튼
- 하단: 분석 결과 + 피드백을 카드 형태로 표시
- 로딩 상태 개선

**Step 2: Update SearchInput component**

- 사용하지 않는 props 정리
- 디자인 개선

**Step 3: Commit**

```bash
git add src/app/\(Service\)/\(Home\)/ src/components/ui/SearchInput.tsx
git commit -m "feat: redesign home page with modern card layout"
```

---

### Task 16: Redesign Autofix page

**Files:**
- Modify: `src/app/(Service)/(Autofix)/autofix/page.tsx`

**Step 1: Redesign Autofix page UI**

현재 4-컬럼 레이아웃을 개선:
- 좌측 사이드바: 히스토리 목록 (카드 형태)
- 메인 영역: 탭 또는 카드로 원본/보고서/수정본 표시
- 자동 수정 버튼 개선
- 로딩/빈 상태 UI 추가

**Step 2: Commit**

```bash
git add src/app/\(Service\)/\(Autofix\)/
git commit -m "feat: redesign autofix page with improved layout"
```

---

### Task 17: Redesign Docs page

**Files:**
- Modify: `src/app/(Service)/(Docs)/docs/page.tsx`

**Step 1: Redesign Docs page**

현재 단순 textarea를 카드 기반 샘플 문서 표시로 개선.

**Step 2: Commit**

```bash
git add src/app/\(Service\)/\(Docs\)/
git commit -m "feat: redesign docs page with sample document cards"
```

---

### Task 18: Final cleanup and globals.css

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Clean up globals.css**

- 중복 폰트 선언 정리 (next/font/local과 @font-face 중복)
- 불필요한 폰트 제거

**Step 2: Clean up root layout**

- 사용하지 않는 폰트 변수 정리
- lang="ko"로 변경

**Step 3: Final build verification**

```bash
yarn build
```

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "refactor: clean up fonts and root layout"
```
