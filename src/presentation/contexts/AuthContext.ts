import { createContext } from 'react'
import type { AuthUser } from '../../domain/auth/AuthUser'
import type { LoginCredentials } from '../../domain/auth/LoginCredentials'

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (credentials: LoginCredentials, signal?: AbortSignal) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
