import { lazy, useEffect } from 'react'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'

import ProtectedRoute from '@/layout/ProtectedRoute'
import DefaultLayout from '@/layout/Default'
import BlankLayout from '@/layout/Blank'

import OAuthCallback from '@/page/auth/OAuthCallback'
import ErrorBoundary from '@/component/ErrorBoundary'

const Index = lazy( () => import('@/page/Index') )
const Home = lazy( () => import('@/page/home/Home') )
const Login = lazy( () => import('@/page/auth/Login') )
const Error = lazy( () => import('@/page/etc/Error') )

const TestError = lazy( () => import('@/page/test/Error') )

function DefaultFallback({ error }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/Error', { state: { message: error.message } })
  }, [])

  return null
}

function BoundaryLayout() {

  return (
    <ErrorBoundary FallbackComponent={DefaultFallback}>
      <Outlet />
    </ErrorBoundary>
  )

}

export default function Router() {
  
  return (
    <Routes>

      {/* Blank 레이아웃 */}
      <Route element={ <BlankLayout /> }>
        <Route path="/Error" element={ <Error /> } />
      </Route>

      <Route element={ <BoundaryLayout /> }>

        {/* Private Page */}
        <Route element={ <ProtectedRoute /> }>
          <Route element={ <DefaultLayout /> }>
            <Route path="/Home" element={ <Home /> } />
          </Route>
        </Route>

        {/* Public Page */}
        <Route element={ <DefaultLayout /> }>
          <Route path="/" element={ <Index /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="/test">
            <Route path="Error" element={ <TestError /> } />
          </Route>
        </Route>

        <Route path="/auth/OAuthCallback" element={ <OAuthCallback /> } />

      </Route>

    </Routes>
  )
}
