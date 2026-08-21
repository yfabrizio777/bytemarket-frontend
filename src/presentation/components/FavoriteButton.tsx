import type { Product } from '../../domain/entities/Product'
import { useFavorites } from '../hooks/useFavorites'

interface FavoriteButtonProps {
  product: Product
  compact?: boolean
}

function FavoriteButton({ product, compact = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isActive = isFavorite(product.id)
  const label = isActive ? 'Quitar de favoritos' : 'Agregar a favoritos'

  return (
    <button
      className={`favorite-button${isActive ? ' favorite-button--active' : ''}${compact ? ' favorite-button--compact' : ''}`}
      type="button"
      onClick={() => toggleFavorite(product)}
      aria-label={`${label}: ${product.title}`}
      aria-pressed={isActive}
    >
      <span className="favorite-button__icon" aria-hidden="true">♥</span>
      <span>{label}</span>
    </button>
  )
}

export default FavoriteButton
