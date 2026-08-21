import Container from '../components/Container'
import CartItemRow from '../components/CartItemRow'
import CartSummary from '../components/CartSummary'
import EmptyState from '../components/EmptyState'
import { useCart } from '../hooks/useCart'

function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart()
  const cartIsEmpty = items.length === 0

  function handleClearCart() {
    if (window.confirm('¿Deseas eliminar todos los productos del carrito?')) {
      clearCart()
    }
  }

  return (
    <section className="commerce-page" aria-labelledby="cart-title">
      <Container>
        <header className="commerce-heading">
          <p className="eyebrow">Tu selección</p>
          <h1 id="cart-title">Carrito</h1>
          {!cartIsEmpty && <p>{totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito</p>}
        </header>
        {cartIsEmpty ? (
          <EmptyState
            title="Tu carrito está vacío"
            description="Explora el catálogo y agrega los productos que quieres llevar contigo."
            showCatalogLink
            catalogLinkLabel="Explorar productos"
          />
        ) : (
          <div className="cart-layout">
            <ul className="cart-items" aria-label="Productos del carrito">
              {items.map((item) => (
                <CartItemRow
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                  key={item.product.id}
                />
              ))}
            </ul>
            <CartSummary
              totalItems={totalItems}
              subtotal={subtotal}
              onClear={handleClearCart}
            />
          </div>
        )}
      </Container>
    </section>
  )
}

export default CartPage
