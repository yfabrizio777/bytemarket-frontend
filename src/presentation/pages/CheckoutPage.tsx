import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { AuthUser } from '../../domain/auth/AuthUser'
import type {
  CheckoutFormData,
  CheckoutFormErrors,
  CheckoutTextField,
  DeliveryMethod,
} from '../../application/checkout/CheckoutForm'
import { validateCheckoutForm } from '../../application/checkout/checkoutValidation'
import '../../styles/checkout.css'
import CheckoutField from '../components/CheckoutField'
import CheckoutOrderSummary from '../components/CheckoutOrderSummary'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { createOrderNumber } from '../utils/createOrderNumber'

function createInitialFormData(user: AuthUser | null): CheckoutFormData {
  return {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: '',
    address: '',
    district: '',
    city: '',
    postalCode: '',
    deliveryMethod: '',
  }
}

function CheckoutPage() {
  const { user } = useAuth()
  const { items, totalItems, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState<CheckoutFormData>(() =>
    createInitialFormData(user),
  )
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const confirmationTimeout = useRef<number | null>(null)
  const cartIsEmpty = items.length === 0

  useEffect(() => () => {
    if (confirmationTimeout.current !== null) {
      window.clearTimeout(confirmationTimeout.current)
    }
  }, [])

  function updateTextField(name: CheckoutTextField, value: string) {
    setFormData((currentData) => ({ ...currentData, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    }
  }

  function validateField(name: keyof CheckoutFormData) {
    const fieldError = validateCheckoutForm(formData)[name]
    setErrors((currentErrors) => ({ ...currentErrors, [name]: fieldError }))
  }

  function updateDeliveryMethod(deliveryMethod: DeliveryMethod) {
    setFormData((currentData) => ({ ...currentData, deliveryMethod }))
    setErrors((currentErrors) => ({ ...currentErrors, deliveryMethod: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isProcessing || cartIsEmpty) {
      return
    }

    const validationErrors = validateCheckoutForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsProcessing(true)
    confirmationTimeout.current = window.setTimeout(() => {
      setOrderNumber(createOrderNumber())
      clearCart()
      setIsProcessing(false)
      confirmationTimeout.current = null
    }, 600)
  }

  if (orderNumber) {
    return (
      <section className="checkout-page">
        <Container>
          <div className="order-confirmation" role="status">
            <span className="order-confirmation__icon" aria-hidden="true">✓</span>
            <p className="eyebrow">Pedido {orderNumber}</p>
            <h1>¡Pedido confirmado!</h1>
            <p>Gracias por comprar en ByteMarket. Conserva el número del pedido como referencia.</p>
            <Link className="button button--primary" to="/products">Seguir explorando</Link>
          </div>
        </Container>
      </section>
    )
  }

  if (cartIsEmpty) {
    return (
      <section className="checkout-page">
        <Container>
          <EmptyState
            title="Tu carrito está vacío"
            description="Agrega productos antes de iniciar el checkout."
            showCatalogLink
            catalogLinkLabel="Explorar productos"
          />
        </Container>
      </section>
    )
  }

  return (
    <section className="checkout-page" aria-labelledby="checkout-title">
      <Container>
        <header className="checkout-heading">
          <p className="eyebrow">Finaliza tu pedido</p>
          <h1 id="checkout-title">Checkout</h1>
          <p>Completa los datos de entrega. No solicitamos información financiera.</p>
        </header>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Datos de contacto y entrega</legend>
              <div className="checkout-form__grid">
                <CheckoutField name="firstName" label="Nombre" value={formData.firstName} error={errors.firstName} autoComplete="given-name" onChange={updateTextField} onBlur={validateField} />
                <CheckoutField name="lastName" label="Apellido" value={formData.lastName} error={errors.lastName} autoComplete="family-name" onChange={updateTextField} onBlur={validateField} />
                <CheckoutField name="email" label="Correo electrónico" value={formData.email} error={errors.email} type="email" inputMode="email" autoComplete="email" onChange={updateTextField} onBlur={validateField} />
                <CheckoutField name="phone" label="Teléfono" value={formData.phone} error={errors.phone} type="tel" inputMode="tel" autoComplete="tel" onChange={updateTextField} onBlur={validateField} />
                <div className="checkout-form__wide">
                  <CheckoutField name="address" label="Dirección" value={formData.address} error={errors.address} autoComplete="street-address" onChange={updateTextField} onBlur={validateField} />
                </div>
                <CheckoutField name="district" label="Distrito" value={formData.district} error={errors.district} autoComplete="address-level3" onChange={updateTextField} onBlur={validateField} />
                <CheckoutField name="city" label="Ciudad" value={formData.city} error={errors.city} autoComplete="address-level2" onChange={updateTextField} onBlur={validateField} />
                <CheckoutField name="postalCode" label="Código postal" value={formData.postalCode} error={errors.postalCode} inputMode="numeric" autoComplete="postal-code" onChange={updateTextField} onBlur={validateField} />
              </div>
            </fieldset>
            <fieldset
              className="delivery-methods"
              aria-invalid={Boolean(errors.deliveryMethod)}
              aria-describedby={errors.deliveryMethod ? 'delivery-method-error' : undefined}
            >
              <legend>Método de entrega</legend>
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="standard"
                  checked={formData.deliveryMethod === 'standard'}
                  onChange={() => updateDeliveryMethod('standard')}
                />
                <span><strong>Entrega estándar</strong><small>El plazo se confirmará al procesar el pedido.</small></span>
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={() => updateDeliveryMethod('pickup')}
                />
                <span><strong>Recojo en tienda</strong><small>Coordinaremos el punto de recojo al confirmar.</small></span>
              </label>
              {errors.deliveryMethod && (
                <span className="checkout-field__error" id="delivery-method-error">
                  {errors.deliveryMethod}
                </span>
              )}
            </fieldset>
            <button className="button button--primary checkout-submit" type="submit" disabled={isProcessing}>
              {isProcessing ? 'Procesando pedido...' : 'Confirmar pedido'}
            </button>
          </form>
          <CheckoutOrderSummary items={items} totalItems={totalItems} subtotal={subtotal} />
        </div>
      </Container>
    </section>
  )
}

export default CheckoutPage
