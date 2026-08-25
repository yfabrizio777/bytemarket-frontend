import { Link } from 'react-router-dom'
import type { CartItem } from '../../domain/entities/CartItem'
import { formatPrice } from '../utils/formatPrice'
import QuantitySelector from './QuantitySelector'

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const { product, quantity } = item
  const itemSubtotal = product.price * quantity

  return (
    <li className="cart-item">
      <Link className="cart-item__image" to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className="cart-item__info">
        <p className="cart-item__brand">{product.brand ?? 'ByteMarket'}</p>
        <h2><Link to={`/products/${product.id}`}>{product.title}</Link></h2>
        <p>Precio unitario: {formatPrice(product.price)}</p>
        <button
          className="cart-item__remove"
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label={`Eliminar ${product.title} del carrito`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></svg>
          <span>Eliminar</span>
        </button>
      </div>
      <div className="cart-item__quantity">
        <span>Cantidad</span>
        <QuantitySelector
          productTitle={product.title}
          quantity={quantity}
          stock={product.stock}
          onChange={(newQuantity) => onQuantityChange(product.id, newQuantity)}
        />
        <small>Máximo: {product.stock}</small>
      </div>
      <div className="cart-item__subtotal">
        <span>Subtotal</span>
        <strong>{formatPrice(itemSubtotal)}</strong>
      </div>
    </li>
  )
}

export default CartItemRow
