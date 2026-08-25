import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import Container from './Container'
import HeaderSearch from './HeaderSearch'
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
      <div className="announcement-bar">
        <Container className="announcement-bar__inner">
          <span>Envíos a todo el Perú · Compra segura y atención personalizada</span>
          <span>ByteMarket 2026</span>
        </Container>
      </div>
      <Container className="site-header__inner">
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
          <span className="sr-only">Menú</span>
        </button>

        <Logo />
        <HeaderSearch />

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
                <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
                <span className="header-action__label">Verificando...</span>
              </span>
            ) : isAuthenticated && user ? (
              <div className="account-actions">
                <Link className="header-action" to="/profile" aria-label="Ir a mi perfil">
                  <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
                  <span className="header-action__label">Hola, {user.firstName}</span>
                </Link>
                <button className="header-logout" type="button" onClick={logout}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link className="header-action" to="/login">
                <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>
                <span className="header-action__label">Iniciar sesión</span>
              </Link>
            )}
          </div>
          <Link
            className="header-action header-action--cart"
            to="/cart"
            aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
            </svg>
            <span className="header-action__label">Carrito</span>
            <span className="header-action__count" aria-hidden="true">{totalItems}</span>
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
