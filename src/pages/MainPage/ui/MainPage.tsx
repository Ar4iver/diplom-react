import React, { useEffect, useState } from 'react'
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
import { timerActions } from 'features/taskTimer/model/slice/timerSlice'
import {
	getAddActiveTask,
	getAddActiveTaskTime,
} from 'features/taskTimer/model/selectors/timerState/timer'

const totalSeconds = 100
const timeTodos = 200

const MainPage = () => {
	const dispatch = useAppDispatch()
	const activeTask = useSelector(getAddActiveTask)
	const timeTask = useSelector(getAddActiveTaskTime)

	console.log(activeTask)

	const [timerId, setTimerId] = useState<NodeJS.Timeout>()
	const tasks = useSelector((state: StateSchema) => state.tasks)
	//Время активной задачи для таймера
	// const timeTask = useSelector(
	// 	(state: StateSchema) => state?.timer?.activeTask?.taskTime
	// )

	const t = () => {
		const id = setInterval(() => {
			dispatch(taskActions.tickTimerTask(activeTask.id))
		}, 1000)

		setTimerId(id)
	}

	useEffect(() => {
		if (timeTask === 0) {
			clearInterval(timerId)
		}
	}, [timeTask, timerId])

	useEffect(() => {
		dispatch(timerActions.setTimerValue(activeTask.taskTime))
		dispatch(timerActions.setActiveTask(activeTask.id))
	}, [dispatch, activeTask, tasks])

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
						<TodoList tasks={tasks} />
					</div>
					<span>
						{timeTodos ? formatTime(totalSeconds, 'sumTime') : ''}
					</span>
				</div>
			</div>
			<div className={cls.rightContent}>
				<div className={classNames(cls.timerHeader, {})}>
					<div>Название todo</div>
					<div>
						Помидор ( какой по счёту помидор для конкретной задачи )
					</div>
				</div>
				<div className={cls.timerBlock}>
					<span className={cls.timerContent}>
						<span className={classNames(cls.timer, {})}>
							{timeTask ? formatTime(timeTask, 'timer') : '00:00'}
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
							onClick={t}
							className={classNames(cls.timerButtonStart, {})}
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
				</div>
			</div>
		</section>
	)
}

export default MainPage
