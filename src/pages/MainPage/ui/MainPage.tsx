import React, { useCallback, useEffect, useState } from 'react'
import cls from './MainPage.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { formatTime } from 'shared/lib/helpers/formatTime'
import { classNames } from 'shared/lib/classNames/classNames'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { TodoList, taskActions } from 'entities/Task'
import { TodoForm } from 'features/taskForm'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'

const totalSeconds = 100
const timeTodos = 200

const MainPage = () => {


	const dispatch = useAppDispatch()
	const tasks = useSelector((state: StateSchema) => state.tasks)
	const activeTask = useSelector((state: StateSchema) => state.tasks.activeTask);
	const activeTaskTime = useSelector((state: StateSchema) => state.tasks.activeTask?.taskTime);
	const activeTaskCountPomidor = useSelector((state: StateSchema) => state.tasks.activeTask?.countPomidor);

	const [startTimerApp, setStartTimerApp] = useState(false)

	const [indexTask, setIndexTask] = useState(0)
	const [countSession, setCountSession] = useState(1)

	const [timebreakLong, setTimeBreakLong] = useState(10)
	const [timebreakShort, setTimeBreakShort] = useState(5)
	const [isBreak, setIsBreak] = useState(false)


	const startTimer = () => {
		setStartTimerApp(true)
	}


	//Выполнить то, если isBreak изменился.
	useEffect(() => {
		if (indexTask < tasks.tasks.length) {
			dispatch(taskActions.setActiveTask(tasks.tasks[indexTask].id))
			if (!isBreak) {
				if (activeTask) {
					const mainIntervalId = setInterval(() => {
						dispatch((dispatch, getState) => {
							const { activeTask } = getState().tasks
							console.log(activeTask!.taskTime)
							console.log(activeTask!.countPomidor)
							if (activeTask) {
								if (activeTask.taskTime > 0) {
									dispatch(taskActions.tickTimerTask())
								} else {
									if (activeTask.taskTime === 0 && activeTask.countPomidor === 1) {
										console.log('старт следующей задачи')
										clearInterval(mainIntervalId);
										setIndexTask(indexTask + 1)
									} else if (activeTask.taskTime === 0 && activeTask.countPomidor != 1) {
										console.log('старт следующей помидорки дял задачи')
										dispatch(taskActions.tickPomidorTask(activeTask.id))
										clearInterval(mainIntervalId);
									}
									setIsBreak(true);
									setCountSession(prevCount => prevCount + 1);
									startTimer()
								}
							}
						})
					}, 1000)
				}
			} else {
				const isbreakId = setInterval(() => {
					if (countSession === 4) {
						console.log('начался длинный перерыв')
						setTimeBreakLong(prev => {
							if (prev === 0) {
								clearInterval(isbreakId)
								setTimeBreakLong(10)
								setIsBreak(false)
							}
							return prev - 1
						})
					} else {
						console.log('начался короткий перерыв')
						setTimeBreakShort(prev => {
							if (prev === 0) {
								clearInterval(isbreakId)
								setTimeBreakShort(5)
								setIsBreak(false)
							}
							return prev - 1
						})

					}
				}, 1000)
				startTimer()
			}
		}
	}, [isBreak, startTimerApp])


	///Что будет после первого запуска приложения
	useEffect(() => {
		if (tasks.tasks.length != 0 && !activeTask) {
			console.log('вставка активной задачи c useEffect')
			dispatch(taskActions.setActiveTask(tasks.tasks[0].id))
		}
	}, [])


	return (
		<section className={cls.section__app}>
			<div className={cls.leftContent}>
				<div className={cls.task__descr}>
					<h2>Теперь можно начать работать:</h2>
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
						<TodoList tasks={tasks} />
					</div>
					<span>
						{timeTodos ? formatTime(totalSeconds, 'sumTime') : ''}
					</span>
				</div>
			</div>
			<div className={cls.rightContent}>
				<div className={classNames(cls.timerHeader, {})}>
					<div>{activeTask?.taskSummary}</div>
					<div>Помидор {activeTask?.countPomidor}</div>
				</div>
				<div className={cls.timerBlock}>
					<span className={cls.timerContent}>
						<span className={classNames(cls.timer, {})}>
							{activeTask?.taskTime
								? formatTime(activeTask?.taskTime, 'timer')
								: '00:00'}
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
					<>
						<Button
							className={classNames(cls.timerButtonStart, {})}
							onClick={() => startTimer()}
						>
							Старт
						</Button>
						<Button
							className={classNames(
								cls.timerButtonStopUnactive,
								{}
							)}
						// onClick={stopTimer}
						>
							Стоп
						</Button>
					</>
				</div>
			</div>
		</section>
	)
}

export default MainPage