import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskTimerState } from '../types/timer'
import { loadWorkTime } from 'shared/lib/helpers/loadWorkTime'

const initialState: TaskTimerState = {
	workTime: loadWorkTime(),
	breakTimeShort: 5,
	breakTimeLong: 15,
	secondsLeft: 0,
	mode: '',
	sessionCount: 0,
	isRunning: false,
	isPaused: false,
}

export const taskTimerSlice = createSlice({
	name: 'timerTask',
	initialState,
	reducers: {
		setWorkTime: (state, action: PayloadAction<number>) => {
			state.workTime = action.payload
		},
		setShortBreak: (state, action: PayloadAction<number>) => {
			state.breakTimeShort = action.payload
		},
		setLongBreak: (state, action: PayloadAction<number>) => {
			state.breakTimeLong = action.payload
		},
		setMode: (state, action: PayloadAction<string>) => {
			state.mode = action.payload
		},
		startTimer: (state) => {
			state.isRunning = true
			state.isPaused = false
		},
		pauseTimer: (state) => {
			state.isPaused = true
			state.isRunning = false
		},
		stopTimer: (state) => {
			state.isRunning = false
			state.isPaused = false
			state.mode = 'work'
			state.secondsLeft = state.workTime * 60
			state.sessionCount = 0
		},
		tick: (state) => {
			if (state.isRunning && !state.isPaused && state.secondsLeft > 0) {
				state.secondsLeft--
			}
		},
		switchMode: (state) => {
			if (state.mode === 'work') {
				state.sessionCount++
				if (state.sessionCount % 4 === 0) {
					state.mode = 'longBreak'
					state.secondsLeft = state.breakTimeLong * 60
				} else {
					state.mode = 'shortBreak'
					state.secondsLeft = state.breakTimeShort * 60
				}
			} else {
				state.mode = 'work'
				state.secondsLeft = state.workTime * 60
				if (state.mode === 'longBreak') {
					state.sessionCount = 0
				}
			}
		},
		setSecondsLeft: (state, action: PayloadAction<number>) => {
			state.secondsLeft = action.payload
		},
		resetSessionCount: (state) => {
			state.sessionCount = 0
		},
	},
})

export const { actions: timerActions, reducer: timerReducer } = taskTimerSlice
