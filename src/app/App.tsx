import React from 'react'
import { useTheme } from 'shared/lib/theme/useTheme'
import { AppRouter } from './providers/router'
import { classNames } from 'shared/lib/classNames/classNames'
import { Header } from 'widgets/Header'
import { Layout } from 'shared/layout'

const App = () => {
	const { theme } = useTheme()

	return (
		<div className={classNames('app', {}, [theme])}>
			<Layout header={<Header />} content={<AppRouter />} />
		</div>
	)
}

export default App
