import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTodoPomodoroSchema } from '../types/AddTodoPomodoro'
import { Todo } from 'entities/Todo'

/**
 * С помощью PayloadAction мы можем определить что мы ожидаем внутри action (какие данные)
 * В нашем случае мы будем ожидать строку задачи, которую пользователь введёт в инпут.
 *
 */

const initialState: AddTodoPomodoroSchema = {
	todo: '',
	error: '',
	todos: [],
}

export const addTodoFormSlice = createSlice({
	name: 'addTodoForm',
	initialState,
	reducers: {
		setTodoTextInput: (state, action: PayloadAction<string>) => {
			state.todo = action.payload
		},
		addTodoTextInput: (state, action: PayloadAction<string>) => {
			if (state.todo.length) {
				const newTodo: Todo = {
					todoText: action.payload,
				}
				state.todos.push(newTodo)
			}
			state.error = 'Введите название задачи'
		},
	},
})

export const { actions: addTodoFormActions } = addTodoFormSlice
export const { reducer: addTodoFormReducer } = addTodoFormSlice
