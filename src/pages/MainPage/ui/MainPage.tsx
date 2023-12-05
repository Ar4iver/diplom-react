import React from 'react'
import cls from './MainPage.module.scss'
import AddTimeBigAction from 'shared/assets/icons/btn__action__timer__add_big.svg'
import { TodoForm } from 'features/addTodoPomodoro'
import { TodoList } from 'entities/Todo'
import { useSelector } from 'react-redux'
import { getTodos } from 'features/addTodoPomodoro/model/selectors/selectTodoState/addTodoFormSelectors'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

const MainPage = () => {
	const todos = useSelector(getTodos)

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
					<div className={cls.todoList}>
						<TodoForm />
					</div>
					<TodoList todos={todos} />
				</div>
			</div>
			<div className={cls.rightContent}>
				<div className={cls.timerHeader}>
					<div>Сверстать сайт</div>
					<div>Помидор 1</div>
				</div>
				<div className={cls.timerBlock}>
					<span className={cls.timerContent}>
						<span className={cls.timer}>25:00</span>
						<span className={cls.iconBtnActionAddTime}>
							<AddTimeBigAction />
						</span>
					</span>
				</div>
				<div className={cls.taskTimer}>Задача 1 - Сверстать сайт</div>
				<div className={cls.btnTimerAction}>
					<Button theme={ThemeButton.PRIMARY}>Старт</Button>
					<Button theme={ThemeButton.OUTLINE}>Стоп</Button>
				</div>
			</div>
		</section>
	)
}

export default MainPage
