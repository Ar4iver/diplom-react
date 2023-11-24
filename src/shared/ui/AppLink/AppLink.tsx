import React, { ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/ClassNames'
import cls from './AppLink.module.scss'
import { Link, LinkProps } from 'react-router-dom'

/**
 * Тут theme это тема для ссылок.
 * В любой момент можно сменить дизайн глобально для всех ссылок отсносительно дизайн системы.
 */

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink = (props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props
  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
