import type { AuthSession } from '../../domain/auth/AuthSession'
import type { AuthUser } from '../../domain/auth/AuthUser'

const AUTH_STORAGE_KEY = 'bytemarket_auth'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.id === 'number'
    && Number.isInteger(value.id)
    && value.id > 0
    && typeof value.username === 'string'
    && value.username.trim().length > 0
    && typeof value.email === 'string'
    && typeof value.firstName === 'string'
    && typeof value.lastName === 'string'
    && (value.image === undefined || typeof value.image === 'string')
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.token === 'string'
    && value.token.trim().length > 0
    && typeof value.expiresAt === 'number'
    && Number.isFinite(value.expiresAt)
    && isAuthUser(value.user)
}

export function clearAuthSession(): void {
  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error: unknown) {
    console.warn('ByteMarket no pudo eliminar la sesión local.', error)
  }
}

export function readAuthSession(): AuthSession | null {
  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (storedValue === null) {
      return null
    }

    const parsedValue: unknown = JSON.parse(storedValue)

    if (!isAuthSession(parsedValue) || parsedValue.expiresAt <= Date.now()) {
      clearAuthSession()
      return null
    }

    return parsedValue
  } catch (error: unknown) {
    console.warn('ByteMarket ignoró una sesión local corrupta.', error)
    clearAuthSession()
    return null
  }
}

export function saveAuthSession(session: AuthSession): void {
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  } catch (error: unknown) {
    console.warn('ByteMarket no pudo guardar la sesión local.', error)
  }
}
