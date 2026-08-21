import { formatPrice } from '../utils/formatPrice'

interface CartSummaryProps {
  totalItems: number
  subtotal: number
  onClear: () => void
}

function CartSummary({ totalItems, subtotal, onClear }: CartSummaryProps) {
  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Resumen del carrito</h2>
      <dl>
        <div>
          <dt>Productos</dt>
          <dd>{totalItems}</dd>
        </div>
        <div className="cart-summary__total">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
      </dl>
      <p id="checkout-notice">El envío se calculará en el checkout.</p>
      <button
        className="button button--primary cart-summary__checkout"
        type="button"
        disabled
        aria-describedby="checkout-notice"
      >
        Continuar con la compra (próximamente)
      </button>
      <button className="cart-summary__clear" type="button" onClick={onClear}>
        Vaciar carrito
      </button>
    </aside>
  )
}

export default CartSummary
