import type {
  CheckoutFormData,
  CheckoutFormErrors,
} from './CheckoutForm'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PERU_PHONE_PATTERN = /^9\d{8}$/
const POSTAL_CODE_PATTERN = /^\d{5}$/

export function validateCheckoutForm(data: CheckoutFormData): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {}

  if (data.firstName.trim().length < 2) {
    errors.firstName = 'Ingresa un nombre de al menos 2 caracteres.'
  }

  if (data.lastName.trim().length < 2) {
    errors.lastName = 'Ingresa un apellido válido.'
  }

  if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!PERU_PHONE_PATTERN.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Ingresa un teléfono peruano válido de 9 dígitos.'
  }

  if (data.address.trim().length < 8) {
    errors.address = 'Ingresa una dirección de al menos 8 caracteres.'
  }

  if (data.district.trim().length < 2) {
    errors.district = 'Ingresa tu distrito.'
  }

  if (data.city.trim().length < 2) {
    errors.city = 'Ingresa tu ciudad.'
  }

  if (!POSTAL_CODE_PATTERN.test(data.postalCode.trim())) {
    errors.postalCode = 'Ingresa un código postal válido de 5 dígitos.'
  }

  if (!data.deliveryMethod) {
    errors.deliveryMethod = 'Selecciona un método de entrega.'
  }

  return errors
}
