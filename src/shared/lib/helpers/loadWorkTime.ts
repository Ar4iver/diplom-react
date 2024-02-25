export const loadWorkTime = () => {
	const workTime = localStorage.getItem('workTime')
	return workTime ? JSON.parse(workTime) : 0
}
