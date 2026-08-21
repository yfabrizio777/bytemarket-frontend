import type { CartItem } from '../../domain/entities/CartItem'
import type { Product } from '../../domain/entities/Product'

const CART_STORAGE_KEY = 'bytemarket_cart'
const FAVORITES_STORAGE_KEY = 'bytemarket_favorites'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.id === 'number'
    && Number.isInteger(value.id)
    && value.id > 0
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && typeof value.category === 'string'
    && typeof value.price === 'number'
    && Number.isFinite(value.price)
    && typeof value.discountPercentage === 'number'
    && Number.isFinite(value.discountPercentage)
    && typeof value.rating === 'number'
    && Number.isFinite(value.rating)
    && typeof value.stock === 'number'
    && Number.isInteger(value.stock)
    && value.stock >= 0
    && (value.brand === undefined || typeof value.brand === 'string')
    && (value.sku === undefined || typeof value.sku === 'string')
    && typeof value.thumbnail === 'string'
    && isStringArray(value.images)
}

function parseStoredValue(key: string): unknown {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? null : JSON.parse(storedValue)
  } catch (error: unknown) {
    console.warn(`ByteMarket ignoró datos corruptos de ${key}.`, error)
    return null
  }
}

function writeStoredValue(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error: unknown) {
    console.warn(`ByteMarket no pudo guardar ${key}.`, error)
  }
}

export function readCartItems(): CartItem[] {
  const storedValue = parseStoredValue(CART_STORAGE_KEY)

  if (!Array.isArray(storedValue)) {
    return []
  }

  const itemsByProductId = new Map<number, CartItem>()

  storedValue.forEach((value: unknown) => {
    if (!isRecord(value) || !isProduct(value.product)) {
      return
    }

    if (!Number.isInteger(value.quantity) || Number(value.quantity) <= 0) {
      return
    }

    const product = value.product

    if (product.stock <= 0) {
      return
    }

    const quantity = Math.min(Number(value.quantity), product.stock)
    const existingItem = itemsByProductId.get(product.id)
    const combinedQuantity = existingItem
      ? Math.min(existingItem.quantity + quantity, product.stock)
      : quantity

    itemsByProductId.set(product.id, { product, quantity: combinedQuantity })
  })

  return [...itemsByProductId.values()]
}

export function saveCartItems(items: CartItem[]): void {
  writeStoredValue(CART_STORAGE_KEY, items)
}

export function readFavorites(): Product[] {
  const storedValue = parseStoredValue(FAVORITES_STORAGE_KEY)

  if (!Array.isArray(storedValue)) {
    return []
  }

  const productsById = new Map<number, Product>()

  storedValue.forEach((value: unknown) => {
    if (isProduct(value)) {
      productsById.set(value.id, value)
    }
  })

  return [...productsById.values()]
}

export function saveFavorites(products: Product[]): void {
  writeStoredValue(FAVORITES_STORAGE_KEY, products)
}
