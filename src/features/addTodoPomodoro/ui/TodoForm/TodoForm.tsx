import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Todo.module.scss'
import { Button } from 'shared/ui/Button/Button'

interface TodoFormProps {
	className?: string
}

export const TodoForm = ({ className }: TodoFormProps) => {
	return (
		<div className={classNames(cls.TodoForm, {}, [className])}>
			<input type="text" />
			<Button>Добавить</Button>
		</div>
	)
}
