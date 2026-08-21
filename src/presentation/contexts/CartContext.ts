import { createContext } from 'react'
import type { CartItem } from '../../domain/entities/CartItem'
import type { Product } from '../../domain/entities/Product'

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
