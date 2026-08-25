import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function HeaderSearch() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentQuery = location.pathname === '/products'
    ? new URLSearchParams(location.search).get('q') ?? ''
    : ''
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const submittedValue = new FormData(event.currentTarget).get('q')
    const normalizedSearch = typeof submittedValue === 'string'
      ? submittedValue.trim().replace(/\s+/g, ' ')
      : ''
    const params = new URLSearchParams()

    if (normalizedSearch) {
      params.set('q', normalizedSearch)
    }

    navigate({ pathname: '/products', search: params.toString() })
  }

  return (
    <form className="header-search" role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="header-product-search">Buscar productos</label>
      <svg className="header-search__icon" aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        id="header-product-search"
        name="q"
        type="search"
        defaultValue={currentQuery}
        key={currentQuery}
        placeholder="¿Qué estás buscando?"
        autoComplete="off"
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default HeaderSearch
