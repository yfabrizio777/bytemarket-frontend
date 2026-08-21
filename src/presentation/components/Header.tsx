import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'

function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Logo />
        <Navbar />
        <div className="site-header__actions">
          <span className="header-action" aria-label="Cuenta, próximamente">
            <span aria-hidden="true">○</span>
            <span className="header-action__label">Cuenta</span>
          </span>
          <span className="header-action header-action--cart" aria-label="Carrito, 0 productos">
            <span aria-hidden="true">□</span>
            <span className="header-action__label">Carrito</span>
            <span className="header-action__count" aria-hidden="true">0</span>
          </span>
        </div>
      </Container>
    </header>
  )
}

export default Header
