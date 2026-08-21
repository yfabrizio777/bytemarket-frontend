import type { ReactNode } from 'react'
import { CartProvider } from './CartProvider'
import { FavoritesProvider } from './FavoritesProvider'
import { AuthProvider } from './AuthProvider'

interface AppProvidersProps {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default AppProviders
