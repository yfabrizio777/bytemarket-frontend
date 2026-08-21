import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AuthSession } from '../../domain/auth/AuthSession'
import type { LoginCredentials } from '../../domain/auth/LoginCredentials'
import { authRepository } from '../../infrastructure/repositories/authRepository'
import {
  clearAuthSession,
  readAuthSession,
  saveAuthSession,
} from '../../infrastructure/storage/authStorage'
import { AuthContext, type AuthContextValue } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(readAuthSession)
  const [isInitializing, setIsInitializing] = useState(session !== null)
  const initialSession = useRef(session)

  const logout = useCallback(() => {
    clearAuthSession()
    setSession(null)
    setIsInitializing(false)
  }, [])

  const login = useCallback(async (
    credentials: LoginCredentials,
    signal?: AbortSignal,
  ) => {
    const authenticatedSession = await authRepository.login(credentials, signal)
    saveAuthSession(authenticatedSession)
    setSession(authenticatedSession)
  }, [])

  useEffect(() => {
    const persistedSession = initialSession.current

    if (persistedSession === null) {
      return
    }

    const controller = new AbortController()

    async function restoreSession(sessionToRestore: AuthSession) {
      try {
        const verifiedUser = await authRepository.getCurrentUser(
          sessionToRestore.token,
          controller.signal,
        )
        const verifiedSession = { ...sessionToRestore, user: verifiedUser }

        saveAuthSession(verifiedSession)
        setSession(verifiedSession)
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        clearAuthSession()
        setSession(null)
      } finally {
        if (!controller.signal.aborted) {
          setIsInitializing(false)
        }
      }
    }

    void restoreSession(persistedSession)

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (session === null) {
      return
    }

    const remainingDuration = session.expiresAt - Date.now()
    const expirationTimeout = window.setTimeout(logout, remainingDuration)

    return () => {
      window.clearTimeout(expirationTimeout)
    }
  }, [logout, session])

  const isAuthenticated = !isInitializing && session !== null
  const contextValue = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    isAuthenticated,
    isInitializing,
    login,
    logout,
  }), [isAuthenticated, isInitializing, login, logout, session?.user])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
