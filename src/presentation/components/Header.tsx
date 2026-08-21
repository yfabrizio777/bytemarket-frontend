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
          <a className="header-action" href="#cuenta" aria-label="Acceder a mi cuenta">
            <span aria-hidden="true">◯</span>
            <span className="header-action__label">Cuenta</span>
          </a>
          <a className="header-action header-action--cart" href="#carrito" aria-label="Carrito, 0 productos">
            <span aria-hidden="true">▱</span>
            <span className="header-action__label">Carrito</span>
            <span className="header-action__count" aria-hidden="true">0</span>
          </a>
        </div>
      </Container>
    </header>
  )
}

export default Header
