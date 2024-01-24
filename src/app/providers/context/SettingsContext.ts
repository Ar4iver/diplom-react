import { Dispatch, SetStateAction, createContext } from 'react'

interface SettingsContextType {
	workMinutes: number
	setWorkMinutes: Dispatch<SetStateAction<number>>
	shortBreak: number
	setShortBreak: Dispatch<SetStateAction<number>>
	longBreak: number
	setLongBreak: Dispatch<SetStateAction<number>>
}

const SettingsContext = createContext<Partial<SettingsContextType>>({})

export default SettingsContext
