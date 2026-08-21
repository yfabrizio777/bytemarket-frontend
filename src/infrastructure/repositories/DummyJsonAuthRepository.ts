import { AuthError } from '../../domain/auth/AuthError'
import type { AuthSession } from '../../domain/auth/AuthSession'
import type { AuthUser } from '../../domain/auth/AuthUser'
import type { LoginCredentials } from '../../domain/auth/LoginCredentials'
import type { AuthRepository } from '../../domain/repositories/AuthRepository'
import type {
  DummyJsonAuthUserDto,
  DummyJsonLoginResponseDto,
} from '../dtos/DummyJsonAuthDto'
import { createAuthorizationHeaders } from '../http/authHeaders'
import { mapAuthUserDto } from '../mappers/authMapper'

const SESSION_DURATION_MINUTES = 30
const SESSION_DURATION_MS = SESSION_DURATION_MINUTES * 60 * 1000

export class DummyJsonAuthRepository implements AuthRepository {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async login(
    credentials: LoginCredentials,
    signal?: AbortSignal,
  ): Promise<AuthSession> {
    let response: Response

    try {
      response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          expiresInMins: SESSION_DURATION_MINUTES,
        }),
        signal,
      })
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }

      throw new AuthError('service-unavailable', 'Authentication service unavailable')
    }

    if (response.status === 400 || response.status === 401) {
      throw new AuthError('invalid-credentials', 'Invalid credentials')
    }

    if (!response.ok) {
      throw new AuthError('service-unavailable', 'Authentication request failed')
    }

    const loginData: DummyJsonLoginResponseDto = await response.json()
    const user = await this.getCurrentUser(loginData.accessToken, signal)

    return {
      token: loginData.accessToken,
      user,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    }
  }

  async getCurrentUser(token: string, signal?: AbortSignal): Promise<AuthUser> {
    let response: Response

    try {
      response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: createAuthorizationHeaders(token),
        signal,
      })
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }

      throw new AuthError('service-unavailable', 'Session verification unavailable')
    }

    if (response.status === 401 || response.status === 403) {
      throw new AuthError('invalid-session', 'Invalid session')
    }

    if (!response.ok) {
      throw new AuthError('service-unavailable', 'Session verification failed')
    }

    const userData: DummyJsonAuthUserDto = await response.json()
    return mapAuthUserDto(userData)
  }
}
