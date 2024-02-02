import React, { useContext, useEffect, useState, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { TaskSchema } from 'entities/Task/types/task'
import SettingsContext from 'shared/lib/settings/SettingsContext'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { actionsTaskActions } from 'features/actions-task/model/slice/actions-task'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

interface TaskTimerProps {
	className?: string
	tasks: TaskSchema[]
}

export const TaskTimer = (props: TaskTimerProps) => {
	const { className, tasks } = props

	const { workMinutes, shortBreak, longBreak } = useContext(SettingsContext)

	const dispatch = useAppDispatch()

	const [isPaused, setIsPaused] = useState(false)
	const [mode, setMode] = useState('')
	const [startTimer, setStartTimer] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(0)
	const [sessionCount, setSessionCount] = useState(0)

	let queueTaskIndex: number = 0
	const [activerTask, setActiveTask] = useState(
		tasks.length != 0 ? tasks[queueTaskIndex] : null
	)

	const countPomidorActiveTask = useSelector(
		(store: StateSchema) =>
			store.actionsTaskSlice?.tasks[queueTaskIndex]?.countPomidor
	)

	const [countPomidorSelect, setCountPomidorSelect] = useState(
		countPomidorActiveTask ? countPomidorActiveTask : 0
	)

	const secondsLeftRef = useRef(secondsLeft)
	const isPausedRef = useRef(isPaused)
	const modeRef = useRef(mode)
	const sessionCountRef = useRef(sessionCount)

	const switchMode = () => {
		const nextMode =
			modeRef.current === 'work'
				? sessionCountRef.current === 4
					? 'longBreak'
					: 'break'
				: 'work'
		if (sessionCountRef.current === 4) {
			sessionCountRef.current = 0
		}

		const nextSeconds =
			(nextMode === 'work'
				? workMinutes!
				: nextMode === 'longBreak'
				? longBreak!
				: shortBreak!) * 60

		setMode(nextMode)
		modeRef.current = nextMode
		setSecondsLeft(nextSeconds)
		secondsLeftRef.current = nextSeconds
	}

	const addTimeTask = () => {
		if (mode === '' || mode === 'work') {
			console.log('work на добавление')
			secondsLeftRef.current = secondsLeftRef.current + 60
		}
	}

	const initTimer = () => {
		setSecondsLeft(workMinutes! * 60)
		if (tasks.length === 0) {
			return
		} else {
			setActiveTask(tasks[queueTaskIndex])
		}
	}

	const tickPomidorCount = () => {
		dispatch(actionsTaskActions.decrementTaskPomidor(activerTask!.id))
		setCountPomidorSelect((prevCount) => prevCount - 1)
	}

	useEffect(() => {
		setCountPomidorSelect(countPomidorActiveTask)
	}, [countPomidorActiveTask])

	const tick = () => {
		secondsLeftRef.current--
		setSecondsLeft(secondsLeftRef.current)

		if (modeRef.current === 'work' && secondsLeftRef.current === 0) {
			tickPomidorCount()
			if (countPomidorSelect <= 1) {
				dispatch(
					actionsTaskActions.removeTask(tasks[queueTaskIndex].id)
				)
				queueTaskIndex++
				setActiveTask(tasks[queueTaskIndex])
			}
		}
	}

	const tickSessionCount = () => {
		sessionCountRef.current++
		setSessionCount(sessionCountRef.current)
		console.log(sessionCountRef.current)
	}

	const minutes = Math.floor(secondsLeft / 60)
	let seconds: number | string = secondsLeft % 60
	if (seconds < 10) seconds = '0' + seconds

	useEffect(() => {
		initTimer()
	}, [activerTask, tasks, workMinutes])

	useEffect(() => {
		if (!startTimer) {
			return
		}
		if (isPaused) {
			return
		}

		if (tasks.length === 0) {
			setMode('')
			setStartTimer(false)
			return
		}

		const intevalId = setInterval(() => {
			if (isPausedRef.current) {
				initTimer()
			}
			if (secondsLeftRef.current === 0) {
				if (modeRef.current === 'work') {
					console.log('Изменил каунт сессии')
					tickSessionCount()
				}
				console.log('свитч мод')
				return switchMode()
			}
			tick()
		}, 10)

		return () => clearInterval(intevalId)
	}, [startTimer, isPaused, tasks.length])

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div
				className={classNames(cls.timerHeader, {
					[cls.timerHeaderWork]: mode === 'work',
					[cls.timerHeaderBreak]: mode === 'break',
					[cls.timerHeaderLongBreak]: mode === 'longBreak',
				})}
			>
				<div>Количество помидорок</div>
				<div>Помидор</div>
			</div>
			<div className={cls.timerBlock}>
				<span className={cls.timerContent}>
					<span
						className={classNames(cls.timer, {
							[cls.timerWork]: mode === 'work',
							[cls.timerBreak]: mode === 'break',
							[cls.timerLongBreak]: mode === 'longBreak',
						})}
					>
						{minutes + ':' + seconds}
					</span>
					<Button
						onClick={addTimeTask}
						className={cls.iconBtnActionAddTime}
					>
						<AddTimeBigAction />
					</Button>
				</span>
			</div>
			<div className={cls.taskTimer}>
				Задача (порядковый номер в списке) -{' '}
				{activerTask && tasks.length
					? activerTask.taskSummary
					: 'Задачи не найдены'}
			</div>
			<div className={cls.btnTimerAction}>
				{startTimer ? (
					<>
						<Button
							className={classNames(cls.timerButtonPaused, {})}
							onClick={() => {
								setIsPaused(true)
								setStartTimer(false)
							}}
						>
							Пауза
						</Button>
						<Button className={classNames(cls.timerButtonSkip, {})}>
							Стоп
						</Button>
					</>
				) : isPaused ? (
					<>
						<Button
							className={classNames(cls.timerButtonStart, {})}
							onClick={() => {
								setIsPaused(false)
								setStartTimer(true)
							}}
						>
							Продолжить
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
							onClick={() => {
								setStartTimer(false)
								setIsPaused(false)
							}}
						>
							Сделано
						</Button>
					</>
				) : (
					<>
						<Button
							disabled={tasks.length === 0}
							className={classNames(cls.timerButtonStart, {}, [])}
							onClick={() => {
								setStartTimer(true)
								setIsPaused(false)
							}}
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
