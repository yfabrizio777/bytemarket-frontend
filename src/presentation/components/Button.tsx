import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

function Button({ children, href, variant = 'primary', type = 'button' }: ButtonProps) {
  const className = `button button--${variant}`

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link className={className} to={href}>
          {children}
        </Link>
      )
    }

    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} type={type}>
      {children}
    </button>
  )
}

export default Button
