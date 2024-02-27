export enum Activity {
	'Эта неделя' = 'Эта неделя',
	'Прошедшая неделя' = 'Прошедшая неделя',
	'2 недели назад' = '2 недели назад',
}

export interface DailyStats {
	id: string
	date: string
	completedTomatoCount: number
	pauseTime: number
	stopCount: number
	totalTimeTask: number
}

export interface ChartState {
	data: DailyStats | null
	activity: string
	focusCount: number
	pauseTimeCount: number
	stopCount: number
}
