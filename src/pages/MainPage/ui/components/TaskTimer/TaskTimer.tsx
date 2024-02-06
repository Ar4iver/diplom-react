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

	const [mode, setMode] = useState('')
	const [startTimer, setStartTimer] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(0)
	const [sessionCount, setSessionCount] = useState(0)
	const [pomidorCount, setPomidorCount] = useState(0)
	const [stop, setStop] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	let queueTaskIndex: number = 0
	const [activerTask, setActiveTask] = useState(
		tasks.length != 0 ? tasks[queueTaskIndex] : null
	)

	///******* Как обновлять значение из useSelect и в интервале использовать актуальное значение из Redux */

	/**
	 * 1) Получаем через useSelect значение
	 * 2) Делаем состояние useState, передаём в начальное значение наше из useSelect
	 * 3) Через useEffect обновляем значение используя set-функцию.
	 */

	const countPomidorActiveTask = useSelector(
		(store: StateSchema) =>
			store.actionsTaskSlice?.tasks[queueTaskIndex]?.countPomidor
	)

	const [countPomidorSelect, setCountPomidorSelect] = useState(
		countPomidorActiveTask ? countPomidorActiveTask : 0
	)

	useEffect(() => {
		setCountPomidorSelect(
			countPomidorActiveTask ? countPomidorActiveTask : 0
		)
	}, [countPomidorActiveTask])

	///******************************************************************************************************/

	const secondsLeftRef = useRef(secondsLeft)
	const modeRef = useRef(mode)
	const sessionCountRef = useRef(sessionCount)
	const isPausedRef = useRef(isPaused)

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

	const stopTimer = () => {
		setMode('stop')
		modeRef.current = 'stop'
	}

	const addTimeTask = () => {
		if (mode === '' || mode === 'work') {
			secondsLeftRef.current = secondsLeftRef.current + 60
		}
	}

	const initTimer = () => {
		if (stop && workMinutes) {
			secondsLeftRef.current = workMinutes * 60
		}
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

	const tick = () => {
		secondsLeftRef.current--
		setSecondsLeft(secondsLeftRef.current)

		if (modeRef.current === 'work' && secondsLeftRef.current === 0) {
			tickPomidorCount()
			checkPomidorSession()
		}
	}

	const tickSessionCount = () => {
		sessionCountRef.current++
		setSessionCount(sessionCountRef.current)
	}

	const taskDoneAction = (id: string) => {
		dispatch(actionsTaskActions.removeTask(id))
	}

	const checkPomidorSession = () => {
		setPomidorCount((prev) => prev + 1)
	}

	const minutes = Math.floor(secondsLeft / 60)
	let seconds: number | string = secondsLeft % 60
	if (seconds < 10) seconds = '0' + seconds

	useEffect(() => {
		initTimer()
	}, [activerTask, tasks.length, workMinutes, stop])

	useEffect(() => {
		if (!startTimer) {
			return
		}
		if (isPaused) {
			return
		}

		if (tasks.length === 0) {
			setMode('stop')
			modeRef.current = 'stop'
			setStartTimer(false)
			return
		}

		const intevalId = setInterval(() => {
			if (isPausedRef.current) {
				initTimer()
			}
			if (secondsLeftRef.current === 0) {
				if (modeRef.current === 'work') {
					tickSessionCount()
				}
				if (countPomidorSelect === 0) {
					dispatch(
						actionsTaskActions.removeTask(tasks[queueTaskIndex].id)
					)
					queueTaskIndex++
					setActiveTask(tasks[queueTaskIndex])
					setPomidorCount(0)
				}
				return switchMode()
			}
			tick()
		}, 10)

		return () => clearInterval(intevalId)
	}, [startTimer, isPaused, tasks.length, countPomidorSelect, stop])

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div
				className={classNames(cls.timerHeader, {
					[cls.timerHeader]: mode === 'stop',
					[cls.timerHeaderWork]: mode === 'work',
					[cls.timerHeaderBreak]: mode === 'break',
					[cls.timerHeaderPaused]: mode === 'paused',
					[cls.timerHeaderLongBreak]: mode === 'longBreak',
				})}
			>
				{tasks.length ? (
					<>
						<div>{activerTask?.taskSummary}</div>
						<div>Помидоров прошло: {pomidorCount}</div>
					</>
				) : (
					''
				)}
			</div>
			<div
				className={cls.timerBlock}
				onClick={() => console.log(modeRef.current)}
			>
				<span className={cls.timerContent}>
					<span
						className={classNames(cls.timer, {
							[cls.timer]: mode === 'stop',
							[cls.timerWork]: mode === 'work',
							[cls.timerBreak]: mode === 'break',
							[cls.timerPaused]: mode === 'paused',
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
				{activerTask && tasks.length ? (
					<>
						Задача {activerTask?.serialNumber} -{' '}
						{activerTask?.taskSummary}
					</>
				) : (
					'Здесь будет название активной задачи'
				)}
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
						<Button
							className={classNames(
								cls.timerButtonStopActive,
								{}
							)}
							onClick={() => {
								stopTimer()
								setStartTimer(false)
								setStop(true)
								setIsPaused(false)
							}}
						>
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
						{modeRef.current === 'break' ||
						modeRef.current === 'longBreak' ? (
							<Button
								className={classNames(cls.timerButtonDone, {})}
								onClick={() => {
									switchMode()
								}}
							>
								Пропустить
							</Button>
						) : (
							<Button
								className={classNames(cls.timerButtonDone, {})}
								onClick={() => {
									setStartTimer(false)
									setIsPaused(false)
									taskDoneAction(activerTask!.id)
									stopTimer()
								}}
							>
								Сделано
							</Button>
						)}
					</>
				) : (
					<>
						<Button
							disabled={tasks.length === 0}
							className={classNames(cls.timerButtonStart, {}, [])}
							onClick={() => {
								switchMode()
								setStop(false)
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
						>
							Стоп
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
