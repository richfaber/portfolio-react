# SCSS 설정

```bash
pnpm add -D sass
```

## 폴더 구조

```
src/resource/styles/
├── define/               # CSS 미생성 → additionalData로 자동 주입
│   ├── _variable.scss    # 색상, 폰트, 간격 등 변수
│   └── _mixin.scss       # 재사용 믹스인
├── vendor/               # 서드파티 scss → additionalData로 자동 주입
│   └── _sassy-cubic-bezier.scss
├── base/                 # CSS 생성 → app.scss에서 @import
│   ├── _reset.scss       # CSS 초기화
│   └── _common.scss      # 공통 base 스타일
├── layout/               # CSS 생성 → app.scss에서 @import
│   ├── _default.scss
│   ├── _blank.scss
│   └── _popup.scss
└── app.scss              # base, layout 취합 → main.tsx에서 import
```

## 규칙

- `define/`, `vendor/` — `additionalData`로 전역 주입, 모든 scss에서 `@use` 없이 사용 가능
- `base/`, `layout/` — CSS를 직접 생성하므로 `app.scss`에서 `@import`로 취합
- `app.scss`에서 `@import` 사용하는 이유: `@use`로 불러온 파티셜은 Vite가 아닌 Sass 엔진이 처리하여 `additionalData`가 주입되지 않음. `@import`는 내용을 그 자리에 복붙하는 방식이라 변수가 전파됨

## main.tsx

```tsx
import '@/resource/styles/app.scss'
```

## vite.config.ts

변수/믹스인을 모든 SCSS 파일에 자동 주입, `silenceDeprecations`로 `@import` deprecation 경고 억제:

```typescript
css: {
  preprocessorOptions: {
    scss: {
      silenceDeprecations: ['import'],
      additionalData: `
        @use "@/resource/styles/define/variable" as *;
        @use "@/resource/styles/define/mixin" as *;
        @use "@/resource/styles/vendor/sassy-cubic-bezier" as *;
      `
    }
  }
}
```
