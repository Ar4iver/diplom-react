import { TaskSchema } from 'entities/Task'

export type TimerState = {
	activeTask: TaskSchema
	timer: number | null
	isRunning: boolean
	tasks: TaskSchema[]
}
