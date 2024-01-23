import React, { useState, useEffect, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { getWorkTime } from 'features/task-timer/selectors/selectWorkTime'
import { useSelector } from 'react-redux'
import { getBreakShortTime } from 'features/task-timer/selectors/selectBreakShortTime'

interface TaskTimerProps {
	className?: string
}

export const TaskTimer = (props: TaskTimerProps) => {
	const { className } = props

	const workTimeTask = useSelector(getWorkTime)
	const breakShortTime = useSelector(getBreakShortTime)
	const [secondsLeft, setSecondsLeft] = useState(0)
	const [isPaused, setIsPaused] = useState(true)
	const [mode, setMode] = useState('work')

	const secondsLeftRef = useRef(secondsLeft)
	const isPausedRef = useRef(isPaused)
	const modeRef = useRef(mode)

	const initTimer = () => {
		setSecondsLeft(workTimeTask * 60)
	}

	const switchMode = () => {
		const nextMode = modeRef.current === 'work' ? 'break' : 'work'
		const nextSeconds =
			(nextMode === 'work' ? workTimeTask : breakShortTime) * 60
		setMode(nextMode)
		modeRef.current = nextMode

		setSecondsLeft(nextSeconds)
		secondsLeftRef.current = nextSeconds
	}

	const tick = () => {
		secondsLeftRef.current--
		setSecondsLeft(secondsLeftRef.current)
	}

	useEffect(() => {
		initTimer()

		const mainIdInt = setInterval(() => {
			if (isPausedRef.current) {
				return
			}

			if (secondsLeftRef.current === 0) {
				return switchMode()
			}

			tick()
		}, 1000)

		return clearInterval(mainIdInt)
	}, [workTimeTask])

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
					>
						Стоп
					</Button>
				</>
			</div>
		</div>
	)
}
