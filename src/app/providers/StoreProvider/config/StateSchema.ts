import { TasksState } from 'entities/Task/model/types/task'
import { FormState } from 'features/taskForm/model/types/form'

export interface StateSchema {
	tasks: TasksState
	form: FormState
}
