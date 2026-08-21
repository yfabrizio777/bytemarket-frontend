function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-hidden="true">
      <span className="skeleton product-card__image" />
      <div className="product-card__content">
        <span className="skeleton skeleton--eyebrow" />
        <span className="skeleton skeleton--title" />
        <span className="skeleton skeleton--text" />
        <span className="skeleton skeleton--price" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
