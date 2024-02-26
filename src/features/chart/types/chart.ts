export enum Activity {
	'Эта неделя' = 'Эта неделя',
	'Прошедшая неделя' = 'Прошедшая неделя',
	'2 недели назад' = '2 недели назад',
}

export interface ChartState {
	data: null
	activity: string
	focusCount: number
	pauseTimeCount: number
	stopCount: number
}
