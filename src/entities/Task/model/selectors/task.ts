import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const selectTasks = (state: StateSchema) => state.tasks.tasks
export const selectActiveTask = (state: StateSchema) => state.tasks.activeTask
export const selectActiveTaskTime = (state: StateSchema) =>
	state.tasks.activeTask?.taskTime
export const selectActiveTaskСountPomidor = (state: StateSchema) =>
	state.tasks.activeTask?.countPomidor
