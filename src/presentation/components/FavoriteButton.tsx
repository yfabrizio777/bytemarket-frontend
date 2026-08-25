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
      <span className="favorite-button__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" /></svg>
      </span>
      <span>{label}</span>
    </button>
  )
}

export default FavoriteButton
