import React from 'react'
import cls from './MainPage.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { Button } from 'shared/ui/Button/Button'
import { formatTime } from 'shared/lib/helpers/formatTime'
import { classNames } from 'shared/lib/classNames/classNames'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { TodoList } from 'entities/Task'
import { TodoForm } from 'features/taskForm'

const totalSeconds = 10
const timeTodo = 5

const MainPage = () => {
	const tasks = useSelector((state: StateSchema) => state.tasks)

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
						{timeTodo ? formatTime(totalSeconds, 'sumTime') : ''}
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
							{timeTodo ? formatTime(timeTodo, 'timer') : '00:00'}
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
						>
							Пауза
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
