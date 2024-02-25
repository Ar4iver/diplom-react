import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SettingsPage.module.scss'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { timerActions } from 'features/task-timer/slice/taskTimer'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { Input } from 'shared/ui/Input/Input'
import { saveWorkTime } from 'shared/lib/helpers/saveWorkTime'

interface SettingsPageProps {
	className?: string
}

export const SettingsPage = ({ className }: SettingsPageProps) => {
	const dispatch = useAppDispatch()
	const workMinutes = useSelector(
		(state: StateSchema) => state.timerTask.workTime
	)

	const shortBreak = useSelector(
		(state: StateSchema) => state.timerTask.breakTimeShort
	)

	const longBreak = useSelector(
		(state: StateSchema) => state.timerTask.breakTimeLong
	)

	const handleWorkMinutesChange = useCallback(
		(value: number) => {
			dispatch(timerActions.setWorkTime(value))
			saveWorkTime(value)
		},
		[dispatch]
	)

	const handleShortBreakChange = useCallback(
		(value: number) => {
			dispatch(timerActions.setShortBreak(value))
			saveWorkTime(value)
		},
		[dispatch]
	)

	const handleLongtBreakChange = useCallback(
		(value: number) => {
			dispatch(timerActions.setLongBreak(value))
			saveWorkTime(value)
		},
		[dispatch]
	)

	return (
		<div className={classNames(cls.SettingsPage, {}, [className])}>
			<div>
				<span>Время работы</span>
				<Input
					onChangeNumber={handleWorkMinutesChange}
					value={workMinutes}
					type="text"
				/>
			</div>
			<div>
				<span>Короткий перерыв</span>
				<Input
					onChangeNumber={handleShortBreakChange}
					value={shortBreak}
					type="text"
				/>
			</div>
			<div>
				<span>Длинный перерыв</span>
				<Input
					onChangeNumber={handleLongtBreakChange}
					value={longBreak}
					type="text"
				/>
			</div>
		</div>
	)
}
