import { NavLink } from 'react-router-dom'

interface NavItem {
  to?: string
  label: string
}

interface NavbarProps {
  items?: readonly NavItem[]
}

const defaultItems: readonly NavItem[] = [
  { to: '/', label: 'Inicio' },
  { to: '/products', label: 'Productos' },
  { to: '/favorites', label: 'Favoritos' },
]

function Navbar({ items = defaultItems }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="navbar__list">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <NavLink
                className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                end={item.to === '/'}
                to={item.to}
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
