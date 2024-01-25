import React, { useState } from 'react'
import { useTheme } from 'shared/lib/theme/useTheme'
import { AppRouter } from './providers/router'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { Layout } from 'shared/layout'
import SettingsContext from './providers/context/SettingsContext'

const App = () => {
	const { theme } = useTheme()
	const [workMinutes, setWorkMinutes] = useState(7)
	const [shortBreak, setShortBreak] = useState(3)
	const [longBreak, setLongBreak] = useState(60)

	return (
		<div className={classNames('app', {}, [theme])}>
			<SettingsContext.Provider
				value={{
					workMinutes,
					shortBreak,
					longBreak,
					setWorkMinutes,
					setLongBreak,
					setShortBreak,
				}}
			>
				<Layout header={<Header />} content={<AppRouter />} />
			</SettingsContext.Provider>
		</div>
	)
}

export default App
