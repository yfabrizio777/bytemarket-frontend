import { Link } from 'react-router-dom'
import '../../styles/catalog.css'
import Container from '../components/Container'

function NotFoundPage() {
  return (
    <Container className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1>Esta página salió del radar</h1>
      <p>La dirección no existe, pero todavía hay mucha tecnología por descubrir.</p>
      <div className="not-found-page__actions">
        <Link className="button button--primary" to="/">Ir a Inicio</Link>
        <Link className="button button--secondary" to="/products">Ver Productos</Link>
      </div>
    </Container>
  )
}

export default NotFoundPage
