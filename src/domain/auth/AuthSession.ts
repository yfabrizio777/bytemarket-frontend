import type { AuthUser } from './AuthUser'

export interface AuthSession {
  token: string
  user: AuthUser
  expiresAt: number
}
