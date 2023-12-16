export interface Todo {
	id: number
	todoText: string
	timeToComplete: number
	complete: boolean
	isTimerRunning: boolean
	isTimerFinish: boolean | null
	isTimerPaused: boolean | null
	isTimerResume: boolean | null
	isTimerStop: boolean | null
}
