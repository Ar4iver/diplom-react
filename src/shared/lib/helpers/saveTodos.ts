import { TaskSchema } from 'entities/Todo'

export const saveTodos = (todos: TaskSchema[]) => {
	localStorage.setItem('todos', JSON.stringify(todos))
}
