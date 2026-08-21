import type { ProductCategory } from '../value-objects/ProductCategory'

export interface Product {
  id: number
  title: string
  description: string
  category: ProductCategory
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  sku?: string
  thumbnail: string
  images: string[]
}
