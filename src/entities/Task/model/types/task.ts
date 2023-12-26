export interface TaskSchema {
	id: string
	isEdit: boolean
	taskSummary: string
	countPomidor: number
	taskTime: number
	timeBreak: number
	timeLongBreak: number
	isComplete: boolean
	isActive: boolean
}

export type TasksState = {
	tasks: TaskSchema[]
}

export type TaskId = TaskSchema['id']
export type CountPomidor = TaskSchema['countPomidor']
export type TaskSummary = TaskSchema['taskSummary']
