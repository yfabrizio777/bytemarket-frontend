import type { AuthSession } from '../auth/AuthSession'
import type { AuthUser } from '../auth/AuthUser'
import type { LoginCredentials } from '../auth/LoginCredentials'

export interface AuthRepository {
  login(credentials: LoginCredentials, signal?: AbortSignal): Promise<AuthSession>
  getCurrentUser(token: string, signal?: AbortSignal): Promise<AuthUser>
}
