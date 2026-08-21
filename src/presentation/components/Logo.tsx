interface LogoProps {
  href?: string
}

function Logo({ href = '#inicio' }: LogoProps) {
  return (
    <a className="logo" href={href} aria-label="ByteMarket, ir al inicio">
      <span className="logo__mark" aria-hidden="true">
        B
      </span>
      <span>ByteMarket</span>
    </a>
  )
}

export default Logo
