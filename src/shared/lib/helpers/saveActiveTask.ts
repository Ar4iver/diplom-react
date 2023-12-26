export const saveActiveTask = (activeTask?: string) => {
	localStorage.setItem('activeTask', JSON.stringify(activeTask))
}
