import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'

interface TodoItemProps {
	className?: string
}

export const TodoItem = ({ className }: TodoItemProps) => {
	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			Задача: Создать сайт
		</div>
	)
}
