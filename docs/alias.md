# 경로 Alias 설정

`@`를 `src/`의 절대경로로 사용:

```typescript
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
import '@/resource/styles/app.scss'
import Button from '@/components/Button'
```
