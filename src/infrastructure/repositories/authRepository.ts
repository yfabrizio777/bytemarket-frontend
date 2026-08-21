import type { AuthRepository } from '../../domain/repositories/AuthRepository'
import { DummyJsonAuthRepository } from './DummyJsonAuthRepository'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured')
}

export const authRepository: AuthRepository = new DummyJsonAuthRepository(apiBaseUrl)
