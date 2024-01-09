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
import {
	selectActiveTask,
	selectActiveTaskTime,
	selectActiveTaskСountPomidor,
	setBreakTimeShort,
} from 'entities/Task/model/selectors/task'
import { store } from 'app/providers/StoreProvider/ui/StoreProvider'

const totalSeconds = 100
const timeTodos = 200

const MainPage = () => {
	

	const dispatch = useAppDispatch()
	const activeTask = useSelector(selectActiveTask)
	const tasks = useSelector((state: StateSchema) => state.tasks)

	const [ sessionCount, setSessionCount ] = useState(0)

	const [ indexTask, setIndexTask ] = useState(0)
	const [nextTask, setNextTask] = useState(false)
	const [nextPomidorTask, setNextPomidorTask] = useState(false)


	const startTimer = (indexTask: number) => {
		console.log(indexTask)
		if (indexTask < tasks.tasks.length) {
			dispatch(taskActions.setActiveTask(tasks.tasks[indexTask].id))
			const id = setInterval(() => {
				const activeTaskTime = selectActiveTaskTime(
					store.getState()
				)
				const activeTaskCountPomidor = selectActiveTaskСountPomidor(
					store.getState()
				)
				const activeTask = selectActiveTask(store.getState())
				if (activeTaskTime == 0 && activeTaskCountPomidor == 1) {
					console.log('следующая задача')
					setNextTask(true)
					clearInterval(id)
				} else {
					if (
						activeTaskTime == 0 &&
						activeTaskCountPomidor != 1
					) {
						console.log(
							'повтор помидорки',
							activeTaskCountPomidor
						)
						dispatch(
							taskActions.tickPomidorTask(activeTask!.id)
						)
						setNextPomidorTask(true)
						clearInterval(id)
					}
				}
				dispatch(taskActions.tickTimerTask())
			}, 1000)
		} else {
			console.log('Все задачи завершены')
			setIndexTask(0)
		}
	}

	

	useEffect(() => {
		if (nextPomidorTask) {
			console.log('запустилcя слудующий помидор задачи')
			startTimer(indexTask)
			setNextPomidorTask(false)
		}
	}, [nextPomidorTask])

	useEffect(() => {
		if (nextTask) {
			setIndexTask(prev => {
				const newIndex = prev + 1;
				console.log('индекс новой задачи', newIndex);
				startTimer(newIndex); 
				return newIndex;
			});
			setNextTask(false);
		}
	}, [nextTask]);

	//эффект с перерывом
	useEffect(() => {
		setSessionCount(prev => {
			if(prev === 4) {
				
			} else {
				
			}
			return prev
		})
	}, [sessionCount])

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
							onClick={() => startTimer(indexTask)}
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

// const breakTimer = (index: number) => {
// 	const breakDuration =
// 		countSessionTask > 3 ? 'breakTimeLong' : 'breakTimeShort'

// 	if (breakDuration === 'breakTimeLong') {
// 		setDuration(10)
// 		const intervalId = setInterval(() => {
// 			setDuration((prev) => {
// 				if (prev === 1) {
// 					clearInterval(intervalId)
// 					startTimer(index)
// 					return prev
// 				}
// 				return prev - 1
// 			})
// 		}, 1000)
// 		countSessionTask = 0
// 	} else if (breakDuration === 'breakTimeShort') {
// 		setDuration(5)
// 		const intervalId = setInterval(() => {
// 			setDuration((prev) => {
// 				if (prev === 1) {
// 					clearInterval(intervalId)
// 					startTimer(index)
// 					return prev
// 				}
// 				return prev - 1
// 			})
// 		}, 1000)
// 	}
// }
