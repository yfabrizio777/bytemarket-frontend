export function createAuthorizationHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
  }
}
