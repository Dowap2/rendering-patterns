# 🚀 Next.js Rendering 전략 적용 가이드 (셔틀러스 기준)

셔틀러스 서비스 특성에 맞춰 페이지별 최적의 렌더링 방식을 적용하기 위한 가이드입니다.  
페이지 목적과 데이터 변화 주기를 기반으로 SSR / CSR / SSG / ISR을 조합하는 **하이브리드 렌더링 전략**을 사용합니다.

---

## 📌 페이지별 추천 렌더링 방식 요약

| 페이지 유형                             | 예시                            | 추천 방식                             |
| --------------------------------------- | ------------------------------- | ------------------------------------- |
| 완전 공개 + 자주 안 바뀌는 페이지       | 랜딩, 소개, 가이드              | **SSG**                               |
| 자주 바뀌지만 실시간까진 필요 없는 목록 | 월간 대회 리스트, 동호회 리스트 | **ISR (60~300초 재검증)**             |
| SEO 중요한 상세 페이지                  | 대회 상세, 클럽 상세            | **ISR 또는 SSR**                      |
| 개인화/로그인 필수                      | 마이페이지, 내 전적, 예약       | **CSR (필요 시 부분 SSR)**            |
| 실시간 요소                             | 실시간 스코어, 실시간 코트 현황 | **CSR + WebSocket/Supabase realtime** |

---

## 🟦 SSG — 빌드 타임 정적 생성

```tsx
// app/tournaments/page.tsx
import { fetchTournaments } from "@/lib/api";

export default async function TournamentsPage() {
  const tournaments = await fetchTournaments(); // cache: 'force-cache' → SSG
  return (
    <main>
      <h1>대회 리스트</h1>
      <ul>
        {tournaments.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </main>
  );
}
```

```ts
// app/tournaments/data.ts
export async function fetchTournaments() {
  const res = await fetch("https://api.example.com/tournaments", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
```

---

## 🟩 ISR — 정적 + 주기적 재생성

```tsx
export const revalidate = 60; // 60초마다 다시 생성

import { fetchTournaments } from "@/lib/api";

export default async function TournamentsPage() {
  const tournaments = await fetchTournaments();
  return (
    <main>
      <h1>대회 리스트</h1>
    </main>
  );
}
```

```ts
// fetch 단위로 재검증 시간 지정
export async function fetchTournaments() {
  return fetch("https://api.example.com/tournaments", {
    next: { revalidate: 60 },
  }).then((res) => res.json());
}
```

---

## 🟥 SSR — 매 요청마다 서버 렌더링

```tsx
export const dynamic = "force-dynamic";

export default async function AdminTournamentPage() {
  const tournaments = await fetch("https://api.example.com/admin/tournaments", {
    cache: "no-store", // 캐싱 금지
  }).then((res) => res.json());

  return (
    <main>
      <h1>관리자용 대회 리스트</h1>
    </main>
  );
}
```

---

## 🟨 CSR — 클라이언트 렌더링

```tsx
"use client";

import { useEffect, useState } from "react";

export default function MyPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <p>불러오는 중...</p>;

  return (
    <main>
      <h1>{profile.name}님의 마이페이지</h1>
    </main>
  );
}
```

---

## ⭐ 페이지별 전략 정리표 (셔틀러스 버전)

| 경로              | 추천 방식      | 이유                                     |
| ----------------- | -------------- | ---------------------------------------- |
| /                 | SSG            | 업데이트 적음 + SEO 중요                 |
| /guide            | SSG            | 정적 문서                                |
| /tournaments      | ISR(60–300초)  | 데이터 업데이트 잦음 + 첫 화면 속도 중요 |
| /tournaments/[id] | ISR 또는 SSR   | 상세 정보 + SEO                          |
| /clubs/[id]       | ISR            | 검색 유입 기대                           |
| /mypage           | CSR            | 로그인 / 개인화                          |
| /matches/live     | CSR + realtime | 실시간 업데이트 필요                     |
| /admin            | SSR            | 최신 데이터 + 권한 체크                  |

---

## 🔥 핵심 요약

| 방식    | 장점                  | 단점                         |
| ------- | --------------------- | ---------------------------- |
| **SSG** | 가장 빠름 · SEO 최고  | 업데이트 시 재빌드 필요      |
| **ISR** | 빠름 + 최신성 유지    | 실시간만큼 즉각적이지 않음   |
| **SSR** | 항상 최신 데이터 제공 | 서버 부하 큼 / 느릴 수 있음  |
| **CSR** | 상호작용/개인화 최적  | SEO 약함 + 초기 로딩 JS 의존 |

---

### 💡 의사결정 기준 한눈에

| 질문                    | Yes            | No              |
| ----------------------- | -------------- | --------------- |
| SEO 필요한가?           | SSR / ISR      | CSR             |
| 데이터가 자주 바뀌는가? | ISR / SSR      | SSG             |
| 로그인/개인화 기반인가? | CSR            | SSG / ISR / SSR |
| 실시간인가?             | CSR + Realtime | ISR / SSR       |

---

### 📍 결론

셔틀러스 서비스는 **SEO + 사용자 경험 + 최신 데이터 유지**가 모두 중요하므로  
단일 방식이 아닌 **SSG + ISR + SSR + CSR을 혼합한 하이브리드 렌더링 전략**이 최적입니다.
