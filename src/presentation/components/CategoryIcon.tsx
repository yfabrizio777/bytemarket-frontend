import type { CategoryFilter } from '../types/productFilters'

interface CategoryIconProps {
  category: Exclude<CategoryFilter, 'all'>
}

function CategoryIcon({ category }: CategoryIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      {category === 'smartphones' && <><rect x="9" y="3" width="14" height="26" rx="3" /><path d="M14 25h4" /></>}
      {category === 'laptops' && <><rect x="5" y="5" width="22" height="16" rx="2" /><path d="M2.5 25h27M11 25l1-4h8l1 4" /></>}
      {category === 'tablets' && <><rect x="6" y="3" width="20" height="26" rx="3" /><circle cx="16" cy="25" r="1" /></>}
      {category === 'mobile-accessories' && <><path d="M10 20v-8a6 6 0 0 1 12 0v8" /><rect x="6" y="17" width="5" height="9" rx="2" /><rect x="21" y="17" width="5" height="9" rx="2" /></>}
    </svg>
  )
}

export default CategoryIcon
