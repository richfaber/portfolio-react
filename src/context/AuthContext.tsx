import React, { createContext, useContext, useState } from 'react'
import { getToken, signIn as authSignIn, signOut as authSignOut } from '@/lib/auth'

interface AuthContextType {
  isAuthenticated: boolean,
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken())

  function signIn() {
    authSignIn()
    setIsAuthenticated(true)
  }

  function signOut() {
    authSignOut()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth() {

  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth 는 반드시 AuthProvider 안에서 사용 되어야 함.')
  
  return context

}