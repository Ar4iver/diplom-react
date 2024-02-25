export const saveWorkTime = (workTime: number) => {
	localStorage.setItem('workTime', JSON.stringify(workTime))
}
