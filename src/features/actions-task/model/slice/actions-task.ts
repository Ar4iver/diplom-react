import { loadTasks } from 'shared/lib/helpers/loadTasks'
import { CreateTaskFormState } from '../types/actions-task-types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { saveTasks } from 'shared/lib/helpers/saveTasks'
import { v4 as uuidv4 } from 'uuid'
import { TaskSchema } from 'entities/Task/types/task'

const initialState: CreateTaskFormState = {
	tasks: loadTasks(),
	taskSummaryInput: '',
}

export const actionsTaskSlice = createSlice({
	name: 'actionsTask',
	initialState,
	reducers: {
		setTaskTextInput: (state, action: PayloadAction<string>) => {
			state.taskSummaryInput = action.payload
		},
		addTask: (state, action: PayloadAction<string>) => {
			const newTask: TaskSchema = {
				id: uuidv4(),
				serialNumber: state.tasks.length + 1,
				taskSummary: action.payload,
				countPomidor: 1,
				isCompleted: false,
			}

			state.tasks.push(newTask)
			state.taskSummaryInput = ''
			saveTasks(state.tasks)
		},
		incrementTaskPomidor: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((item) => item.id === action.payload)

			if (task) {
				task.countPomidor += 1
			}

			saveTasks(state.tasks)
		},
		decrementTaskPomidor: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((item) => item.id === action.payload)

			if (task && task.countPomidor > 1) {
				task.countPomidor -= 1
			} else {
				return
			}

			saveTasks(state.tasks)
		},
		removeTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload
			)

			saveTasks(state.tasks)
		},
	},
})

export const { actions: actionsTaskActions } = actionsTaskSlice
export const { reducer: actionsTaskReducer } = actionsTaskSlice
