import { TaskSchema } from 'entities/Todo'

export type TaskState = {
	tasks: Record<number, TaskSchema>
}
