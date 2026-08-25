import ProductCardSkeleton from './ProductCardSkeleton'

interface ProductGridSkeletonProps {
  count?: number
}

function ProductGridSkeleton({ count = 6 }: ProductGridSkeletonProps) {
  const skeletonItems = Array.from({ length: count }, (_, index) => index)
  return (
    <div className="product-grid" aria-label="Cargando productos" aria-busy="true">
      {skeletonItems.map((item) => (
        <ProductCardSkeleton key={item} />
      ))}
    </div>
  )
}

export default ProductGridSkeleton
