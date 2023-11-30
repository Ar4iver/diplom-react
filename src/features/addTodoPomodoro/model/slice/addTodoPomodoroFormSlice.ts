import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTodoPomodoroSchema } from '../types/AddTodoPomodoro'

/**
 * С помощью PayloadAction мы можем определить что мы ожидаем внутри action (какие данные)
 * В нашем случае мы будем ожидать строку задачи, которую пользователь введёт в инпут.
 *
 */

const initialState: AddTodoPomodoroSchema = {
	text: '',
	todos: [],
	error: '',
}

export const addTodoFormSlice = createSlice({
	name: 'addTodoForm',
	initialState,
	reducers: {
		setTodo: (state, action: PayloadAction<string>) => {
			state.text = action.payload
		},
		addTodo: (state) => {
			if (
				state?.text !== '' &&
				state?.text !== null &&
				state?.text !== undefined
			) {
				state?.todos?.push(state?.text ?? '')
				state.text = ''
			}
			state.error = 'Неверно набрано поле'
		},
	},
})

export const { addTodo } = addTodoFormSlice.actions
export const { actions: addTodoFormActions } = addTodoFormSlice
export const { reducer: addTodoFormReducer } = addTodoFormSlice
