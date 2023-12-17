export interface Todo {
	id: number
	todoText: string
	timeToComplete: number
	timeToBreak: number
	complete: boolean
	isTotalPomidorForTodo: number
	editText: string
	countPomidorTodoComplete: number | null
	isEdit: boolean
	editTodoId: number | null
	isTimerRunning: boolean
	isTimerFinish: boolean | null
	isTimerPaused: boolean | null
	isTimerResume: boolean | null
	isTimerStop: boolean | null
	isTimerPausedBreak: boolean | null
}
