import { TasksState } from 'entities/Task/model/types/task'
import { FormState } from 'features/taskForm/model/types/form'

export interface StateSchema {
	form: FormState
	tasks: TasksState
}
