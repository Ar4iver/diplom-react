import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoList.module.scss'
import { TodoItem } from '../TodoItem/TodoItem'
import { TaskState } from 'features/addTodoPomodoro'
import { TaskSchema } from 'entities/Todo/model/types/todo'

interface TodoListProps {
	className?: string
	tasks: TaskState
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
