import { TaskSchema } from 'entities/Todo'

export const saveTasks = (tasks: TaskSchema[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
