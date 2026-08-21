import { Link } from 'react-router-dom'

interface EmptyStateProps {
  showCatalogLink?: boolean
  catalogLinkLabel?: string
  title?: string
  description?: string
}

function EmptyState({
  showCatalogLink = false,
  catalogLinkLabel = 'Volver a Productos',
  title = 'No encontramos productos disponibles',
  description = 'Vuelve a intentarlo más tarde para descubrir nuestra selección tecnológica.',
}: EmptyStateProps) {
  return (
    <section className="feedback-state">
      <span className="feedback-state__icon" aria-hidden="true">○</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {showCatalogLink && <Link className="button button--primary" to="/products">{catalogLinkLabel}</Link>}
    </section>
  )
}

export default EmptyState
