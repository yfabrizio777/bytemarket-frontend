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
      {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
    </button>
  )
}

export default AddToCartButton
