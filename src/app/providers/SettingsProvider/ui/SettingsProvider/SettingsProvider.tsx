import React, { ReactNode, useEffect, useState } from 'react'
import SettingsContext from 'shared/lib/settings/SettingsContext'

interface SettingsProvider {
	children?: ReactNode
}

export const SettingsProvider = ({ children }: SettingsProvider) => {
	const getLocalStorageSettings = (key: string, defaultValue: number) => {
		const storedSettings = localStorage.getItem(key)
		return storedSettings !== null
			? JSON.parse(storedSettings)
			: defaultValue
	}

	const [workMinutes, setWorkMinutes] = useState(
		getLocalStorageSettings('workMinutes', 25)
	)
	const [shortBreak, setShortBreak] = useState(
		getLocalStorageSettings('shortBreak', 5)
	)
	const [longBreak, setLongBreak] = useState(
		getLocalStorageSettings('longBreak', 15)
	)

	useEffect(() => {
		localStorage.setItem('workMinutes', JSON.stringify(workMinutes))
		localStorage.setItem('shortBreak', JSON.stringify(shortBreak))
		localStorage.setItem('longBreak', JSON.stringify(longBreak))
	}, [workMinutes, shortBreak, longBreak])

	return (
		<SettingsContext.Provider
			value={{
				workMinutes,
				setWorkMinutes,
				shortBreak,
				setShortBreak,
				longBreak,
				setLongBreak,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
