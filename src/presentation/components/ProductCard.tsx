import { Link } from 'react-router-dom'
import type { Product } from '../../domain/entities/Product'
import { formatPrice } from '../utils/formatPrice'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const roundedDiscount = Math.round(product.discountPercentage)
  const stockLabel = product.stock > 10
    ? 'Stock disponible'
    : product.stock > 0
      ? `¡Últimas ${product.stock} unidades!`
      : 'Sin stock'
  const stockModifier = product.stock > 10 ? 'available' : product.stock > 0 ? 'low' : 'empty'

  return (
    <article className="product-card">
      {roundedDiscount > 0 && <span className="product-card__discount">-{roundedDiscount}%</span>}
      <FavoriteButton product={product} compact />
      <Link className="product-card__image-link" to={`/products/${product.id}`} aria-label={`Ver detalle de ${product.title}`}>
        <img className="product-card__image" src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-card__content">
        <p className="product-card__brand">{product.brand ?? getCategoryLabel(product.category)}</p>
        <h2 className="product-card__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h2>
        <div className="product-card__meta">
          <span aria-label={`Calificación: ${product.rating} de 5`}>★ {product.rating.toFixed(1)}</span>
          <span className={`product-card__stock product-card__stock--${stockModifier}`}>{stockLabel}</span>
        </div>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <div className="product-card__actions">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
