import { TasksState } from 'entities/Task/model/types/task'
import { FormState } from 'features/taskForm/model/types/form'
import { TimerState } from 'features/taskTimer/model/types/timer'

export interface StateSchema {
	form: FormState
	tasks: TasksState
	timer: TimerState
}
