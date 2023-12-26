import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TimerState } from '../types/timer'
import { loadTasks } from 'shared/lib/helpers/loadTasks'
import { TaskId } from 'entities/Task/model/types/task'
import { saveActiveTask } from 'shared/lib/helpers/saveActiveTask'
import { checkActiveTask } from 'shared/lib/helpers/checkActiveTask'

const initialState: TimerState = {
	timer: 0,
	activeTask: checkActiveTask(),
	isRunning: false,
	tasks: loadTasks(),
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setTimerValue: (state, action: PayloadAction<number>) => {
			state.timer = action.payload
		},
		setActiveTask: (state, action: PayloadAction<TaskId>) => {
			const task = state.tasks.find((item) => item.id === action.payload)

			if (task) {
				if (task.isActive != true) {
					state.activeTask = task.id
				} else {
					state.tasks[0].id
				}
			}

			saveActiveTask(task?.id)
		},
		startTimer: (state) => {
			state.isRunning = true
		},
		tickTimerTask: (state) => {
			const activeTask =
				state.activeTask != '' ? state.activeTask : state.tasks[0].id

			const task = state.tasks.find((item) => item.id === activeTask)

			if (task) {
				task.taskTime -= 1
			}
		},
	},
})

export const { actions: timerActions } = timerSlice
export const { reducer: timerReducer } = timerSlice
