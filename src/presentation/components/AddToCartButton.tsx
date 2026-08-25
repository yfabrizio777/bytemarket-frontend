import type { Product } from '../../domain/entities/Product'
import { useCart } from '../hooks/useCart'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const classes = ['add-to-cart-button', className].filter(Boolean).join(' ')
  const isOutOfStock = product.stock <= 0

  return (
    <button
      className={classes}
      type="button"
      onClick={() => addItem(product)}
      disabled={isOutOfStock}
      aria-label={isOutOfStock ? `${product.title} sin stock` : `Agregar ${product.title} al carrito`}
    >
      {!isOutOfStock && (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
          <path d="M12 9v4M10 11h4" />
        </svg>
      )}
      {isOutOfStock ? 'Sin stock' : (
        <><span className="add-to-cart-button__short">Agregar</span><span className="add-to-cart-button__wide">Agregar al carrito</span></>
      )}
    </button>
  )
}

export default AddToCartButton
