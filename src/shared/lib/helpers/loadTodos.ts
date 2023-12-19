export const loadTodos = () => {
	const savedTodos = localStorage.getItem('todos')
	return savedTodos ? JSON.parse(savedTodos) : []
}
