import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return (
      <section className="session-loading" aria-live="polite" aria-busy="true">
        <span className="session-loading__spinner" aria-hidden="true" />
        <p>Verificando sesión...</p>
      </section>
    )
  }

  if (!isAuthenticated) {
    const originalDestination = `${location.pathname}${location.search}`
    return <Navigate to="/login" replace state={{ from: originalDestination }} />
  }

  return children
}

export default ProtectedRoute
