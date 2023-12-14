import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTodoPomodoroSchema } from '../types/AddTodoPomodoro'
import { Todo } from 'entities/Todo'

/**
 * С помощью PayloadAction мы можем определить что мы ожидаем внутри action (какие данные)
 * В нашем случае мы будем ожидать строку задачи, которую пользователь введёт в инпут.
 *
 */

//После старта запускается итерация по массиву todo. На каждой итерации берётся значение timeToComplete и идёт отсчёт.
//По завершению этого отсчёта итерация продолжается до тех пор пока есть todo в списке.

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
	timeToComplete: 10, //25 минут в секундах
	complete: false,
	todos: loadTodos(),
	isTimerRunning: false,
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
					id: state.todos.length + 1,
					todoText: action.payload,
					timeToComplete: 10, // Initial time (in seconds)
					complete: false,
					isTimerRunning: false,
				}

				state.todos.push(newTodo)
				saveTodos(state.todos)
			} else {
				state.error = 'Поле ввода пустое'
			}
		},
		startTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((t) => t.id === action.payload)

			if (todo) {
				todo.isTimerRunning = true
			}
		},
		tickTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((t) => t.id === action.payload)

			if (todo && todo.isTimerRunning) {
				todo.timeToComplete -= 1

				if (todo.timeToComplete <= 0) {
					todo.isTimerRunning = false
					todo.complete = true
				}
			}
		},
		addTimeToComplete: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((t) => t.id === action.payload)

			if (todo) {
				todo.timeToComplete += 300 // 5 minutes in seconds
			}
		},
		subtractTimeToComplete: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((t) => t.id === action.payload)

			if (todo && todo.timeToComplete >= 300) {
				todo.timeToComplete -= 300
			}
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload
			)
			saveTodos(state.todos)
		},
	},
})

export const { actions: addTodoFormActions } = addTodoFormSlice
export const { reducer: addTodoFormReducer } = addTodoFormSlice
