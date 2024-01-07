export interface TaskSchema {
	id: string
	isEdit: boolean
	taskSummary: string
	countPomidor: number
	taskTime: number
	isComplete: boolean
	isActive: boolean
}

export type TasksState = {
	tasks: TaskSchema[]
	activeTaskId: TaskSchema | null
	breakTimeShort: number
	breakTimeLong: number
}

export type TaskId = TaskSchema['id']
export type CountPomidor = TaskSchema['countPomidor']
export type TaskSummary = TaskSchema['taskSummary']
