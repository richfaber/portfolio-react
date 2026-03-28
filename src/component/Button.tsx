import type React from 'react'
import { Link } from 'react-router-dom'

import style from '@/component/Button.module.scss'

export type LinkButton = {
  type: 'link'
  href: string
}

export type NormalButton = {
  type: 'button' | 'submit' | 'reset'
  href?: never
}

type ButtonVariant = LinkButton | NormalButton

export type ButtonProps = ButtonVariant & React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode
  disabled?: boolean
}

export default function Button({ children, type, href, className, ...rest }: ButtonProps) {

  if (type === 'link') {
    return <Link to={ href as string } className={ `${ style.button } ${ className ?? '' }`.trim() } { ...rest }>{ children }</Link>
  }

  return (
    <button type={ type } className={ `${ style.button } ${ className ?? '' }`.trim() } { ...rest }>{ children }</button>
  )

}