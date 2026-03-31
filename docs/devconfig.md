# 개발환경설정

## 경로 Alias

`@`를 `src/`의 절대경로로 사용:

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```tsx
// 사용 예
import Button from '@/component/Button'
```

---

## Code Splitting / Lazy Loading

라우터에서 모든 페이지를 `lazy()` 로 import하면 빌드 시 페이지별로 JS가 자동 분리됩니다.
첫 접속 시 전체 JS를 다운로드하지 않고, 해당 페이지 진입 시점에 로드합니다.

```ts
// router/index.tsx
const Home = lazy(() => import('@/page/home/Home'))
const Login = lazy(() => import('@/page/auth/Login'))
```

---

## 빌드 번들 분리

라우트별 lazy import로 JS/CSS가 자동 분리되며, 라이브러리는 `manualChunks`로 별도 청크로 묶음:

| 청크 | 내용 |
|------|------|
| `vendor` | React, react-dom, react-router-dom |
| `plugin` | 그 외 node_modules, src/vendor/ |
| 페이지별 | lazy import된 페이지 컴포넌트 |

```ts
manualChunks: (id) => {
  if (id.includes('node_modules') || id.includes('src/vendor')) {
    if (['node_modules/react/', 'node_modules/react-dom/', 'node_modules/react-router-dom/', 'node_modules/react-router/']
      .some(pkg => id.includes(pkg))) return 'vendor'
    return 'plugin'
  }
}
```

> `src/vendor/` — 보안 정책 등으로 npm 설치가 불가한 경우 라이브러리를 직접 저장하는 폴더

---

## 빌드 출력 경로

```
dist/
├── js/     # JS 청크
├── css/    # CSS 청크
├── image/  # 이미지
└── font/   # 폰트
```

---

## SCSS 전역 자동 주입

모든 scss 파일에 아래 파일이 자동으로 주입됨:

```
src/resource/style/define/variable  # 변수
src/resource/style/define/mixin     # 믹스인
src/resource/style/vendor/sassy-cubic-bezier
```

---

## 이미지 최적화

빌드 시 `vite-plugin-image-optimizer`로 자동 압축:

| 포맷 | 설정 |
|------|------|
| jpg/jpeg/png/webp | quality 80 |
| gif | optimizationLevel 3 |
| svg | preset-default (cleanupIds 제외) |

---

## Memoization

React Compiler (`babel-plugin-react-compiler`) 가 빌드 시 자동으로 memoization 처리합니다.
`useMemo`, `useCallback` 을 수동으로 작성하지 않아도 됩니다.

```ts
// vite.config.ts
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

plugins: [
  react(),
  babel({ presets: [reactCompilerPreset()] }),
]
```

---

## 번들 분석 (선택)

`rollup-plugin-visualizer` 로 빌드 후 번들 구성을 시각적으로 확인할 수 있습니다.
라이브러리 추가 시 번들 크기 영향을 확인할 때 유용합니다.

> dev 서버는 번들링을 하지 않아 실시간 분석은 불가능합니다. 빌드 시에만 생성됩니다.

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  ...
  visualizer({ open: false, filename: 'public/stats.html' })
]
```

빌드 후 `http://localhost:5003/stats.html` 에서 확인:

```bash
pnpm build
pnpm preview
```

---

## Web Vitals 측정

미구현

---

## 개발 서버

```
port: 5003
```
