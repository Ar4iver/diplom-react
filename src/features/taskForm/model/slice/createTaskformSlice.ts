import { v4 as uuidv4 } from 'uuid'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CreateTaskFormState, TaskSchema } from '../types/form'
import { saveTasks } from 'shared/lib/helpers/saveTasks'
import { loadTasks } from 'shared/lib/helpers/loadTasks'

const initialState: CreateTaskFormState = {
	tasks: loadTasks(),
	taskSummaryInput: '',
}

export const createTaskformSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setTaskTextInput: (state, action: PayloadAction<string>) => {
			state.taskSummaryInput = action.payload
		},
		addTask: (state, action: PayloadAction<string>) => {
			const newTask: TaskSchema = {
				id: uuidv4(),
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

			if (task) {
				task.countPomidor -= 1
			}

			saveTasks(state.tasks)
		},
	},
})

export const { actions: formActions } = createTaskformSlice
export const { reducer: formReducer } = createTaskformSlice
