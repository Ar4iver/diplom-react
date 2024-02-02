import { Dispatch, SetStateAction, createContext } from 'react'

export interface SettingsContextType {
	workMinutes?: number
	setWorkMinutes?: Dispatch<SetStateAction<number>>
	shortBreak?: number
	setShortBreak?: Dispatch<SetStateAction<number>>
	longBreak?: number
	setLongBreak?: Dispatch<SetStateAction<number>>
}

const SettingsContext = createContext<SettingsContextType>({})

export default SettingsContext
