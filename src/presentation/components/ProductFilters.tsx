import {
  parseCategoryFilter,
  parseStockFilter,
  type CategoryFilter,
  type StockFilter,
} from '../types/productFilters'

interface ProductFiltersProps {
  category: CategoryFilter
  stock: StockFilter
  onCategoryChange: (category: CategoryFilter) => void
  onStockChange: (stock: StockFilter) => void
}

function ProductFilters({
  category,
  stock,
  onCategoryChange,
  onStockChange,
}: ProductFiltersProps) {
  return (
    <div className="product-filters">
      <div className="product-control">
        <label htmlFor="category-filter">Categoría</label>
        <select
          id="category-filter"
          value={category}
          onChange={(event) => onCategoryChange(parseCategoryFilter(event.target.value))}
        >
          <option value="all">Todas</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="tablets">Tablets</option>
          <option value="mobile-accessories">Accesorios móviles</option>
        </select>
      </div>
      <div className="product-control">
        <label htmlFor="stock-filter">Disponibilidad</label>
        <select
          id="stock-filter"
          value={stock}
          onChange={(event) => onStockChange(parseStockFilter(event.target.value))}
        >
          <option value="all">Todos</option>
          <option value="available">Disponibles</option>
          <option value="low-stock">Poco stock</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilters
