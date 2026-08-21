import { createContext } from 'react'
import type { Product } from '../../domain/entities/Product'

export interface FavoritesContextValue {
  favorites: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: number) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)
