import ProductCardSkeleton from './ProductCardSkeleton'

const skeletonItems = [1, 2, 3, 4, 5, 6]

function ProductGridSkeleton() {
  return (
    <div className="product-grid" aria-label="Cargando productos" aria-busy="true">
      {skeletonItems.map((item) => (
        <ProductCardSkeleton key={item} />
      ))}
    </div>
  )
}

export default ProductGridSkeleton
