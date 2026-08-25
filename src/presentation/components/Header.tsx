import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, isAuthenticated, isInitializing, logout } = useAuth()
  const mobileNavigationId = 'mobile-navigation'

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleMobileLogout = () => {
    closeMenu()
    logout()
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Logo />

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls={mobileNavigationId}
          aria-label={`${isMenuOpen ? 'Cerrar' : 'Abrir'} menú de navegación`}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
          <span>Menú</span>
        </button>

        <div
          id={mobileNavigationId}
          className={`header-navigation${isMenuOpen ? ' header-navigation--open' : ''}`}
        >
          <Navbar onNavigate={closeMenu} />
          <div className="mobile-account-actions">
            {isInitializing ? (
              <span className="mobile-account-actions__status">Verificando sesión...</span>
            ) : isAuthenticated && user ? (
              <>
                <Link className="mobile-account-actions__link" to="/profile" onClick={closeMenu}>
                  Mi cuenta
                </Link>
                <button type="button" className="mobile-account-actions__logout" onClick={handleMobileLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link className="mobile-account-actions__link" to="/login" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>

        <div className="site-header__actions">
          <div className="desktop-account-actions">
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
          </div>
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
