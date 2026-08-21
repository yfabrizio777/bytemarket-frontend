import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  as?: ElementType
  children: ReactNode
  className?: string
}

function Container({ as: Component = 'div', children, className = '' }: ContainerProps) {
  const classes = ['container', className].filter(Boolean).join(' ')

  return <Component className={classes}>{children}</Component>
}

export default Container
