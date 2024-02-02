import React, { ChangeEvent, useContext } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SettingsPage.module.scss'
import SettingsContext from 'shared/lib/settings/SettingsContext'

interface SettingsPageProps {
	className?: string
}

export const SettingsPage = ({ className }: SettingsPageProps) => {
	const {
		workMinutes,
		setWorkMinutes,
		shortBreak,
		setShortBreak,
		longBreak,
		setLongBreak,
	} = useContext(SettingsContext)

	const handleWorkMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
		setWorkMinutes!(Number(e.target.value))
	}

	const handleShortBreakChange = (e: ChangeEvent<HTMLInputElement>) => {
		setShortBreak!(Number(e.target.value))
	}

	const handleLongBreakChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLongBreak!(Number(e.target.value))
	}

	return (
		<div className={classNames(cls.SettingsPage, {}, [className])}>
			<div>
				<span>Время работы</span>
				<input
					value={workMinutes}
					onChange={handleWorkMinutesChange}
				></input>
			</div>
			<div>
				<span>Время короткого перерыва</span>
				<input
					value={shortBreak}
					onChange={handleShortBreakChange}
				></input>
			</div>
			<div>
				<span>Время длинного перерыва</span>
				<input
					value={longBreak}
					onChange={handleLongBreakChange}
				></input>
			</div>
		</div>
	)
}
