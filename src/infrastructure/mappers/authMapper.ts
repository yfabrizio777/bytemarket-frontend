import type { AuthUser } from '../../domain/auth/AuthUser'
import type { DummyJsonAuthUserDto } from '../dtos/DummyJsonAuthDto'

export function mapAuthUserDto(dto: DummyJsonAuthUserDto): AuthUser {
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    image: dto.image,
  }
}
