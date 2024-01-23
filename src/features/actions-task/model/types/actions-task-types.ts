import { TaskSchema } from "entities/Task/types/task"

export type CreateTaskFormState = {
	tasks: TaskSchema[]
	taskSummaryInput: string
}
