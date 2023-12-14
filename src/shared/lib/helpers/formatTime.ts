export function formatTime(value: number, format: string) {
	const hours = Math.floor(value / 3600)
		.toString()
		.padStart(2, '0')
	const minutes = Math.floor((value % 3600) / 60)
		.toString()
		.padStart(2, '0')
	const seconds = (value % 60).toString().padStart(2, '0')

	if (format === 'timer') {
		return `${minutes}:${seconds}`
	} else if (format === 'sumTime') {
		return `${
			hours === '00' ? '' : `${hours} час `
		} ${minutes} минут`
	}

	return ''
}
