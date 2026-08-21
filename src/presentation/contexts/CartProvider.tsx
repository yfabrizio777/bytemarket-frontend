import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem } from '../../domain/entities/CartItem'
import type { Product } from '../../domain/entities/Product'
import { readCartItems, saveCartItems } from '../../infrastructure/storage/catalogStorage'
import { CartContext, type CartContextValue } from './CartContext'

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(readCartItems)

  useEffect(() => {
    saveCartItems(items)
  }, [items])

  const addItem = useCallback((product: Product) => {
    if (product.stock <= 0) {
      return
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id)

      if (!existingItem) {
        return [...currentItems, { product, quantity: 1 }]
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, product, quantity: Math.min(item.quantity + 1, product.stock) }
          : item,
      )
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
  const contextValue = useMemo<CartContextValue>(() => ({
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [addItem, clearCart, items, removeItem, subtotal, totalItems, updateQuantity])

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
