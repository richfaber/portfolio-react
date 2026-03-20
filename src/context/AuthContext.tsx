import React, { createContext, useContext, useState } from 'react'


interface AuthContextType {
  isAuthenticated: boolean,
  refresh: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('accessToken')
  })

  function refresh() {
    setIsAuthenticated(!!localStorage.getItem('accessToken'))
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, refresh }}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth() {

  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth 는 반드시 AuthProvider 안에 있어야 함.')
  
  return context
  
}