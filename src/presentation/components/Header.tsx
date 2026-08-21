import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'

function Header() {
  const { totalItems } = useCart()
  const { user, isAuthenticated, isInitializing, logout } = useAuth()

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Logo />
        <Navbar />
        <div className="site-header__actions">
          {isInitializing ? (
            <span className="header-action" aria-label="Verificando sesión">
              <span aria-hidden="true">○</span>
              <span className="header-action__label">Verificando...</span>
            </span>
          ) : isAuthenticated && user ? (
            <div className="account-actions">
              <Link className="header-action" to="/profile" aria-label="Ir a mi perfil">
                <span aria-hidden="true">○</span>
                <span className="header-action__label">Hola, {user.firstName}</span>
              </Link>
              <button className="header-logout" type="button" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link className="header-action" to="/login">
              <span aria-hidden="true">○</span>
              <span className="header-action__label">Iniciar sesión</span>
            </Link>
          )}
          <Link
            className="header-action header-action--cart"
            to="/cart"
            aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
          >
            <span aria-hidden="true">□</span>
            <span className="header-action__label">Carrito</span>
            <span className="header-action__count" aria-hidden="true">{totalItems}</span>
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
