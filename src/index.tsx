import React from 'react'
import 'app/styles/index.scss'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'
import { SettingsProvider } from 'app/providers/SettingsProvider'

const container = document.getElementById('root')

if (!container) {
	throw new Error('Container root is not defined')
}

const root = createRoot(container)

root.render(
	<StoreProvider>
		<BrowserRouter>
			<ErrorBoundary>
				<ThemeProvider>
					<SettingsProvider>
						<App />
					</SettingsProvider>
				</ThemeProvider>
			</ErrorBoundary>
		</BrowserRouter>
	</StoreProvider>
)
