import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProtectedRoute from '../components/ProtectedRoute'
import RouteLoadingFallback from '../components/RouteLoadingFallback'

const ProductsPage = lazy(() => import('../pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={(
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ProtectedRoute>
          )}
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
