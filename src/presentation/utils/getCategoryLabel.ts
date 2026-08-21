import type { ProductCategory } from '../../domain/value-objects/ProductCategory'

const categoryLabels: Readonly<Record<string, string>> = {
  smartphones: 'Smartphones',
  laptops: 'Laptops',
  tablets: 'Tablets',
  'mobile-accessories': 'Accesorios móviles',
}

export function getCategoryLabel(category: ProductCategory): string {
  return categoryLabels[category] ?? category
}
