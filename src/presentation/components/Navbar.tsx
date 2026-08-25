import { NavLink, useLocation } from 'react-router-dom'

interface NavItem {
  to?: string
  label: string
}

interface NavbarProps {
  items?: readonly NavItem[]
  onNavigate?: () => void
}

const defaultItems: readonly NavItem[] = [
  { to: '/products?category=smartphones', label: 'Smartphones' },
  { to: '/products?category=laptops', label: 'Laptops' },
  { to: '/products?category=tablets', label: 'Tablets' },
  { to: '/products?category=mobile-accessories', label: 'Accesorios' },
  { to: '/favorites', label: 'Favoritos' },
  { label: 'Ofertas' },
]

function Navbar({ items = defaultItems, onNavigate }: NavbarProps) {
  const location = useLocation()
  const currentCategory = new URLSearchParams(location.search).get('category')

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="navbar__list">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <NavLink
                className={({ isActive }) => {
                  const itemCategory = new URLSearchParams(item.to?.split('?')[1] ?? '').get('category')
                  const categoryIsActive = Boolean(itemCategory)
                    && location.pathname === '/products'
                    && currentCategory === itemCategory
                  const linkIsActive = itemCategory ? categoryIsActive : isActive

                  return `navbar__link${linkIsActive ? ' navbar__link--active' : ''}`
                }}
                to={item.to}
                onClick={onNavigate}
              >
                {item.label}
              </NavLink>
            ) : (
              <span className="navbar__link navbar__link--disabled" aria-disabled="true">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
