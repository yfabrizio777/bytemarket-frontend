import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import { useFavorites } from '../hooks/useFavorites'

function FavoritesPage() {
  const { favorites } = useFavorites()
  const favoriteCount = favorites.length

  return (
    <section className="commerce-page" aria-labelledby="favorites-title">
      <Container>
        <header className="commerce-heading">
          <p className="eyebrow">Tu selección personal</p>
          <h1 id="favorites-title">Favoritos</h1>
          {favoriteCount > 0 && (
            <p>{favoriteCount} {favoriteCount === 1 ? 'producto favorito' : 'productos favoritos'}</p>
          )}
        </header>
        {favoriteCount === 0 ? (
          <EmptyState
            title="Todavía no tienes productos favoritos"
            description="Guarda aquí los dispositivos que quieras comparar o revisar más adelante."
            showCatalogLink
            catalogLinkLabel="Explorar productos"
          />
        ) : (
          <ProductGrid products={favorites} />
        )}
      </Container>
    </section>
  )
}

export default FavoritesPage
