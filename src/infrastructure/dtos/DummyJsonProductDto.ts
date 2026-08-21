export interface DummyJsonProductDto {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  sku?: string
  thumbnail: string
  images: string[]
}

export interface DummyJsonProductsResponseDto {
  products: DummyJsonProductDto[]
  total: number
  skip: number
  limit: number
}
