import { productRepository } from '../../infrastructure/repositories/productRepository'
import '../../styles/catalog.css'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import ProductGrid from '../components/ProductGrid'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import { useProducts } from '../hooks/useProducts'

function ProductsPage() {
  const { products, isLoading, error, retry } = useProducts(productRepository)

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <Container>
        <header className="page-heading">
          <p className="eyebrow">Catálogo ByteMarket</p>
          <h1 id="catalog-title">Tecnología para cada momento</h1>
          <p>Explora smartphones, laptops, tablets y accesorios móviles obtenidos de nuestro catálogo tecnológico.</p>
          {!isLoading && !error && (
            <p className="page-heading__count" aria-live="polite">{products.length} productos</p>
          )}
        </header>
        {isLoading && <ProductGridSkeleton />}
        {!isLoading && error && <ErrorState onRetry={retry} />}
        {!isLoading && !error && products.length === 0 && <EmptyState />}
        {!isLoading && !error && products.length > 0 && <ProductGrid products={products} />}
      </Container>
    </section>
  )
}

export default ProductsPage
