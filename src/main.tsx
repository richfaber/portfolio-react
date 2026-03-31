import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

if (import.meta.env.DEV) {
  const { default: VConsole } = await import('vconsole')
  new VConsole()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Suspense fallback={null}>
      <App />
    </Suspense>

  </StrictMode>
)