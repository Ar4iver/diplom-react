import { createSlice } from '@reduxjs/toolkit'
import { TimerTask } from '../types/timer'

const initialState: TimerTask = {
	workTime: 25,
	breakTimeShort: 5,
	breakTimeLong: 10,
}

export const taskTimerSlice = createSlice({
	name: 'timerTask',
	initialState,
	reducers: {},
})

export const { actions: taskActions } = taskTimerSlice
export const { reducer: taskReducer } = taskTimerSlice
