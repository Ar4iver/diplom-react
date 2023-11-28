import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItemList.module.scss'
import { TodoItem } from '../TodoItem/TodoItem'

interface TodoItemListProps {
	className?: string
}

export const TodoItemList = ({ className }: TodoItemListProps) => {
	return (
		<div className={classNames(cls.TodoItemList, {}, [className])}>
			<TodoItem />
		</div>
	)
}
