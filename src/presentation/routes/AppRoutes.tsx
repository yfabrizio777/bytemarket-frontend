import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ProductsPage from '../pages/ProductsPage'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import ProtectedRoute from '../components/ProtectedRoute'
import CheckoutPage from '../pages/CheckoutPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={(
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/checkout"
        element={(
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
