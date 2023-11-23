import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'

interface NavBarProps {
  className?: string
}

export const NavBar = ({ className }: NavBarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Link to={'/'}>Главная страница с таймером</Link>
      <Link to={'/statistic'}>Страница со статистикой</Link>
    </div>
  )
}
