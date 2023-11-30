import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'
import { DeepPartial } from '@reduxjs/toolkit'

/**
 * DeepPartial - это утилита TypeScript, которая делает все свойства типа и свойства вложенных
 * обьектов необязательными. Это нужно, когда мы хотим инициализировать состояние частично, а не
 * предоставлять полное состояние сразу. В данном кейсе для initialState мы предоставляем обьект, который
 * частично может соответствовать StateSchema ( Главный State ).
 * 
 * 										Почему createReduxStore ожидает StateSchema
 * 
 * Изначально Redux Store ожидает, что его состояние будет соответствовать полной структуре главного типа (StateChema).
 * Это обеспечивает согласованность и предсказуемость, поскольку store знает точную структуру всего состояния и знает 
 * с чем ему нужно будет работать.
 * 
 * 
 */

interface StoreProviderProps {
	children?: ReactNode
	initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props

	const store = createReduxStore(initialState as StateSchema)

	return <Provider store={store}>{children}</Provider>
}
