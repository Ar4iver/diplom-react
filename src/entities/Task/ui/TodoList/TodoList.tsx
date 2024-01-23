import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoList.module.scss'
import { TodoItem } from '../TodoItem/TodoItem'
import { TaskSchema } from 'entities/Task/types/task'

interface TodoListProps {
	className?: string
	tasks: TaskSchema[]
}

export const TodoList = ({ className, tasks }: TodoListProps) => {
	return (
		<div className={classNames(cls.TodoList, {}, [className])}>
			{tasks.length != 0
				? tasks.map((task: TaskSchema, index) => (
						<TodoItem {...task} key={index} />
				))
				: 'Список задач пуст, добавьте задачу!'}
		</div>
	)
}
