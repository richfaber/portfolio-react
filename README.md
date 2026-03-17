# 리액트 보일러 플레이트

> React 19 + Vite + TypeScript 기반 보일러 플레이트

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19 |
| Build Tool | Vite |
| Language | TypeScript |
| Package Manager | pnpm |
| Styling | SCSS (sass) |

## 요구사항

- Node.js 18+
- pnpm

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

## 프로젝트 구조

```
src/
├── components/   # 공통 컴포넌트
├── layouts/      # 레이아웃 컴포넌트
├── pages/        # 페이지 컴포넌트
├── store/        # 상태 관리
├── hooks/        # 커스텀 훅
├── resource/     # 정적 리소스
│   ├── assets/   # 이미지, 폰트 등
│   └── styles/   # 공통 스타일 (variables, mixins, reset)
└── utils/        # 유틸리티 함수
```

## SCSS 설정

```bash
pnpm add -D sass
```

`src/resource/styles/` 폴더 구조:

```
src/resource/styles/
├── define/               # CSS 미생성 → additionalData로 자동 주입
│   ├── _variable.scss    # 색상, 폰트, 간격 등 변수
│   └── _mixin.scss       # 재사용 믹스인
├── vendor/               # 서드파티 scss → additionalData로 자동 주입
│   └── _sassy-cubic-bezier.scss
├── base/                 # CSS 생성 → app.scss에서 @use
│   ├── _reset.scss       # CSS 초기화
│   └── _common.scss      # 공통 base 스타일
├── layout/               # CSS 생성 → app.scss에서 @use
│   ├── _default.scss
│   ├── _blank.scss
│   └── _popup.scss
└── app.scss              # base, layout @use 취합 → main.tsx에서 import
```

- `define/`, `vendor/` — `additionalData`로 전역 주입, 모든 scss에서 `@use` 없이 사용 가능
- `base/`, `layout/` — CSS를 직접 생성하므로 `app.scss`에서만 `@use` (`additionalData`에 넣으면 중복 출력)

`app.scss`를 [src/main.tsx](src/main.tsx)에서 한 번 import:

```tsx
import '@/resource/styles/app.scss'
```

`vite.config.ts`에 `additionalData` 추가 — 변수/믹스인을 모든 SCSS 파일에 자동 주입:

```typescript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @use "@/resource/styles/define/variable" as *;
        @use "@/resource/styles/define/mixin" as *;
        @use "@/resource/styles/vendor/sassy-cubic-bezier" as *;
      `
    }
  }
}
```

---

## 구현 목록

### 인증

- [ ] JWT 토큰 관리 (access + refresh token)
- [ ] OAuth 2.0 (Google, GitHub)
- [ ] 소셜 로그인
- [ ] Protected Route
- [ ] 자동 토큰 갱신 (silent refresh)

### 컴포넌트

- [ ] Carousel / Slider
- [ ] Modal / Dialog
- [ ] Toast / Snackbar 알림
- [ ] Infinite Scroll
- [ ] Skeleton Loading
- [ ] Drag & Drop
- [ ] Form (유효성 검사 포함)
- [ ] 다크모드 토글

### 유틸리티

- [ ] 커스텀 훅 (`useFetch`, `useDebounce`, `useLocalStorage`)
- [ ] API 클라이언트 추상화 (axios interceptor)
- [ ] 에러 바운더리 (Error Boundary)
- [ ] i18n 다국어 처리
- [ ] 날짜/시간 포맷 유틸

### 상태관리

- [ ] Zustand
- [ ] React Query / TanStack Query
- [ ] Context API

### 성능 최적화

- [ ] Code Splitting / Lazy Loading
- [ ] 이미지 최적화
- [ ] Memoization
- [ ] Web Vitals 측정
