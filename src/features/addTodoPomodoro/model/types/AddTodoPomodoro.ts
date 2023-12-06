import { Todo } from 'entities/Todo'

export interface AddTodoPomodoroSchema {
	todo: string
	error?: string
	todos: Todo[]
	timeToComplete: number
}
