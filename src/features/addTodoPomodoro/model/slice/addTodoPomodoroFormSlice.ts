import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTodoPomodoroSchema } from '../types/AddTodoPomodoro'
import { Todo } from 'entities/Todo'

/**
 * С помощью PayloadAction мы можем определить что мы ожидаем внутри action (какие данные)
 * В нашем случае мы будем ожидать строку задачи, которую пользователь введёт в инпут.
 *
 */

const loadTodos = () => {
	const savedTodos = localStorage.getItem('todos')
	return savedTodos ? JSON.parse(savedTodos) : []
}

const saveTodos = (todos: Todo[]) => {
	localStorage.setItem('todos', JSON.stringify(todos))
}

const initialState: AddTodoPomodoroSchema = {
	todo: '',
	error: '',
	timeToComplete: 25,
	todos: loadTodos(),
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
					timeToComplete: 25,
				}
				state.todos.push(newTodo)
			}
			saveTodos(state.todos)
			state.error = 'Поле ввода пустое'
		},
		addTimeToComplete: (state) => {
			state.timeToComplete += 25
		},
		subtractTimeToComplete: (state) => {
			state.timeToComplete -= 25
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos.splice(action.payload, 1)
			saveTodos(state.todos)
		},
	},
})

export const { actions: addTodoFormActions } = addTodoFormSlice
export const { reducer: addTodoFormReducer } = addTodoFormSlice
