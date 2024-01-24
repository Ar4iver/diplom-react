import React, { useContext, useEffect, useState, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import SettingsContext from 'app/providers/context/SettingsContext'

interface TaskTimerProps {
	className?: string
}

export const TaskTimer = (props: TaskTimerProps) => {
	const { className } = props
	const { workMinutes = 25, shortBreak = 5 } = useContext(SettingsContext)

	const [isPaused, setIsPaused] = useState(false)
	const [mode, setMode] = useState('work')
	const [startTimer, setStartTimer] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(0)

	const secondsLeftRef = useRef(secondsLeft)
	const isPausedRef = useRef(isPaused)
	const modeRef = useRef(mode)

	const switchMode = () => {
		const nextMode = modeRef.current === 'work' ? 'break' : 'work'

		const nextSeconds =
			(nextMode === 'work' ? workMinutes : shortBreak) * 60

		setMode(nextMode)
		modeRef.current = nextMode
		setSecondsLeft(nextSeconds)
		secondsLeftRef.current = nextSeconds
	}

	const initTimer = () => {
		setSecondsLeft(workMinutes * 60)
	}

	const tick = () => {
		secondsLeftRef.current--
		setSecondsLeft(secondsLeftRef.current)
	}

	const minutes = Math.floor(secondsLeft / 60)
	let seconds: number | string = secondsLeft % 60
	if (seconds < 10) seconds = '0' + seconds

	useEffect(() => {
		initTimer()
	}, [])

	useEffect(() => {
		if (!startTimer) {
			return
		}
		const intevalId = setInterval(() => {
			if (isPausedRef.current) {
				return
			}
			if (secondsLeftRef.current === 0) {
				console.log('свитч мод')
				return switchMode()
			}
			tick()
		}, 10)

		return () => clearInterval(intevalId)
	}, [startTimer])

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div className={classNames(cls.timerHeader, {})}>
				<div>Количество помидорок</div>
				<div>Помидор</div>
			</div>
			<div className={cls.timerBlock}>
				<span className={cls.timerContent}>
					<span className={classNames(cls.timer, {})}>
						{minutes + ':' + seconds}
					</span>
					<span className={cls.iconBtnActionAddTime}>
						<AddTimeBigAction />
					</span>
				</span>
			</div>
			<div className={cls.taskTimer}>
				Задача (порядковый номер в списке) - (название задачи)
			</div>
			<div className={cls.btnTimerAction}>
				{isPaused ? (
					<>
						<Button
							className={classNames(cls.timerButtonContinue, {})}
						>
							Продолжить
						</Button>
						<Button className={classNames(cls.timerButtonSkip, {})}>
							Пропустить
						</Button>
					</>
				) : (
					<>
						<Button
							className={classNames(cls.timerButtonStart, {})}
							onClick={() => setStartTimer(true)}
						>
							Старт
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
							onClick={() => setStartTimer(false)}
						>
							Стоп
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
