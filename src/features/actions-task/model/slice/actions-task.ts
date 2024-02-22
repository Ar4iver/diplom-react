import { CreateTaskFormState } from '../types/actions-task-types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CreateTaskFormState = {
	taskSummaryInput: '',
}

export const addTaskForm = createSlice({
	name: 'taskForm',
	initialState,
	reducers: {
		setTaskTextInput: (state, action: PayloadAction<string>) => {
			state.taskSummaryInput = action.payload
		},
	},
})

export const { actions: actionsTaskActions } = addTaskForm
export const { reducer: actionsTaskReducer } = addTaskForm
