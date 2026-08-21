import { Link, useParams } from 'react-router-dom'
import { productRepository } from '../../infrastructure/repositories/productRepository'
import '../../styles/catalog.css'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { useProduct } from '../hooks/useProduct'
import { formatPrice } from '../utils/formatPrice'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import AddToCartButton from '../components/AddToCartButton'
import FavoriteButton from '../components/FavoriteButton'

function ProductDetailPage() {
  const { id } = useParams()
  const parsedId = Number(id)
  const productId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null

  if (productId === null) {
    return (
      <Container className="product-detail-page">
        <EmptyState
          title="Producto no disponible"
          description="Este producto no existe o no pertenece al catálogo tecnológico de ByteMarket."
          showCatalogLink
        />
      </Container>
    )
  }

  return <ProductDetailContent productId={productId} />
}

interface ProductDetailContentProps {
  productId: number
}

function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const { product, isLoading, error, retry } = useProduct(productId, productRepository)

  if (isLoading) {
    return (
      <Container className="product-detail-page">
        <div className="product-detail-skeleton" aria-label="Cargando detalle del producto" aria-busy="true">
          <span className="skeleton product-detail-skeleton__image" />
          <div>
            <span className="skeleton skeleton--eyebrow" />
            <span className="skeleton product-detail-skeleton__title" />
            <span className="skeleton skeleton--text" />
            <span className="skeleton skeleton--price" />
          </div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="product-detail-page">
        <ErrorState
          title="No pudimos encontrar este producto"
          description="La dirección puede ser incorrecta o el servicio no está disponible en este momento."
          onRetry={retry}
        />
        <Link className="back-link" to="/products">← Volver a Productos</Link>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="product-detail-page">
        <EmptyState
          title="Producto no disponible"
          description="Este producto no existe o no pertenece al catálogo tecnológico de ByteMarket."
          showCatalogLink
        />
      </Container>
    )
  }

  const galleryImages = product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <article className="product-detail-page">
      <Container>
        <Link className="back-link" to="/products">← Volver a Productos</Link>
        <div className="product-detail">
          <section className="product-gallery" aria-label={`Imágenes de ${product.title}`}>
            <div className="product-gallery__main">
              <img src={galleryImages[0]} alt={product.title} />
            </div>
            {galleryImages.length > 1 && (
              <div className="product-gallery__thumbnails">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <img src={image} alt={`${product.title}, vista ${index + 1}`} key={image} loading="lazy" />
                ))}
              </div>
            )}
          </section>
          <section className="product-detail__content" aria-labelledby="product-title">
            <p className="eyebrow">{getCategoryLabel(product.category)}</p>
            <h1 id="product-title">{product.title}</h1>
            <div className="product-detail__rating">
              <span aria-hidden="true">★</span>
              <span>{product.rating.toFixed(1)} de 5</span>
            </div>
            <p className="product-detail__description">{product.description}</p>
            <p className="product-detail__price">{formatPrice(product.price)}</p>
            {product.discountPercentage > 0 && (
              <p className="product-detail__discount">{product.discountPercentage.toFixed(1)}% de descuento</p>
            )}
            <dl className="product-specs">
              <div><dt>Disponibilidad</dt><dd>{product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}</dd></div>
              {product.brand && <div><dt>Marca</dt><dd>{product.brand}</dd></div>}
              {product.sku && <div><dt>SKU</dt><dd>{product.sku}</dd></div>}
            </dl>
            <div className="product-detail__actions">
              <AddToCartButton product={product} />
              <FavoriteButton product={product} />
            </div>
          </section>
        </div>
      </Container>
    </article>
  )
}

export default ProductDetailPage
