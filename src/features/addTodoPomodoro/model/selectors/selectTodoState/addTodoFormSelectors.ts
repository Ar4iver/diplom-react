import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

// export const getTodoState = (state: StateSchema) => state?.addTodoForm

export const getAddTodoFormText = (state: StateSchema) =>
	state?.addTodoForm?.todo

export const getTodos = (state: StateSchema) => state?.addTodoForm?.todos

export const getAddTodoFormError = (state: StateSchema) =>
	state?.addTodoForm?.error

export const getStateFirstTimeCompleteTodo = (state: StateSchema) =>
	state?.addTodoForm?.todos[0]?.timeToComplete
