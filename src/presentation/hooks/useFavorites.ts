import { useContext } from 'react'
import {
  FavoritesContext,
  type FavoritesContextValue,
} from '../contexts/FavoritesContext'

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)

  if (context === undefined) {
    throw new Error('useFavorites debe utilizarse dentro de FavoritesProvider')
  }

  return context
}
