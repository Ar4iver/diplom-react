import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const selectTasks = (state: StateSchema) => state.tasks.tasks
export const selectActiveTask = (state: StateSchema) =>
	state.tasks.tasks.find((task) => task.id === state.tasks.activeTaskId)
