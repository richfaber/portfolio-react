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
const I18n = lazy( () => import('@/page/test/I18n') )
const I18nReact = lazy( () => import('@/page/test/I18nReact') )

const ButtonPage = lazy( () => import('@/page/test/ButtonPage') )

const Zustand = lazy( () => import('@/page/test/Zustand') )


function DefaultFallback({ error }) {

  const navigate = useNavigate()

  useEffect(() => {

    navigate('/Error', { state: { message: error.message } })

  }, [])

  return null
}

function ErrorBoundaryLayer() {

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

      <Route element={ <ErrorBoundaryLayer /> }>

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
            <Route path="I18n" element={ <I18n /> } />
            <Route path="I18nReact" element={ <I18nReact /> } />
            <Route path="Button" element={ <ButtonPage /> } />

            <Route path="Zustand" element={ <Zustand /> } />
            
          </Route>
        </Route>

        <Route path="/auth/OAuthCallback" element={ <OAuthCallback /> } />

      </Route>

    </Routes>
  )
}
