import React, { ReactNode } from 'react'
import 'app/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

export const RouteDecorator = (story: () => ReactNode) => (
	<BrowserRouter>{story()}</BrowserRouter>
)
