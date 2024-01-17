export type TaskSchema = {
	id: string
	taskSummary: string
	countPomidor: number
	isCompleted: boolean
}

export type CreateTaskFormState = {
	tasks: TaskSchema[]
	taskSummaryInput: string
}
