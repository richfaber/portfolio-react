import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)