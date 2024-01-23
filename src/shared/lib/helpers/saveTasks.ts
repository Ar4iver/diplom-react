import { TaskSchema } from 'entities/Task/types/task'

export const saveTasks = (tasks: TaskSchema[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
