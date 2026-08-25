function RouteLoadingFallback() {
  return (
    <div className="route-loading" role="status" aria-busy="true">
      <div className="route-loading__mark" aria-hidden="true">B</div>
      <div>
        <strong>Preparando ByteMarket</strong>
        <p>Cargando la experiencia...</p>
      </div>
      <span className="route-loading__bar" aria-hidden="true" />
    </div>
  )
}

export default RouteLoadingFallback
