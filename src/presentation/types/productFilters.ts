export type CategoryFilter =
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'tablets'
  | 'mobile-accessories'

export type StockFilter = 'all' | 'available' | 'low-stock'

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc'

export function parseCategoryFilter(value: string | null): CategoryFilter {
  switch (value) {
    case 'smartphones':
    case 'laptops':
    case 'tablets':
    case 'mobile-accessories':
      return value
    default:
      return 'all'
  }
}

export function parseStockFilter(value: string): StockFilter {
  switch (value) {
    case 'available':
    case 'low-stock':
      return value
    default:
      return 'all'
  }
}

export function parseSortOption(value: string | null): SortOption {
  switch (value) {
    case 'price-asc':
    case 'price-desc':
    case 'rating-desc':
    case 'name-asc':
      return value
    default:
      return 'relevance'
  }
}
