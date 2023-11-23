import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from 'shared/lib/theme/ThemeContext'
import React, { ReactNode, useMemo, useState } from 'react'

interface ThemeProviderProps {
  children?: ReactNode
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  //На каждый рендер компонента у нас будет инициализироваться обьект, и чтобы этого избежать применяем useMemo,
  //чтобы сохранить значение этого обьекта и возвращать его если из массива зависимостей ничего не изменилось.
  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
