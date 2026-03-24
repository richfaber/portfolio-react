import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import type { ErrorBoundaryProps } from 'react-error-boundary'

export default function ErrorBoundary({ children, ...props }: ErrorBoundaryProps ) {
  return (
    <ReactErrorBoundary { ...props }>
      { children }
    </ReactErrorBoundary>
  )
}