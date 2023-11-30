import React from 'react'
import styles from './MainPage.module.scss'
import { TodoForm } from 'features/addTodoPomodoro'

const MainPage = () => {
	return (
		<section className="section__app">
			<div className={styles.task__descr}>
				<h2>Ура! Теперь можно начать работать:</h2>
				<ul>
					<li>Выберите категорию и напишите название задачи</li>
					<li>Запустите таймер («помидор»)</li>
					<li>Работайте пока помидор не прозвонит</li>
					<li>Сделайте короткий перерыв (3-5 минут)</li>
					<li>
						Продолжайте работать «помидор» за «помидором», пока
						задача <br /> не будет выполнена. Каждые 4 «помидора»
						делайте длинный <br /> перерыв (15-30 минут)
					</li>
				</ul>
			</div>
			<div>
				<TodoForm />
			</div>
		</section>
	)
}

export default MainPage
