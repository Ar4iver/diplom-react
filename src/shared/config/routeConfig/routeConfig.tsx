import React from 'react'
import { NotFoundPage } from 'pages/404Page'
import { MainPage } from 'pages/MainPage'
import { StatistiсPage } from 'pages/StatisticPage'
import { RouteProps } from 'react-router-dom'

/**
 * В данном файле лежит конфиг маршрутов приложения
 */

export enum AppRoutes {
	MAIN = 'main',
	STATISTIC = 'statistic',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
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
		element: <StatistiсPage />,
	},

	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
}
