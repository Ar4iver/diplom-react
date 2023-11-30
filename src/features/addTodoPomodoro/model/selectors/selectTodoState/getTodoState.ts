import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getTodoState = (state: StateSchema) => state?.addTodoForm
