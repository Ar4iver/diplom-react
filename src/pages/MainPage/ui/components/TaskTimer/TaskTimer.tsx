import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTimer.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { TaskSchema } from 'entities/Task/types/task'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { timerActions } from 'features/task-timer/slice/taskTimer'
import { tasksActions } from 'entities/Task/model/slice/tasks'
import { selectTaskCountPomidor } from 'entities/Task/model/selectors/selectTaskCountPomidor '
import { selectTaskPomidorComplete } from 'entities/Task/model/selectors/selectTaskPomidorComplete'

interface TaskTimerProps {
	className?: string
	tasks: TaskSchema[]
}

export const TaskTimer = (props: TaskTimerProps) => {
	const { className, tasks } = props
	const [activeTask, setActiveTask] = useState<TaskSchema>(tasks[0] || null)
	const dispatch = useAppDispatch()
	const {
		secondsLeft,
		mode,
		isRunning,
		isPaused,
		workTime,
		breakTimeShort,
		breakTimeLong,
	} = useSelector((state: StateSchema) => state.timerTask)

	const countPomidor = useSelector((state: StateSchema) =>
		selectTaskCountPomidor(state.tasks, activeTask?.id)
	)

	const pomidorCompleteTask = useSelector((state: StateSchema) =>
		selectTaskPomidorComplete(state.tasks, activeTask?.id)
	)

	const handleStart = () => {
		if (tasks.length === 0) {
			return
		}
		dispatch(timerActions.startTimer())
	}

	const handlePause = () => {
		dispatch(timerActions.pauseTimer())
	}
	const handleStop = () => {
		dispatch(timerActions.stopTimer())
		dispatch(timerActions.resetSessionCount())
	}

	const handleComplete = () => {
		if (activeTask) {
			dispatch(tasksActions.completeTask(activeTask.id))
			const activeTaskIndex = tasks.findIndex(
				(task) => task.id === activeTask.id
			)
			const nextTask = tasks[activeTaskIndex + 1] || null
			setActiveTask(nextTask)
		}

		dispatch(timerActions.stopTimer())
	}

	const handleAddTime = () => {
		dispatch(timerActions.setSecondsLeft(secondsLeft + 60))
	}

	useEffect(() => {
		let interval: null | ReturnType<typeof setTimeout> = null
		if (activeTask && isRunning && !isPaused) {
			if (countPomidor && countPomidor >= 1) {
				interval = setInterval(() => {
					dispatch(timerActions.tick())
				}, 5)
			} else {
				dispatch(tasksActions.completeTask(activeTask.id))
				dispatch(timerActions.stopTimer())
			}
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isRunning, isPaused, dispatch, mode, activeTask, countPomidor])

	useEffect(() => {
		if (secondsLeft === 0) {
			if (mode === 'work' && countPomidor != null && countPomidor > 0) {
				dispatch(tasksActions.decrementTaskPomidor(activeTask?.id))
				dispatch(
					tasksActions.incrementPomidorCompleteTask(activeTask?.id)
				)
			}
			dispatch(timerActions.switchMode())
		}
	}, [
		activeTask?.id,
		countPomidor,
		dispatch,
		mode,
		secondsLeft,
		tasks.length,
	])

	useEffect(() => {
		let initialTime = 0
		switch (mode) {
			case 'work':
				initialTime = workTime * 60
				break
			case 'shortBreak':
				initialTime = breakTimeShort * 60
				break
			case 'longBreak':
				initialTime = breakTimeLong * 60
				break
			default:
				initialTime = workTime * 60
				break
		}
		dispatch(timerActions.setSecondsLeft(initialTime))
	}, [workTime, breakTimeShort, breakTimeLong, mode, dispatch])

	useEffect(() => {
		setActiveTask(tasks[0] || null)
	}, [tasks])

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div
				className={classNames(cls.timerHeader, {
					[cls.timerHeaderBreak]:
						mode === 'shortBreak' ||
						mode === 'longBreak' ||
						isPaused,
					[cls.timerHeaderWork]: mode === 'work' && isRunning,
				})}
			>
				{tasks.length ? (
					<>
						<div>{activeTask?.taskSummary}</div>
						<div>Помидоров прошло - {pomidorCompleteTask}</div>
					</>
				) : (
					''
				)}
			</div>
			<div className={cls.timerBlock}>
				<span className={cls.timerContent}>
					<span
						className={classNames(cls.timer, {
							[cls.timerWork]: mode === 'work' && isRunning,
							[cls.timerBreak]:
								mode === 'shortBreak' ||
								mode === 'longBreak' ||
								isPaused,
						})}
					>
						{Math.floor(secondsLeft / 60)}:
						{secondsLeft % 60 < 10
							? `0${secondsLeft % 60}`
							: secondsLeft % 60}
					</span>
					<Button
						className={cls.iconBtnActionAddTime}
						onClick={handleAddTime}
					>
						<AddTimeBigAction />
					</Button>
				</span>
			</div>
			<div className={cls.taskTimer}>
				{activeTask
					? `Задача ${activeTask?.tasksNumber} - ${activeTask?.taskSummary}`
					: ''}
			</div>
			<div className={cls.btnTimerAction}>
				{isRunning ? (
					<>
						<Button
							className={classNames(cls.timerButtonStart, {}, [])}
							onClick={handlePause}
						>
							Пауза
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
							onClick={handleStop}
						>
							Стоп
						</Button>
					</>
				) : isPaused ? (
					<>
						<Button
							className={classNames(cls.timerButtonStart, {}, [])}
							onClick={handleStart}
						>
							Продолжить
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
							onClick={handleComplete}
						>
							Сделано
						</Button>
					</>
				) : (
					<>
						<Button
							className={classNames(cls.timerButtonStart, {}, [])}
							onClick={handleStart}
						>
							Старт
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
							onClick={handleStop}
						>
							Стоп
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
