import { TasksState } from 'entities/Task/model/types/task'
import { FormState } from 'features/addTodoPomodoro/model/types/form'

export interface StateSchema {
	tasks: TasksState
	form: FormState
}
