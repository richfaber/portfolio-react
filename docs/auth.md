# Auth

## 구조

```
src/
├── lib/auth.ts             ← signIn, signOut, signInWithOAuth, getRawToken, getParsedToken, getParsedRefreshToken, refreshAccessToken
├── lib/tokenStorage.ts     ← 토큰 저장소 추상화 (기본값: localStorage)
├── context/AuthContext.tsx ← AuthProvider, useAuth hook (전역 상태 + 동작)
└── page/auth/
    ├── Login.tsx           ← ID/PW 로그인 + OAuth 버튼
    └── OAuthCallback.tsx   ← OAuth 팝업 콜백 페이지
```

## AuthContext

`useAuth()`가 공급하는 값:

| 값 | 타입 | 설명 |
|---|---|---|
| `isAuthenticated` | boolean | 현재 로그인 여부 |
| `userId` | string \| null | 로그인한 사용자 ID |
| `role` | string \| null | 사용자 권한 |
| `signIn()` | () => void | 토큰 저장 + 상태 갱신 |
| `signOut()` | () => void | 토큰 삭제 + 상태 갱신 |
| `generateOAuth()` | (platform: string) => void | OAuth 팝업 열기 + 로그인 처리 |

## 사용법

```tsx
const { isAuthenticated, userId, role, signIn, signOut, generateOAuth } = useAuth()
```

- `useAuth()`는 반드시 `AuthProvider` 안에서 사용해야 함
- `signIn()`/`signOut()` 호출 시 상태가 자동 갱신됨

## 흐름

```
Login    → signIn()  → navigate(from)
Default  → signOut() → navigate('/')
ProtectedRoute → isAuthenticated 체크

OAuthLogin → generateOAuth('google') → 팝업 열기
           → OAuthCallback 페이지에서 code 수신
           → postMessage로 부모 창에 전달
           → signInWithOAuth(platform, code) → JWT 저장 → 상태 갱신
```

## JWT 토큰 구조

- **Access Token** - API 인증용, 만료시간 짧음
- **Refresh Token** - Access Token 재발급용, 만료시간 김

현재는 Mock JWT 사용 (서버 없음). 실제 연동 시 `signIn()` 내부에서 axios 호출로 교체.

## Silent Refresh

`AuthProvider` 마운트 시 `useEffect`로 자동 실행:

```
1. Access Token 만료시간 확인
2. 만료 30초 전 setTimeout 예약
3. refreshAccessToken() 호출
4. 성공 → 상태 업데이트
5. 실패 → signOut() 강제 로그아웃
```

로그아웃 시 클린업(`clearTimeout`)으로 예약된 타이머 취소.

## OAuth 2.0 소셜 로그인

팝업 방식(Popup Flow) 사용. 현재 Google 지원.

### 흐름

```
1. generateOAuth('google') 호출 → 구글 로그인 팝업 열기
2. 사용자 구글 로그인 완료
3. 구글 → OAuthCallback 페이지로 리다이렉트 (?code=xxx)
4. OAuthCallback에서 code를 postMessage로 부모 창에 전달 후 팝업 닫기
5. 부모 창에서 signInWithOAuth(platform, code) 호출 → JWT 저장
6. 상태 갱신 (isAuthenticated, userId, role)
```

### 환경변수

| 변수 | 설명 |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | 구글 콘솔에서 발급한 클라이언트 ID |
| `VITE_GOOGLE_CALLBACK_URI` | 구글 콘솔에 등록한 리다이렉트 URI |

`.env.example` 참고. `client_id`와 `redirect_uri`는 URL에 노출되는 값이므로 보안 민감 정보가 아님. `client_secret`은 백엔드에서만 관리.

### 플랫폼 추가 방법

`generateOAuth()` 내부의 `if (platform == 'google')` 블록과 동일한 패턴으로 URL 생성 블록 추가. 팝업/리스너 로직은 공통으로 재사용됨.

## 토큰 저장소

토큰 저장/조회/삭제는 `src/lib/tokenStorage.ts`에서 관리합니다. 기본값은 `localStorage` 이며, 저장소를 바꾸려면 이 파일만 수정하면 됩니다.

## 강제 로그아웃 흐름

`apiClient` / `axiosClient`에서 401 처리 실패(refresh 불가) 시 `auth:unauthorized` CustomEvent를 발행합니다. 
`AuthContext`가 이를 구독하여 `signOut()` + `/Login` 리다이렉트를 처리합니다.

```
apiClient → 401 & refresh 실패
  → dispatchEvent('auth:unauthorized')
  → AuthContext → signOut() + navigate('/Login')
```

## lib vs util

- `lib/`: 외부 시스템(localStorage, API 등)과 상호작용하는 모듈
- `util/`: 순수 함수, 부수효과 없는 변환/계산
