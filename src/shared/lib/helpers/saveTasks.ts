import { TaskSchema } from 'features/taskForm/model/types/form'

export const saveTasks = (tasks: TaskSchema[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
