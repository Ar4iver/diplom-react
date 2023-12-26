import { TaskSchema } from 'entities/Task'

export type TimerState = {
	activeTask: number | string
	timer: number | null
	isRunning: boolean
	tasks: TaskSchema[]
}
