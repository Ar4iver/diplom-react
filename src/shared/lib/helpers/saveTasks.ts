import { TaskSchema } from 'entities/Task'

export const saveTasks = (tasks: TaskSchema[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
