import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productRepository } from '../../infrastructure/repositories/productRepository'
import '../../styles/catalog.css'
import Container from '../components/Container'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import FilteredEmptyState from '../components/FilteredEmptyState'
import ProductGrid from '../components/ProductGrid'
import ProductGridSkeleton from '../components/ProductGridSkeleton'
import ProductToolbar from '../components/ProductToolbar'
import { useDebounce } from '../hooks/useDebounce'
import { useProducts } from '../hooks/useProducts'
import {
  parseCategoryFilter,
  parseSortOption,
  type CategoryFilter,
  type SortOption,
  type StockFilter,
} from '../types/productFilters'
import { getCategoryLabel } from '../utils/getCategoryLabel'

function normalizeSearchText(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('es-PE')
}

function ProductsPage() {
  const { products, isLoading, error, retry } = useProducts(productRepository)
  const [searchParams, setSearchParams] = useSearchParams()
  const [stockFilter, setStockFilter] = useState<StockFilter>('all')
  const searchTerm = searchParams.get('q') ?? ''
  const selectedCategory = parseCategoryFilter(searchParams.get('category'))
  const sortOption = parseSortOption(searchParams.get('sort'))
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const hasActiveFilters = Boolean(searchTerm.trim())
    || selectedCategory !== 'all'
    || stockFilter !== 'all'
    || sortOption !== 'relevance'

  const visibleProducts = useMemo(() => {
    const normalizedSearch = normalizeSearchText(debouncedSearchTerm)
    const searchedProducts = normalizedSearch
      ? products.filter((product) => {
        const searchableContent = normalizeSearchText([
          product.title,
          product.brand ?? '',
          getCategoryLabel(product.category),
        ].join(' '))

        return searchableContent.includes(normalizedSearch)
      })
      : products
    const categorizedProducts = selectedCategory === 'all'
      ? searchedProducts
      : searchedProducts.filter((product) => product.category === selectedCategory)
    const availableProducts = categorizedProducts.filter((product) => {
      if (stockFilter === 'available') {
        return product.stock > 0
      }

      if (stockFilter === 'low-stock') {
        return product.stock > 0 && product.stock <= 10
      }

      return true
    })

    if (sortOption === 'relevance') {
      return availableProducts
    }

    const sortedProducts = [...availableProducts]

    switch (sortOption) {
      case 'price-asc':
        return sortedProducts.sort((first, second) => first.price - second.price)
      case 'price-desc':
        return sortedProducts.sort((first, second) => second.price - first.price)
      case 'rating-desc':
        return sortedProducts.sort((first, second) => second.rating - first.rating)
      case 'name-asc':
        return sortedProducts.sort((first, second) =>
          first.title.localeCompare(second.title, 'es', { sensitivity: 'base' }),
        )
    }
  }, [debouncedSearchTerm, products, selectedCategory, sortOption, stockFilter])

  function updateUrlParameter(
    name: 'q' | 'category' | 'sort',
    value: string,
    defaultValue = '',
    replace = false,
  ) {
    const nextParams = new URLSearchParams(searchParams)

    if (!value.trim() || value === defaultValue) {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams, { replace })
  }

  function handleCategoryChange(category: CategoryFilter) {
    updateUrlParameter('category', category, 'all')
  }

  function handleSortChange(sort: SortOption) {
    updateUrlParameter('sort', sort, 'relevance')
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams())
    setStockFilter('all')
  }

  const resultCountLabel = visibleProducts.length === 1
    ? '1 producto encontrado'
    : `${visibleProducts.length} productos encontrados`

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <Container>
        <header className="page-heading">
          <p className="eyebrow">Catálogo ByteMarket</p>
          <h1 id="catalog-title">Tecnología para cada momento</h1>
          <p>Explora smartphones, laptops, tablets y accesorios móviles obtenidos de nuestro catálogo tecnológico.</p>
        </header>
        {isLoading && <ProductGridSkeleton />}
        {!isLoading && error && <ErrorState onRetry={retry} />}
        {!isLoading && !error && products.length === 0 && (
          <EmptyState
            title="No hay productos disponibles"
            description="Vuelve a intentarlo más tarde para descubrir nuestra selección tecnológica."
          />
        )}
        {!isLoading && !error && products.length > 0 && (
          <>
            <ProductToolbar
              searchTerm={searchTerm}
              category={selectedCategory}
              stock={stockFilter}
              sort={sortOption}
              hasActiveFilters={hasActiveFilters}
              onSearchChange={(value) => updateUrlParameter('q', value, '', true)}
              onCategoryChange={handleCategoryChange}
              onStockChange={setStockFilter}
              onSortChange={handleSortChange}
              onClear={clearFilters}
            />
            <div className="catalog-results">
              <p className="catalog-results__count" aria-live="polite">{resultCountLabel}</p>
            </div>
            {visibleProducts.length > 0 ? (
              <ProductGrid products={visibleProducts} />
            ) : (
              <FilteredEmptyState onClear={clearFilters} />
            )}
          </>
        )}
      </Container>
    </section>
  )
}

export default ProductsPage
