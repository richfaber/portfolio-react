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

## 문서

- [경로 Alias 설정](docs/alias.md)
- [SCSS 설정](docs/scss.md)

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
