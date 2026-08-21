interface FilteredEmptyStateProps {
  onClear: () => void
}

function FilteredEmptyState({ onClear }: FilteredEmptyStateProps) {
  return (
    <section className="feedback-state">
      <span className="feedback-state__icon" aria-hidden="true">⌕</span>
      <h2>No encontramos productos con estos criterios</h2>
      <p>Prueba con otra búsqueda o restablece los filtros para ver todo el catálogo.</p>
      <button className="button button--primary" type="button" onClick={onClear}>
        Limpiar filtros
      </button>
    </section>
  )
}

export default FilteredEmptyState
