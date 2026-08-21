import Container from './Container'
import Logo from './Logo'

const currentYear = new Date().getFullYear()

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
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#categorias">Productos</a></li>
              <li><a href="#favoritos">Favoritos</a></li>
            </ul>
          </nav>
          <section>
            <h2 className="site-footer__title">Categorías</h2>
            <ul className="footer-links">
              <li><a href="#smartphones">Smartphones</a></li>
              <li><a href="#laptops">Laptops</a></li>
              <li><a href="#audio">Audio</a></li>
              <li><a href="#wearables">Wearables</a></li>
            </ul>
          </section>
          <section>
            <h2 className="site-footer__title">Proyecto</h2>
            <p>Proyecto Final de Frontend desarrollado con React y TypeScript.</p>
          </section>
        </div>
        <p className="site-footer__copyright">© {currentYear} ByteMarket. Todos los derechos reservados.</p>
      </Container>
    </footer>
  )
}

export default Footer
