import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { TaskSchema } from 'entities/Task'
import { loadTasks } from 'shared/lib/helpers/loadTasks'
import { saveTasks } from 'shared/lib/helpers/saveTasks'

const initialState: TaskSchema[] = loadTasks()

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<string>) => {
			const newTask: TaskSchema = {
				id: uuidv4(),
				tasksNumber: state.length + 1,
				taskSummary: action.payload,
				countPomidor: 1,
				pomidorComplete: 0,
				isCompleted: false,
			}
			state.push(newTask)
			saveTasks(state)
		},
		completeTask: (state: TaskSchema[], action) => {
			const index = state.findIndex(
				(task: TaskSchema) => task.id === action.payload
			)
			if (index !== -1) {
				state.splice(index, 1)
			}
			saveTasks(state)
		},
		incrementPomidorCompleteTask: (state: TaskSchema[], action) => {
			const task = state.find((task) => task.id === action.payload)
			if (task) {
				task.pomidorComplete += 1
			}
		},
		incrementTaskPomidor: (state, action: PayloadAction<string>) => {
			const task = state.find((task) => task.id === action.payload)
			if (task && task.countPomidor !== null) {
				task.countPomidor += 1
			}
			saveTasks(state)
		},
		decrementTaskPomidor: (state, action: PayloadAction<string>) => {
			const task = state.find((task) => task.id === action.payload)
			if (task && task.countPomidor !== null && task.countPomidor > 0) {
				task.countPomidor -= 1
			}
			saveTasks(state)
		},
		removeTask: (state, action: PayloadAction<string>) => {
			const index = state.findIndex((task) => task.id === action.payload)
			if (index !== -1) {
				state.splice(index, 1)
			}
			saveTasks(state)
		},
	},
})

export const { actions: tasksActions } = tasksSlice
export const { reducer: tasksReducer } = tasksSlice
