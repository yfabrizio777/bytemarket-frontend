interface ErrorStateProps {
  onRetry: () => void
  title?: string
  description?: string
}

function ErrorState({
  onRetry,
  title = 'No pudimos cargar el contenido',
  description = 'Hubo un problema al conectar con el servicio. Comprueba tu conexión e inténtalo nuevamente.',
}: ErrorStateProps) {
  return (
    <section className="feedback-state" role="alert">
      <span className="feedback-state__icon" aria-hidden="true">!</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="button button--primary" type="button" onClick={onRetry}>Reintentar</button>
    </section>
  )
}

export default ErrorState
