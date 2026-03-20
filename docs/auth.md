# Auth

## 구조

```
src/
├── lib/auth.ts             ← signIn, signOut, getToken (localStorage 상호작용)
└── context/AuthContext.tsx ← AuthProvider, useAuth hook (전역 상태 + 동작)
```

## AuthContext

`useAuth()`가 공급하는 값:

| 값 | 타입 | 설명 |
|---|---|---|
| `isAuthenticated` | boolean | 현재 로그인 여부 |
| `signIn()` | () => void | 토큰 저장 + 상태 갱신 |
| `signOut()` | () => void | 토큰 삭제 + 상태 갱신 |

## 사용법

```tsx
const { isAuthenticated, signIn, signOut } = useAuth()
```

- `useAuth()`는 반드시 `AuthProvider` 안에서 사용해야 함
- `signIn()`/`signOut()` 호출 시 상태가 자동 갱신됨 (별도 refresh 불필요)

## 흐름

```
Login    → signIn()  → navigate(from)
Default  → signOut() → navigate('/')
ProtectedRoute → isAuthenticated 체크
```

## lib vs util

- `lib/`: 외부 시스템(localStorage, API 등)과 상호작용하는 모듈
- `util/`: 순수 함수, 부수효과 없는 변환/계산
