export type AuthErrorCode =
  | 'invalid-credentials'
  | 'service-unavailable'
  | 'invalid-session'

export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}
