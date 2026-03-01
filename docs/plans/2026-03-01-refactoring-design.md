# UNTBT Refactoring & Renewal Design

## Overview

UNTBT (언티비티) 프로젝트의 코드 구조 재설계 및 UI 리뉴얼.
기존 기능을 모두 유지하면서 코드를 깔끔하게 재구성한다.

## Scope

- 기존 기능 모두 유지 (TBT 분석, 자동수정, 히스토리, KnowTBT 연동, Docs)
- AI: OpenAI GPT-4o → Gemini 전환 예정 (구현은 TODO로 남김)
- DB: Prisma + PostgreSQL 스키마 유지
- UI: 새로 디자인
- 코드 구조: 전면 재설계

## Architecture

### Folder Structure

```
src/
├── lib/
│   ├── ai/
│   │   ├── types.ts                        # AIService 인터페이스
│   │   ├── prompts.ts                      # 프롬프트 상수
│   │   └── gemini.ts                       # GeminiService (TODO)
│   ├── db/
│   │   ├── prisma.ts                       # Prisma 싱글톤
│   │   └── trade-document.repository.ts    # TradeDocument 쿼리
│   └── external/
│       └── knowtbt.ts                      # KnowTBT API 클라이언트
├── services/
│   ├── analysis.service.ts                 # TBT 분석 로직
│   ├── autofix.service.ts                  # 자동 수정 로직
│   └── history.service.ts                  # 히스토리 CRUD
├── app/
│   ├── api/v1/
│   │   ├── docs/route.ts
│   │   ├── autofix/route.ts
│   │   ├── history/route.ts
│   │   ├── know/route.ts
│   │   └── remove/route.ts
│   ├── (Service)/
│   │   ├── layout.tsx
│   │   ├── (Home)/page.tsx
│   │   ├── (Autofix)/autofix/page.tsx
│   │   ├── (Docs)/docs/page.tsx
│   │   └── (Search)/search/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── CircleLoading.tsx
│   │   └── SearchInput.tsx
│   ├── layout/
│   │   ├── TopNavbar.tsx
│   │   └── Background.tsx
│   └── features/
├── types/
│   └── index.ts
└── utils/
    └── diff.ts
```

### AI Service Layer

```typescript
// src/lib/ai/types.ts
export interface AIService {
  classifyProduct(text: string): Promise<string>;
  analyzeTradeBarrier(userDoc: string, tbtDoc: string): Promise<string>;
  identifyConflicts(userDoc: string, tbtDoc: string): Promise<string>;
  autoFix(productDoc: string, report: string): Promise<string>;
}
```

- `GeminiService`가 `AIService` 인터페이스를 구현
- 각 메서드 본문은 `// TODO: Gemini API 구현`
- 프롬프트는 `prompts.ts`에서 관리

### Service Layer

API route의 비즈니스 로직을 서비스로 분리:

- **AnalysisService**: 제품 텍스트 → ICS 분류 → DB 조회 → AI 분석 → 히스토리 저장
- **AutofixService**: 제품 문서 + 리포트 → AI 자동 수정
- **HistoryService**: 히스토리 CRUD

API route는 request 파싱 → 서비스 호출 → response 반환만 담당.

### Repository Layer

- `TradeDocumentRepository`: 기존 `Query` 클래스를 정리
- 하드코딩된 필터(2019, 유럽)를 파라미터화
- Prisma 싱글톤 유지

### External API

- `KnowTBTClient`: 기존 커스텀 https 래퍼를 fetch API 기반으로 정리
- OAuth2 인증 로직 캡슐화

### UI

- 기존 컴포넌트를 ui / layout / features로 분류
- 모든 페이지 UI 리디자인
- Tailwind CSS 유지

## Key Changes

| Area | Before | After |
|------|--------|-------|
| AI | `GPT` class (OpenAI) | `AIService` interface + `GeminiService` (TODO) |
| DB Query | `Query` class (hardcoded) | `TradeDocumentRepository` (parameterized) |
| API Routes | Business logic included | Thin routes (service calls only) |
| External API | Custom https wrapper | `KnowTBTClient` class (fetch-based) |
| Components | Flat structure | ui / layout / features |
| Types | Minimal | Consolidated type file |
| Utils | Mixed concerns | diff utility only, rest moved to proper layers |

## Dependencies

- `openai` 패키지 제거
- Gemini SDK 추가 예정 (TODO)
- 나머지 의존성 유지

## Constraints

- DB 스키마 변경 없음
- 기존 API 엔드포인트 경로 유지 (/api/v1/*)
- 기존 기능 모두 유지
