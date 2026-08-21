import { useContext } from 'react'
import { CartContext, type CartContextValue } from '../contexts/CartContext'

export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart debe utilizarse dentro de CartProvider')
  }

  return context
}
