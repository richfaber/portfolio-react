# 리액트 보일러 플레이트

> React 19 + Vite + TypeScript 기반 보일러 플레이트

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript 5.9 |
| Router | react-router-dom 7 |
| Package Manager | pnpm |
| Styling | SCSS (sass) + CSS Modules |
| 최적화 | React Compiler (babel-plugin-react-compiler) |
| i18n | i18next + react-i18next |

## 요구사항

- Node.js 18+
- pnpm

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (port 5003)
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview

# 린트
pnpm lint
```

## 프로젝트 구조

```
src/
├── main.tsx          # 앱 진입점
├── main.scss         # 전역 base 스타일
├── App.tsx           # Provider 구성
├── router/           # 라우터 구성
├── i18n/             # 다국어 설정 및 번역 파일
├── component/        # 공통 컴포넌트
├── layout/           # 레이아웃 컴포넌트 (*.tsx + *.module.scss)
├── page/             # 페이지 컴포넌트 (lazy import)
└── resource/
    └── style/
        ├── define/   # 변수, 믹스인 (전역 자동 주입)
        ├── vendor/   # 서드파티 scss (전역 자동 주입)
        └── base/     # 전역 base CSS (reset, common)
```

## 문서

- [개발환경설정](docs/devconfig.md)
- [SCSS 설정](docs/scss.md)
- [API 클라이언트](docs/api-client.md)
- [날짜 유틸](docs/date-util.md)
- [Error Boundary](docs/error-boundary.md)
- [i18n 다국어 처리](docs/i18n.md)
- [React 한계 및 의사결정](docs/limitations.md)

---

## 구현 목록

### 인증

- [X] Protected Route
- [X] JWT 토큰 관리 (access token)
- [X] 자동 토큰 갱신 (silent refresh)
- [X] OAuth 2.0 소셜 로그인 (google)

### 유틸리티

- [X] API 클라이언트 추상화 (fetch, axios)
- [X] 에러 바운더리
- [X] i18n 다국어 처리 (Context)
- [X] i18n 다국어 처리 (react-i18next)
- [X] 날짜/시간 포맷 유틸

### 컴포넌트

- [X] Button
- [ ] Carousel / Slider
- [ ] Modal / Dialog
- [ ] Toast / Snackbar 알림
- [ ] Infinite Scroll
- [ ] Skeleton Loading
- [ ] Drag & Drop
- [ ] 다크모드 토글

### 상태관리

#### 클라이언트 상태

- [X] Zustand

#### 서버 상태

- [X] React Query / TanStack Query

### 개발환경설정

- [X] Code Splitting / Lazy Loading
- [X] 이미지 최적화
- [X] Memoization
- [ ] Web Vitals 측정

### 기타

- [ ] 리액트훅 폼
- [ ] Zod
