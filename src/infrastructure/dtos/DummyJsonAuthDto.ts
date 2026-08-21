export interface DummyJsonAuthUserDto {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export interface DummyJsonLoginResponseDto extends DummyJsonAuthUserDto {
  accessToken: string
  refreshToken: string
}
