import React from 'react'
import { NotFoundPage } from 'pages/404Page'
import { MainPage } from 'pages/MainPage'
import { RouteProps } from 'react-router-dom'
import { SettingsPage } from 'pages/SettingsPage'
import AnaliticPage from 'pages/AnaliticPage/ui/AnaliticPage'

/**
 * В данном файле лежит конфиг маршрутов приложения
 */

export enum AppRoutes {
	MAIN = 'main',
	STATISTIC = 'statistic',
	SETTINGS = 'settings',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.SETTINGS]: '/settings',
	[AppRoutes.STATISTIC]: '/statistic',
	[AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},

	[AppRoutes.STATISTIC]: {
		path: RoutePath.statistic,
		element: <AnaliticPage />,
	},

	[AppRoutes.SETTINGS]: {
		path: RoutePath.settings,
		element: <SettingsPage />,
	},

	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
}
