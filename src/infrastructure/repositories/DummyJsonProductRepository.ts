import type { Product } from '../../domain/entities/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'
import type {
  DummyJsonProductDto,
  DummyJsonProductsResponseDto,
} from '../dtos/DummyJsonProductDto'
import {
  isTechnologyCategory,
  technologyCategories,
} from '../config/technologyCategories'
import { mapProductDto } from '../mappers/productMapper'

export class DummyJsonProductRepository implements ProductRepository {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getAll(signal?: AbortSignal): Promise<Product[]> {
    const categoryResponses = await Promise.all(
      technologyCategories.map((category) =>
        fetch(`${this.baseUrl}/products/category/${category}?limit=0`, { signal }),
      ),
    )

    if (categoryResponses.some((response) => !response.ok)) {
      throw new Error('Products request failed')
    }

    const categoryData = await Promise.all(
      categoryResponses.map(async (response): Promise<DummyJsonProductsResponseDto> =>
        response.json(),
      ),
    )
    const productsById = new Map<number, Product>()

    categoryData.forEach(({ products }) => {
      products.map(mapProductDto).forEach((product) => {
        productsById.set(product.id, product)
      })
    })

    return [...productsById.values()]
  }

  async getById(id: number, signal?: AbortSignal): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/products/${id}`, { signal })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error('Product request failed')
    }

    const data: DummyJsonProductDto = await response.json()
    const product = mapProductDto(data)

    return isTechnologyCategory(product.category) ? product : null
  }
}
