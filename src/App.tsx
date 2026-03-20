import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'

import ProtectedRoute from '@/layout/ProtectedRoute'
import DefaultLayout from '@/layout/Default'

const Index = lazy( () => import('@/page/Index') )
const Home = lazy( () => import('@/page/home/Home') )
const Login = lazy( () => import('@/page/auth/Login') )
const Error = lazy( () => import('@/page/error/Error') )

function App() {

  return (
    <>
      <AuthProvider>

        <BrowserRouter>
          <Routes>

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
              <Route path="/Error" element={ <Error /> } />
              
            </Route>

          </Routes>
        </BrowserRouter>

      </AuthProvider>

    </>
  )

}

export default App
