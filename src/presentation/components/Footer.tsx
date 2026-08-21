import { Link } from 'react-router-dom'
import Container from './Container'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <section className="site-footer__brand" aria-label="Acerca de ByteMarket">
            <Logo />
            <p>Tecnología seleccionada para acompañar tu día a día.</p>
          </section>
          <nav aria-label="Navegación del pie de página">
            <h2 className="site-footer__title">Explorar</h2>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/products">Productos</Link></li>
              <li><span>Favoritos</span></li>
            </ul>
          </nav>
          <section>
            <h2 className="site-footer__title">Categorías</h2>
            <ul className="footer-links">
              <li><Link to="/products">Smartphones</Link></li>
              <li><Link to="/products">Laptops</Link></li>
              <li><Link to="/products">Tablets</Link></li>
              <li><Link to="/products">Accesorios móviles</Link></li>
            </ul>
          </section>
          <section>
            <h2 className="site-footer__title">Proyecto</h2>
            <p>Proyecto Final de Frontend desarrollado con React y TypeScript.</p>
          </section>
        </div>
        <p className="site-footer__copyright">© 2026 ByteMarket. By Fabrizio Alamo. Todos los derechos reservados.</p>
      </Container>
    </footer>
  )
}

export default Footer
