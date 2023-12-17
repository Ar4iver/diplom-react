import React, { useEffect, useState } from 'react'
import cls from './MainPage.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { TodoForm, addTodoFormActions } from 'features/addTodoPomodoro'
import { TodoList } from 'entities/Todo'
import { useSelector } from 'react-redux'
import { getTodos } from 'features/addTodoPomodoro/model/selectors/selectTodoState/addTodoFormSelectors'
import { Button } from 'shared/ui/Button/Button'
import { formatTime } from 'shared/lib/helpers/formatTime'
import { classNames } from 'shared/lib/classNames/classNames'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'

const MainPage = () => {
	const dispatch = useAppDispatch()
	const todos = useSelector(getTodos)
	const [timerId, setTimerId] = useState<NodeJS.Timeout>()
	const activeTodo = todos.length > 0 ? todos[0] : null

	// const completeTodo = useSelector(
	// 	(state: StateSchema) => state.addTodoForm.todos[0].complete
	// )

	const isTimeRunning = useSelector(
		(state: StateSchema) => state?.addTodoForm?.todos[0]?.isTimerRunning
	)

	// const isTimerStop = useSelector(
	// 	(state: StateSchema) => state?.addTodoForm?.todos[0]?.isTimerStop
	// )

	const isTimerPaused = useSelector(
		(state: StateSchema) => state?.addTodoForm?.todos[0]?.isTimerPaused
	)

	const isTimerPausedBreak = useSelector(
		(state: StateSchema) => state?.addTodoForm?.todos[0]?.isTimerPausedBreak
	)

	// const isTimerFinish = useSelector(
	// 	(state: StateSchema) => state?.addTodoForm?.todos[0]?.isTimerFinish
	// )

	const timeTodo = activeTodo?.timeToComplete

	const totalSeconds = todos.reduce(
		(acc, todo) => acc + todo.timeToComplete,
		0
	)

	const handleStartButtonClick = () => {
		if (activeTodo) {
			dispatch(addTodoFormActions.startTimer(activeTodo.id))
		}

		const id = setInterval(() => {
			if (activeTodo?.id) {
				dispatch(addTodoFormActions.tickTimer(activeTodo.id))
			}
		}, 1000)

		setTimerId(id)
	}

	const handlePausedButtonClick = () => {
		console.log('Пауза')
		if (activeTodo?.id) {
			dispatch(addTodoFormActions.pauseTimer(activeTodo?.id))
		}
	}
	const handleResumeButtonClick = () => {
		console.log('Продолжить')
		if (activeTodo?.id) {
			dispatch(addTodoFormActions.resumeTimer(activeTodo?.id))
			if (activeTodo) {
				dispatch(addTodoFormActions.startTimer(activeTodo.id))
			}

			const id = setInterval(() => {
				if (activeTodo?.id) {
					dispatch(addTodoFormActions.tickTimer(activeTodo.id))
				}
			}, 1000)

			setTimerId(id)
		}
	}
	const handleStopButtonClick = () => {
		console.log('Стоп')
		if (activeTodo) {
			dispatch(addTodoFormActions.stopTimer(activeTodo?.id))
		}
	}
	// const handleCompleteButtonClick = () => {
	// 	console.log('Сделано')
	// }
	const handleSkipButtonClick = () => {
		console.log('Пропустить')
	}

	/**
	 * Наблюдаем за изменением isTimeRunning, isTimerPaused, timeTodo, timerId чтобы отработать остановку таймера
	 */
	useEffect(() => {
		if (!isTimeRunning || isTimerPaused) {
			clearInterval(timerId)
		}
	}, [isTimeRunning, isTimerPaused, timeTodo, timerId])

	return (
		<section className={cls.section__app}>
			<div className={cls.leftContent}>
				<div className={cls.task__descr}>
					<h2>Ура! Теперь можно начать работать:</h2>
					<ul>
						<li>Выберите категорию и напишите название задачи</li>
						<li>Запустите таймер («помидор»)</li>
						<li>Работайте пока помидор не прозвонит</li>
						<li>Сделайте короткий перерыв (3-5 минут)</li>
						<li>
							Продолжайте работать «помидор» за «помидором», пока
							задача <br /> не будет выполнена. Каждые 4
							«помидора» делайте длинный <br /> перерыв (15-30
							минут)
						</li>
					</ul>
				</div>
				<div className={cls.todosContainer}>
					<div className={cls.todoForm}>
						<TodoForm />
					</div>
					<div className={cls.todoList}>
						<TodoList todos={todos} />
					</div>
					<span>
						{timeTodo ? formatTime(totalSeconds, 'sumTime') : ''}
					</span>
				</div>
			</div>
			<div className={cls.rightContent}>
				<div
					className={classNames(cls.timerHeader, {
						[cls.timerHeaderActiver]: isTimeRunning,
					})}
				>
					<div>{activeTodo?.todoText}</div>
					<div>Помидор {activeTodo?.id}</div>
				</div>
				<div className={cls.timerBlock}>
					<span className={cls.timerContent}>
						<span
							className={classNames(cls.timer, {
								[cls.timerActive]: isTimeRunning,
							})}
						>
							{timeTodo ? formatTime(timeTodo, 'timer') : '00:00'}
						</span>
						<span className={cls.iconBtnActionAddTime}>
							<AddTimeBigAction />
						</span>
					</span>
				</div>
				<div className={cls.taskTimer}>
					Задача {activeTodo?.id} - {activeTodo?.todoText}
				</div>
				<div className={cls.btnTimerAction}>
					{isTimeRunning ? (
						<>
							<Button
								className={classNames(cls.timerButtonStart, {})}
								onClick={handlePausedButtonClick}
							>
								Пауза
							</Button>
							<Button
								className={classNames(
									cls.timerButtonStopUnactive,
									{
										[cls.timerButtonStopActive]:
											isTimeRunning,
									}
								)}
							>
								Стоп
							</Button>
						</>
					) : isTimerPaused ? (
						<>
							<Button
								className={classNames(cls.timerButtonStart, {})}
								onClick={handleResumeButtonClick}
							>
								Продолжить
							</Button>
							<Button
								className={classNames(
									cls.timerButtonStopUnactive,
									{
										[cls.timerButtonStopActive]:
											isTimerPaused,
									}
								)}
								onClick={handleSkipButtonClick}
							>
								Пропустить
							</Button>
						</>
					) : isTimerPausedBreak ? (
						<>
							<Button
								className={classNames(cls.timerButtonStart, {})}
								onClick={handleStopButtonClick}
							>
								Продолжить
							</Button>
							<Button
								className={classNames(
									cls.timerButtonStopUnactive,
									{
										[cls.timerButtonStopActive]:
											isTimerPausedBreak,
									}
								)}
								onClick={handleSkipButtonClick}
							>
								Пропустить
							</Button>
						</>
					) : (
						<>
							<Button
								className={classNames(cls.timerButtonStart, {})}
								onClick={handleStartButtonClick}
							>
								Старт
							</Button>
							<Button
								className={classNames(
									cls.timerButtonStopUnactive,
									{
										[cls.timerButtonStopActive]:
											isTimeRunning,
									}
								)}
							>
								Стоп
							</Button>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default MainPage
