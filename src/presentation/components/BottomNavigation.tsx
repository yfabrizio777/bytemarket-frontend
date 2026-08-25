import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

type BottomNavigationIcon = 'home' | 'products' | 'cart' | 'account'

interface BottomNavigationItemProps {
  to: string
  label: string
  icon: BottomNavigationIcon
  count?: number
  end?: boolean
}

function NavigationIcon({ icon }: { icon: BottomNavigationIcon }) {
  if (icon === 'home') {
    return <path d="m3.5 10.5 8.5-7 8.5 7v9a1 1 0 0 1-1 1h-5v-6h-4v6h-5a1 1 0 0 1-1-1z" />
  }

  if (icon === 'products') {
    return <><path d="M4 7.5 12 3l8 4.5-8 4.5z" /><path d="M4 7.5v9L12 21l8-4.5v-9M12 12v9" /></>
  }

  if (icon === 'cart') {
    return <><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>
  }

  return <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>
}

function BottomNavigationItem({ to, label, icon, count, end }: BottomNavigationItemProps) {
  return (
    <NavLink
      className={({ isActive }) => `bottom-navigation__link${isActive ? ' bottom-navigation__link--active' : ''}`}
      to={to}
      end={end}
      aria-label={typeof count === 'number' ? `${label}, ${count} ${count === 1 ? 'producto' : 'productos'}` : undefined}
    >
      <span className="bottom-navigation__icon">
        <svg aria-hidden="true" viewBox="0 0 24 24"><NavigationIcon icon={icon} /></svg>
        {typeof count === 'number' && count > 0 && (
          <span className="bottom-navigation__count" aria-hidden="true">{count}</span>
        )}
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

function BottomNavigation() {
  const { totalItems } = useCart()
  const { isAuthenticated } = useAuth()

  return (
    <nav className="bottom-navigation" aria-label="Navegación móvil">
      <BottomNavigationItem to="/" label="Inicio" icon="home" end />
      <BottomNavigationItem to="/products" label="Productos" icon="products" />
      <BottomNavigationItem to="/cart" label="Carrito" icon="cart" count={totalItems} />
      <BottomNavigationItem to={isAuthenticated ? '/profile' : '/login'} label="Cuenta" icon="account" />
    </nav>
  )
}

export default BottomNavigation
