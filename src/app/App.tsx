import React from 'react'
import './styles/index.scss'
import { useTheme } from 'shared/lib/theme/useTheme'
import { classNames } from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { NavBar } from 'widgets/NavBar'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'

const App = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <NavBar />
      <ThemeSwitcher />
      <AppRouter />
    </div>
  )
}

export default App
