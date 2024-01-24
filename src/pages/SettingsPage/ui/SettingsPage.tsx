import React, { useContext } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SettingsPage.module.scss'
import { Input } from 'shared/ui/Input/Input'
import SettingsContext from 'app/providers/context/SettingsContext'

interface SettingsPageProps {
	className?: string
}

export const SettingsPage = ({ className }: SettingsPageProps) => {
	const settings = useContext(SettingsContext)

	return (
		<div className={classNames(cls.SettingsPage, {}, [className])}>
			<div>
				<span>Время работы</span>
				<Input value={settings.workMinutes} />
			</div>
			<div>
				<span>Время короткого перерыва</span>
				<Input value={settings.shortBreak} />
			</div>
			<div>
				<span>Время длинного перерыва</span>
				<Input value={settings.longBreak} />
			</div>
		</div>
	)
}
