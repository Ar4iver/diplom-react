import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const selectTasks = (state: StateSchema) => state.tasks.tasks
export const selectActiveTask = (state: StateSchema) => state.tasks.activeTaskId
export const selectActiveTaskTime = (state: StateSchema) =>
	state.tasks.activeTaskId?.taskTime
export const selectActiveTaskСountPomidor = (state: StateSchema) =>
	state.tasks.activeTaskId?.countPomidor
export const setBreakTimeLong = (state: StateSchema) =>
	state.tasks.breakTimeLong
export const setBreakTimeShort = (state: StateSchema) =>
	state.tasks.breakTimeShort
