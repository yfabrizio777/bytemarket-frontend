import { Link } from 'react-router-dom'

interface LogoProps {
  to?: string
}

function Logo({ to = '/' }: LogoProps) {
  return (
    <Link className="logo" to={to} aria-label="ByteMarket, ir al inicio">
      <span className="logo__mark" aria-hidden="true">
        B
      </span>
      <span>ByteMarket</span>
    </Link>
  )
}

export default Logo
