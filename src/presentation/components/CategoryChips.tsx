import type { CategoryFilter } from '../types/productFilters'

interface CategoryChipsProps {
  selectedCategory: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

const categoryChips: ReadonlyArray<{ value: Exclude<CategoryFilter, 'all'>; label: string }> = [
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'mobile-accessories', label: 'Accesorios' },
]

function CategoryChips({ selectedCategory, onChange }: CategoryChipsProps) {
  return (
    <div className="category-chips" aria-label="Categorías rápidas">
      {categoryChips.map((category) => (
        <button
          className={`category-chip${selectedCategory === category.value ? ' category-chip--active' : ''}`}
          type="button"
          aria-pressed={selectedCategory === category.value}
          onClick={() => onChange(selectedCategory === category.value ? 'all' : category.value)}
          key={category.value}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips
