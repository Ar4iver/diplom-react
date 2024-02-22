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

	const handleStart = () => {
		if (mode === 'idle' || secondsLeft === 0) {
			const initialTime =
				mode === 'work'
					? workTime * 60
					: mode === 'shortBreak'
					? breakTimeShort * 60
					: breakTimeLong * 60
			dispatch(timerActions.setSecondsLeft(initialTime))
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

	const handleSwitchMode = () => {
		dispatch(timerActions.switchMode())
	}
	const handleAddTime = () => {
		dispatch(timerActions.setSecondsLeft(secondsLeft + 60))
	}

	useEffect(() => {
		console.log('useEffect начал работу')
		console.log(isRunning, 'таймер идёт или нет')
		console.log(isPaused, 'таймер на или нет')
		console.log(mode, 'какой mode')
		let interval: null | ReturnType<typeof setTimeout> = null
		if (isRunning && !isPaused) {
			console.log('запуск таймера')
			interval = setInterval(() => {
				dispatch(timerActions.tick())
			}, 10)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isRunning, isPaused, dispatch, mode])

	useEffect(() => {
		if (secondsLeft === 0) {
			dispatch(timerActions.switchMode())
		}
	}, [dispatch, secondsLeft])

	useEffect(() => {
		setActiveTask(tasks[0] || null)
	}, [tasks])

	return (
		<div className={classNames(cls.TaskTimer, {}, [className])}>
			<div className={classNames(cls.timerHeader, {})}>
				{tasks.length ? (
					<>
						<div>{activeTask?.taskSummary}</div>
						<div>Помидоров прошло</div>
					</>
				) : (
					''
				)}
			</div>
			<div className={cls.timerBlock}>
				<span className={cls.timerContent}>
					<span className={classNames(cls.timer, {})}>
						{Math.floor(secondsLeft / 60)}:
						{secondsLeft % 60 < 10
							? `0${secondsLeft % 60}`
							: secondsLeft % 60}
					</span>
					<Button className={cls.iconBtnActionAddTime}>
						<AddTimeBigAction />
					</Button>
				</span>
			</div>
			<div className={cls.taskTimer}>
				Здесь будет название активной задачи
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
