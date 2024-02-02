import React from 'react'
import cls from './MainPage.module.scss'
import { TodoList } from 'entities/Task'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { TodoForm } from 'pages/MainPage/ui/components/TodoForm/TodoForm'
import { TaskTimer } from './components/TaskTimer/TaskTimer'

const MainPage = () => {
	const tasks = useSelector(
		(state: StateSchema) => state.actionsTaskSlice.tasks
	)
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
					<span>суммарное время всех задач</span>
				</div>
			</div>
			<div className={cls.rightContent}>
				<TaskTimer tasks={tasks} />
			</div>
		</section>
	)
}

export default MainPage
