import type { ReactNode } from 'react'
import { CartProvider } from './CartProvider'
import { FavoritesProvider } from './FavoritesProvider'

interface AppProvidersProps {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  )
}

export default AppProviders
