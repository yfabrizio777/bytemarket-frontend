import { useCallback, useEffect, useState } from 'react'
import type { Product } from '../../domain/entities/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

interface UseProductResult {
  product: Product | null
  isLoading: boolean
  error: boolean
  retry: () => void
}

export function useProduct(
  id: number,
  repository: ProductRepository,
): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      setIsLoading(true)
      setError(false)
      setProduct(null)

      try {
        const loadedProduct = await repository.getById(id, controller.signal)
        setProduct(loadedProduct)
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

    void loadProduct()

    return () => {
      controller.abort()
    }
  }, [id, repository, requestVersion])

  return { product, isLoading, error, retry }
}
