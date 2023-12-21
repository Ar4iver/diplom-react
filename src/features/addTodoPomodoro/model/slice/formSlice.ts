import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FormState } from '../types/form'

const initialState: FormState = {
	taskSummaryInput: '',
}

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setTodoTextInput: (
			state,
			{ payload: taskSummaryInput }: PayloadAction<string>
		) => {
			state.taskSummaryInput = taskSummaryInput
		},
	},
})

export const { actions: formActions } = formSlice
export const { reducer: formReducer } = formSlice
