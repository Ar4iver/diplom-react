import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoList.module.scss'
import { TodoItem } from '../TodoItem/TodoItem'
import { TaskSchema, TasksState } from 'entities/Task/model/types/task'

interface TodoListProps {
	className?: string
	tasks: TasksState
}

export const TodoList = ({ className, tasks: { tasks } }: TodoListProps) => {
	return (
		<div className={classNames(cls.TodoList, {}, [className])}>
			{Object.values(tasks).map((task: TaskSchema, index) => (
				<TodoItem {...task} key={index} />
			))}
		</div>
	)
}
