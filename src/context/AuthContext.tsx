import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, signIn as authSignIn, signOut as authSignOut, refreshAccessToken } from '@/lib/auth'

interface AuthContextType {
  isAuthenticated: boolean,
  signIn: () => void
  signOut: () => void,
  userId: string | null,
  role: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }) {

  const tokenInfo = getToken()

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!tokenInfo)
  const [userId, setUserId] = useState(tokenInfo?.payload.userId ?? null)
  const [role, setRole] = useState(tokenInfo?.payload.role ?? null)

  function signIn() {

    authSignIn()

    const tokenInfo = getToken()

    setUserId(tokenInfo?.payload.userId)
    setRole(tokenInfo?.payload.role)
    setIsAuthenticated(true)

  }

  function signOut() {

    authSignOut()
    
    setUserId(null)
    setRole(null)
    setIsAuthenticated(false)

  }

  useEffect(() => {
    
    if(!isAuthenticated) return

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
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, userId, role }}>
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