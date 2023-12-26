export const saveActiveTask = (activeTask?: object) => {
	localStorage.setItem('activeTask', JSON.stringify(activeTask))
}
