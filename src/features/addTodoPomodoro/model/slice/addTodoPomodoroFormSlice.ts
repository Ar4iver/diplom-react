import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddTodoPomodoroSchema } from '../types/todo'

const initialState: AddTodoPomodoroSchema = {
	text: '',
}

export const addTodoPomodoroFormSlice = createSlice({
	name: 'addTodoPomodoroForm',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload
		},
	},
})

export const { actions: addTodoPomodoroActions } = addTodoPomodoroFormSlice
export const { reducer: addTodoPomodoroReducer } = addTodoPomodoroFormSlice
