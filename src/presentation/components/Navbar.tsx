interface NavItem {
  href: string
  label: string
}

interface NavbarProps {
  items?: readonly NavItem[]
}

const defaultItems: readonly NavItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#categorias', label: 'Productos' },
  { href: '#favoritos', label: 'Favoritos' },
]

function Navbar({ items = defaultItems }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="navbar__list">
        {items.map((item) => (
          <li key={item.label}>
            <a className="navbar__link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
