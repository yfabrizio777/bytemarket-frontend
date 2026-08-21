import { Link } from 'react-router-dom'
import type { Product } from '../../domain/entities/Product'
import { formatPrice } from '../utils/formatPrice'
import { getCategoryLabel } from '../utils/getCategoryLabel'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card__image-link" to={`/products/${product.id}`} aria-label={`Ver detalle de ${product.title}`}>
        <img className="product-card__image" src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-card__content">
        <p className="product-card__category">{getCategoryLabel(product.category)}</p>
        <h2 className="product-card__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h2>
        <div className="product-card__meta">
          <span aria-label={`Calificación: ${product.rating} de 5`}>★ {product.rating.toFixed(1)}</span>
          <span>{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</span>
        </div>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <Link className="product-card__detail" to={`/products/${product.id}`} aria-label={`Ver detalle de ${product.title}`}>
          Ver detalle <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
