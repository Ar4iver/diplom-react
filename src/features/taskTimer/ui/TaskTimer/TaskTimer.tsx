import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'

interface TaskTimerProps {
	className?: string
}

export const TaskTimer = (props: TaskTimerProps) => {
	const { className } = props

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div className={classNames(cls.timerHeader, {})}>
				<div>(Время задачи)</div>
				<div>Помидор</div>
			</div>
			<div className={cls.timerBlock}>
				<span className={cls.timerContent}>
					<span className={classNames(cls.timer, {})}>00:00</span>
					<span className={cls.iconBtnActionAddTime}>
						<AddTimeBigAction />
					</span>
				</span>
			</div>
			<div className={cls.taskTimer}>
				Задача (порядковый номер в списке) - (название задачи)
			</div>
			<div className={cls.btnTimerAction}>
				<>
					<Button className={classNames(cls.timerButtonStart, {})}>
						Старт
					</Button>
					<Button
						className={classNames(cls.timerButtonStopUnactive, {})}
						// onClick={stopTimer}
					>
						Стоп
					</Button>
				</>
			</div>
		</div>
	)
}
