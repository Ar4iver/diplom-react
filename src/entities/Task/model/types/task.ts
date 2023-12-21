export interface TaskSchema {
	id: string
	taskSummary: string
	countPomidor: number
	taskTime: number
	timeBreak: number
	timeLongBreak: number
	isComplete: boolean
}

export type TasksState = {
	tasks: TaskSchema[]
}
