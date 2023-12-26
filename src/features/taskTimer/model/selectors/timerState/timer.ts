import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getAddActiveTask = (state: StateSchema) => state.timer.activeTask

export const getAddActiveTaskTime = (state: StateSchema) =>
	state?.timer?.activeTask?.taskTime
