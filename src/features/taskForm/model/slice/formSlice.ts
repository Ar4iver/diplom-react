import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FormState } from '../types/form'

const initialState: FormState = {
	taskSummaryInput: '',
	taskSummaryEditInput: '',
}

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setTaskTextInput: (state, action: PayloadAction<string>) => {
			state.taskSummaryInput = action.payload
		},

		setTaskEditInput: (state, action: PayloadAction<string>) => {
			state.taskSummaryEditInput = action.payload
		},
	},
})

export const { actions: formActions } = formSlice
export const { reducer: formReducer } = formSlice
