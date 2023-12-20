import { TaskState } from 'features/addTodoPomodoro'
import { FormState } from 'features/addTodoPomodoro/model/types/form'

export interface StateSchema {
	tasks: TaskState
	form: FormState
}
