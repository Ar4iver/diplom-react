import { TaskSchema } from 'entities/Task'

export const selectTaskCountPomidor = (state: TaskSchema[], taskId: string) => {
	const task = state.find((task) => task.id === taskId)
	return task ? task.countPomidor : null
}
