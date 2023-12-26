export const checkActiveTask = () => {
	const activeTask = localStorage.getItem('activeTask')
	return activeTask ? JSON.parse(activeTask) : ''
}
