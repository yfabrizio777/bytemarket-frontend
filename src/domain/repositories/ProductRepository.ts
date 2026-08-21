import type { Product } from '../entities/Product'

export interface ProductRepository {
  getAll(): Promise<Product[]>
  getById(id: number): Promise<Product | null>
}
