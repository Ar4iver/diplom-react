import { TaskSchema } from 'entities/Task'

export const selectTaskPomidorComplete = (
	state: TaskSchema[],
	taskId: string
) => {
	const task = state.find((task) => task.id === taskId)
	return task ? task.pomidorComplete : null
}
