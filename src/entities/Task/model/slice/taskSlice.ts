import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { saveTasks } from 'shared/lib/helpers/saveTasks'
import { loadTasks } from 'shared/lib/helpers/loadTasks'
import { TaskId, TaskSchema, TaskSummary, TasksState } from '../types/task'

/**
 * С помощью PayloadAction мы можем определить что мы ожидаем внутри action (какие данные)
 * В нашем случае мы будем ожидать строку задачи, которую пользователь введёт в инпут.
 *
 */

const initialState: TasksState = {
	tasks: loadTasks(),
	activeTaskId: null,
}

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTaskToList: (state, action: PayloadAction<string>) => {
			const newTask: TaskSchema = {
				id: uuidv4(),
				isEdit: false,
				taskSummary: action.payload,
				countPomidor: 1,
				taskTime: 5,
				timeBreak: 1,
				timeLongBreak: 3,
				isComplete: false,
				isActive: false,
			}

			state.tasks.push(newTask)
			saveTasks(state.tasks)
		},
		startTimer: (state, action: PayloadAction<TaskId>) => {
			const taskId = action.payload

			state.activeTaskId = taskId
		},
		removeTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload
			)

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
		editTask: (
			state,
			action: PayloadAction<{ id: TaskId; taskSummary: TaskSummary }>
		) => {
			const task = state.tasks.find(
				(item) => item.id === action.payload.id
			)

			if (task) {
				task.taskSummary = action.payload.taskSummary
				saveTasks(state.tasks)
			}
		},
		tickTimerTask: (state, action: PayloadAction<TaskId>) => {
			const task = state.tasks.find((item) => item.id === action.payload)

			if (task) {
				if (task.taskTime != 0) {
					task.taskTime -= 1
				}
			}

			saveTasks(state.tasks)
		},
	},
})

export const { actions: taskActions } = taskSlice
export const { reducer: taskReducer } = taskSlice
