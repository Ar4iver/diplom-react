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
	timeToComplete: 10, //25 минут в секундах
	complete: false,
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
					id: state.todos.length + 1,
					todoText: action.payload,
					timeToComplete: 10, // Initial time (in seconds)
					complete: false,
					isTimerRunning: false,
					isTimerFinish: null,
					isTimerPaused: null,
					isTimerStop: null,
					isTimerResume: null,
				}

				state.todos.push(newTodo)

				/**Обновляем порядковый номер элементов массива, чтобы они были корректными после добавления новой задачи */
				state.todos.forEach((todo, index) => {
					todo.id = index + 1
				})

				saveTodos(state.todos)
			} else {
				state.error = 'Поле ввода пустое'
			}
		},
		startTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo && todo.timeToComplete != 0) {
				todo.isTimerRunning = true
				todo.isTimerFinish = false
			}
		},
		tickTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo && todo.timeToComplete != 0) {
				todo.timeToComplete -= 1
				console.log('я тут')
				if (todo.timeToComplete === 0) {
					todo.isTimerRunning = false
					todo.isTimerFinish = true
					console.log('я и тут')
				}
			}
			console.log('я тут тоже')
		},
		pauseTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo) {
				todo.isTimerPaused = true
			}
		},
		resumeTimer: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo) {
				todo.isTimerPaused = false
			}
		},
		addTimeToComplete: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo) {
				todo.timeToComplete += 300
			}
		},
		subtractTimeToComplete: (state, action: PayloadAction<number>) => {
			const todo = state.todos.find((item) => item.id === action.payload)

			if (todo && todo.timeToComplete >= 300) {
				todo.timeToComplete -= 300
			} else {
				if (todo) {
					todo.timeToComplete = 0
				}
			}
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload
			)

			/**Обновляем порядковый номер элементов массива, чтобы они были корректными после удаления */
			state.todos.forEach((todo, index) => {
				todo.id = index + 1
			})

			saveTodos(state.todos)
		},
	},
})

export const { actions: addTodoFormActions } = addTodoFormSlice
export const { reducer: addTodoFormReducer } = addTodoFormSlice
