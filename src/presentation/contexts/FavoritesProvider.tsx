import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../../domain/entities/Product'
import { readFavorites, saveFavorites } from '../../infrastructure/storage/catalogStorage'
import { FavoritesContext, type FavoritesContextValue } from './FavoritesContext'

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>(readFavorites)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const addFavorite = useCallback((product: Product) => {
    setFavorites((currentFavorites) =>
      currentFavorites.some((favorite) => favorite.id === product.id)
        ? currentFavorites
        : [...currentFavorites, product],
    )
  }, [])

  const removeFavorite = useCallback((productId: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== productId),
    )
  }, [])

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((currentFavorites) =>
      currentFavorites.some((favorite) => favorite.id === product.id)
        ? currentFavorites.filter((favorite) => favorite.id !== product.id)
        : [...currentFavorites, product],
    )
  }, [])

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.id)),
    [favorites],
  )
  const isFavorite = useCallback(
    (productId: number) => favoriteIds.has(productId),
    [favoriteIds],
  )
  const contextValue = useMemo<FavoritesContextValue>(() => ({
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }), [addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite])

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  )
}
