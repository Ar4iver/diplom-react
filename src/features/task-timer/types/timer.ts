export interface TaskTimerState {
	workTime: number
	breakTimeShort: number
	breakTimeLong: number
	secondsLeft: number
	mode: string
	sessionCount: number
	isRunning: boolean
	isPaused: boolean
}
