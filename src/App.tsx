import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.scss'

import Router from '@/router'
import { I18nProvider } from '@/context/I18nContext'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={ queryClient }>

          <I18nProvider>

            <AuthProvider>
              <Router />
            </AuthProvider>

          </I18nProvider>

        </QueryClientProvider>

      </BrowserRouter>
    </>
  )

}

export default App
