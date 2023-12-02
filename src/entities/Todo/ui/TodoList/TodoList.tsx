import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoList.module.scss'
import { Todo } from 'entities/Todo/model/types/todo'
import { TodoItem } from '../TodoItem/TodoItem'

interface TodoListProps {
	className?: string
	todos: Todo[]
}

export const TodoList = ({ className, todos }: TodoListProps) => {
	return (
		<div className={classNames(cls.TodoList, {}, [className])}>
			{todos?.length ? (
				todos.map((todo: Todo, id) => (
					<TodoItem todo={todo} id={id} key={id} />
				))
			) : (
				<p>Задачи отсутствуют</p>
			)}
		</div>
	)
}
