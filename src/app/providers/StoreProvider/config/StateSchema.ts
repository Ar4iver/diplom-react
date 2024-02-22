import { TaskSchema } from 'entities/Task/types/task'
import { CreateTaskFormState } from 'features/actions-task/model/types/actions-task-types'
import { TaskTimerState } from 'features/task-timer/types/timer'

export interface StateSchema {
	actionsTaskSlice: CreateTaskFormState
	timerTask: TaskTimerState
	tasks: TaskSchema[]
}
