import type { Product } from '../../domain/entities/Product'
import type { DummyJsonProductDto } from '../dtos/DummyJsonProductDto'

export function mapProductDto(dto: DummyJsonProductDto): Product {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    price: dto.price,
    discountPercentage: dto.discountPercentage,
    rating: dto.rating,
    stock: dto.stock,
    brand: dto.brand,
    sku: dto.sku,
    thumbnail: dto.thumbnail,
    images: dto.images,
  }
}
