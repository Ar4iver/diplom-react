export const loadTasks = () => {
	const savedTasks = localStorage.getItem('tasks')
	return savedTasks ? JSON.parse(savedTasks) : []
}
