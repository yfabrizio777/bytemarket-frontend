import { useCallback, useEffect, useState } from 'react'
import type { Product } from '../../domain/entities/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  error: boolean
  retry: () => void
}

export function useProducts(repository: ProductRepository): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError(false)

      try {
        const loadedProducts = await repository.getAll(controller.signal)
        setProducts(loadedProducts)
      } catch (caughtError: unknown) {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return
        }

        setError(true)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      controller.abort()
    }
  }, [repository, requestVersion])

  return { products, isLoading, error, retry }
}
