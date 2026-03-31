# SCSS 설정

## 왜 SCSS + CSS Modules 인가

| 방식 | 문제점 |
|------|--------|
| Tailwind | 클래스 조합 방식이라 공통 스타일 통제 수단이 없음. 디자인 변경 시 사용된 곳을 전부 찾아 수정해야 함 |
| styled-components | JS 안에 CSS를 작성해 스타일만 수정할 때도 JS 파일을 건드려야 함. 퍼블리셔 협업이 어렵고 로직과 스타일의 역할 분리가 안 됨 |
| SCSS + CSS Modules | 변수/믹스인으로 공통 스타일 통제 가능, 퍼블리셔 협업 가능, 스코프 격리 |

---

```bash
pnpm add -D sass
```

## 폴더 구조

```
src/
├── main.scss                    # base 취합 → main.tsx에서 import
├── layout/
│   ├── Default.module.scss      # Default 레이아웃 스타일 (CSS Module)
│   ├── _blank.scss              # 빈 레이아웃 스타일
│   └── _popup.scss              # 팝업 레이아웃 스타일
└── resource/style/
    ├── define/                  # CSS 미생성 → additionalData로 자동 주입
    │   ├── _variable.scss       # 색상, 폰트, 간격 등 변수
    │   └── _mixin.scss          # 재사용 믹스인
    ├── vendor/                  # 서드파티 scss → additionalData로 자동 주입
    │   └── _sassy-cubic-bezier.scss
    └── base/                    # CSS 생성 → main.scss에서 @import
        ├── _reset.scss          # CSS 초기화
        └── _common.scss         # 공통 base 스타일
```

## 규칙

- `define/`, `vendor/` — `additionalData`로 전역 주입, 모든 scss에서 `@use` 없이 사용 가능
- `base/` — CSS를 직접 생성하므로 `main.scss`에서 `@import`로 취합
- `main.scss`에서 `@import` 사용하는 이유: `@use`로 불러온 파티셜은 Vite가 아닌 Sass 엔진이 처리하여 `additionalData`가 주입되지 않음. `@import`는 내용을 그 자리에 복붙하는 방식이라 변수가 전파됨
- 레이아웃 컴포넌트 스타일 — CSS 누적 언로드 불가 문제로 `.module.scss`를 사용, 컴포넌트 파일 옆에 배치 (`src/layout/`) — 자세한 배경은 [limitations.md](./limitations.md) 참조

## main.tsx

```tsx
import './main.scss'
```

## vite.config.ts

변수/믹스인을 모든 SCSS 파일에 자동 주입, `silenceDeprecations`로 `@import` deprecation 경고 억제:

```typescript
css: {
  preprocessorOptions: {
    scss: {
      silenceDeprecations: ['import'],
      additionalData: `
        @use "@/resource/style/define/variable" as *;
        @use "@/resource/style/define/mixin" as *;
        @use "@/resource/style/vendor/sassy-cubic-bezier" as *;
      `
    }
  }
}
```
