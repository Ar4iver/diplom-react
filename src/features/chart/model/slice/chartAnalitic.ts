import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChartState } from 'features/chart/types/chart'

const initialState: ChartState = {
	activity: 'Эта неделя',
}

export const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		setActivity: (state, action: PayloadAction<string>) => {
			state.activity = action.payload
		},
	},
})

export const { actions: chartActions, reducer: chartReducer } = chartSlice
