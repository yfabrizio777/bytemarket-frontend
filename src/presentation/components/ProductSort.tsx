import { parseSortOption, type SortOption } from '../types/productFilters'

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="product-control product-sort">
      <label htmlFor="product-sort">Ordenar por</label>
      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(parseSortOption(event.target.value))}
      >
        <option value="relevance">Relevancia</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="rating-desc">Mejor valorados</option>
        <option value="name-asc">Nombre: A-Z</option>
      </select>
    </div>
  )
}

export default ProductSort
