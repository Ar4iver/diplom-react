import React from 'react'
import './styles/index.scss'
import { useTheme } from 'shared/lib/theme/useTheme'
import { classNames } from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { NavBar } from 'widgets/NavBar'

const App = () => {
  const { theme, toogleTheme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <NavBar />
      <button onClick={toogleTheme}>Сменить тему</button>
      <AppRouter />
    </div>
  )
}

export default App
