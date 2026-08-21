import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'

function Header() {
  const { totalItems } = useCart()

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
