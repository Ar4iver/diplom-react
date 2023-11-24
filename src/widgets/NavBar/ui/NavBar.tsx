import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'

/**
 * theme={AppLinkTheme.SECONDARY} - это тема для кнопки, которую можно изменить по дизайн системе.
 * В нашем случае определена тема SECONDARY, которую мы инициализировали в AppLink
 */

interface NavbarProps {
  className?: string
}

export const NavBar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
        Главная страница с таймером
      </AppLink>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/statistic'}>
        Страница со статистикой
      </AppLink>
    </div>
  )
}
