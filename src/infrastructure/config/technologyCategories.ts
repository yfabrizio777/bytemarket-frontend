export const technologyCategories = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
] as const

const technologyCategorySet = new Set<string>(technologyCategories)

export function isTechnologyCategory(category: string): boolean {
  return technologyCategorySet.has(category)
}
