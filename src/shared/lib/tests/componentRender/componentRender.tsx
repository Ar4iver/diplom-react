import React from 'react'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from 'app/providers/StoreProvider'
import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

/**
 * Тут создаём обёртку вокруг компонента для его тестирования с использованием глобального хранилища Redux.
 * Это нам даёт возможность во время тестирования передавать в тест любое состояние Redux и работать с этим.
 *
 */

export interface componentRenderOptions {
	route: string
	initialState?: DeepPartial<StateSchema>
}

export function componentRender(
	component: ReactNode,
	options: componentRenderOptions
) {
	const { route = '/', initialState } = options

	return render(
		<StoreProvider initialState={initialState}>
			<MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
		</StoreProvider>
	)
}
