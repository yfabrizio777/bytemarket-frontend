import type { CartItem } from '../../domain/entities/CartItem'
import { formatPrice } from '../utils/formatPrice'

interface CheckoutOrderSummaryProps {
  items: CartItem[]
  totalItems: number
  subtotal: number
}

function CheckoutOrderSummary({
  items,
  totalItems,
  subtotal,
}: CheckoutOrderSummaryProps) {
  return (
    <aside className="checkout-summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">Resumen del pedido</h2>
      <ul className="checkout-summary__items">
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt="" />
            <div>
              <strong>{product.title}</strong>
              <span>Cantidad: {quantity}</span>
            </div>
            <span>{formatPrice(product.price * quantity)}</span>
          </li>
        ))}
      </ul>
      <dl className="checkout-totals">
        <div><dt>Productos</dt><dd>{totalItems}</dd></div>
        <div><dt>Costo de envío</dt><dd>Se confirmará al procesar</dd></div>
        <div className="checkout-totals__subtotal"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
      </dl>
      <p className="checkout-payment-note">Pago coordinado al confirmar el pedido. No solicitamos datos de tarjeta.</p>
    </aside>
  )
}

export default CheckoutOrderSummary
