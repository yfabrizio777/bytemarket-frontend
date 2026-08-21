interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="product-control product-search">
      <label htmlFor="product-search">Buscar productos</label>
      <div className="product-search__field">
        <span aria-hidden="true">⌕</span>
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar smartphones, laptops, accesorios..."
          autoComplete="off"
        />
      </div>
    </div>
  )
}

export default ProductSearch
