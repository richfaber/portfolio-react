# Error Boundary

`react-error-boundary` 라이브러리를 사용해 렌더링 중 발생하는 에러를 처리합니다.

## 구조

```
BrowserRouter
└── AuthProvider
    └── Router (Routes)
        ├── /Error 페이지  ← ErrorBoundary 바깥 (항상 접근 가능)
        └── ErrorBoundaryLayer (ErrorBoundary + Outlet)
            └── 나머지 페이지들
```

에러 발생 시 `ErrorBoundaryLayer`의 ErrorBoundary가 캐치하고 `/Error` 페이지로 이동합니다.
`/Error` 라우트를 ErrorBoundary 바깥에 둔 이유는, ErrorBoundary가 에러를 캐치하면 하위 `<Routes>`를 언마운트하기 때문입니다.

## 주요 파일

| 파일 | 역할 |
|------|------|
| `src/component/ErrorBoundary.tsx` | `react-error-boundary` 래퍼 컴포넌트 |
| `src/router/index.tsx` | `ErrorBoundaryLayer`, `DefaultFallback` 정의 |
| `src/page/etc/Error.tsx` | 에러 페이지 (`useLocation`으로 메시지 수신) |
| `src/page/test/Error.tsx` | Error Boundary 동작 확인용 테스트 페이지 |

## Error Boundary가 캐치하는 에러

- 렌더링 중 발생한 에러
- `lazy()` 로딩 실패

## Error Boundary가 캐치하지 못하는 에러

- 이벤트 핸들러 내부 에러 → `useErrorBoundary`의 `showBoundary`로 수동 전달
- 비동기 코드 (`setTimeout`, `fetch`) → 동일하게 `showBoundary` 사용

## 페이지별 ErrorBoundary

특정 영역에서 에러를 상위로 전파하지 않고 처리하려면 직접 감쌉니다:

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  )
}

<ErrorBoundary FallbackComponent={Fallback}>
  <SomeComponent />
</ErrorBoundary>
```
