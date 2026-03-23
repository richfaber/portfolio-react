import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, signIn as authSignIn, signInWithOAuth, signOut as authSignOut, refreshAccessToken } from '@/lib/auth'
import type { UserPayloadType } from '@/lib/auth'

export interface AuthContextType {
  isAuthenticated: boolean,
  signIn: (payload: { id: string, pw: string }) => Promise<void>,
  signOut: () => void,
  generateOAuth: (platform: string) => void,
  userId: UserPayloadType['userId'] | null
  role: UserPayloadType['role'] | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const tokenInfo = getToken()
    return !!tokenInfo
  })
  const [userId, setUserId] = useState(() => getToken()?.payload.userId ?? null)
  const [role, setRole] = useState(() => getToken()?.payload.role ?? null)

  function generateOAuth(platform) {

    let OAuthUrl

    if ( platform == 'google' ) {
      
      const params = new URLSearchParams({

        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GOOGLE_CALLBACK_URI,
        response_type: 'code',
        scope: 'openid email profile',
        prompt: 'select_account' // 항상 동의화면 표시
        
      })

      OAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${ params }`

    }

    if( !OAuthUrl ) return

    window.open(OAuthUrl, '_blank', 'width=500, height=600')
    window.addEventListener('message', (e) => {

      // @TODO 도메인 체크로 보안유지 필요
      // if (!e.origin.match(/localhost/g)) return

      if(e.data.code) {

        signInWithOAuth(platform, e.data.code).then(res => {

          const tokenInfo = getToken()
          setUserId(tokenInfo?.payload.userId)
          setRole(tokenInfo?.payload.role)
          setIsAuthenticated(true)          

        }).catch(err => {

          // 실패 시 처리

        })

      }

    }, { once: true })    

  }

  function signIn(payload) {

    return authSignIn(payload).then(res => {

      const tokenInfo = getToken()

      setUserId(tokenInfo?.payload.userId)
      setRole(tokenInfo?.payload.role)
      setIsAuthenticated(true)

    })

  }

  function signOut() {

    authSignOut()

    setUserId(null)
    setRole(null)
    setIsAuthenticated(false)

  }

  useEffect(() => {

    if (!isAuthenticated) return

    const tokenInfo = getToken()
    if (!tokenInfo) return

    const remainTime = (tokenInfo.payload.exp * 1000) - Date.now()
    const refreshTimer = setTimeout(() => {

      const newToken = refreshAccessToken()

      if (newToken) {

        setUserId(newToken.payload.userId)
        setRole(newToken.payload.role)
        setIsAuthenticated(true)

      } else {

        signOut()

      }

    }, remainTime - 30000)

    return () => {

      clearTimeout(refreshTimer)

    }

  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, generateOAuth, userId, role }}>
      {children}
    </AuthContext.Provider>
  )

}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {

  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth 는 반드시 AuthProvider 안에서 사용 되어야 함.')

  return context

}