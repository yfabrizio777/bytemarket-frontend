export type DeliveryMethod = '' | 'standard' | 'pickup'

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  district: string
  city: string
  postalCode: string
  deliveryMethod: DeliveryMethod
}

export type CheckoutTextField = Exclude<keyof CheckoutFormData, 'deliveryMethod'>

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>
