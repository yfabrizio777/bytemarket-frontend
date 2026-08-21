import type { Product } from '../entities/Product'

export interface ProductRepository {
  getAll(signal?: AbortSignal): Promise<Product[]>
  getById(id: number, signal?: AbortSignal): Promise<Product | null>
}
