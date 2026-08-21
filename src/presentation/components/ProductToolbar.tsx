import type {
  CategoryFilter,
  SortOption,
  StockFilter,
} from '../types/productFilters'
import ProductFilters from './ProductFilters'
import ProductSearch from './ProductSearch'
import ProductSort from './ProductSort'

interface ProductToolbarProps {
  searchTerm: string
  category: CategoryFilter
  stock: StockFilter
  sort: SortOption
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: CategoryFilter) => void
  onStockChange: (value: StockFilter) => void
  onSortChange: (value: SortOption) => void
  onClear: () => void
}

function ProductToolbar({
  searchTerm,
  category,
  stock,
  sort,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onStockChange,
  onSortChange,
  onClear,
}: ProductToolbarProps) {
  return (
    <section className="product-toolbar" aria-label="Herramientas del catálogo">
      <div className="product-toolbar__controls">
        <ProductSearch value={searchTerm} onChange={onSearchChange} />
        <ProductFilters
          category={category}
          stock={stock}
          onCategoryChange={onCategoryChange}
          onStockChange={onStockChange}
        />
        <ProductSort value={sort} onChange={onSortChange} />
      </div>
      {hasActiveFilters && (
        <button className="clear-filters" type="button" onClick={onClear}>
          Limpiar filtros
        </button>
      )}
    </section>
  )
}

export default ProductToolbar
