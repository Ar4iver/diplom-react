import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoState } from '../../model/selectors/selectTodoState/getTodoState'
import { addTodoFormActions } from '../../model/slice/addTodoPomodoroFormSlice'
import { addTodo } from '../../model/slice/addTodoPomodoroFormSlice'

interface TodoFormProps {
	className?: string
}

/**
 * Во избежание лишних перерисовок, форму оборачиваем в memo.
 *
 * Все функции, которые передаём пропсом, оборачиваем в useCallback, чтобы ссылка на этот обьект не изменялась.
 *
 */

// eslint-disable-next-line react/display-name
export const TodoForm = memo(({ className }: TodoFormProps) => {
	const dispatch = useDispatch()

	const addTodoForm = useSelector(getTodoState)

	const onChangeTodo = useCallback(
		(value: string) => {
			dispatch(addTodoFormActions.setTodo(value))
		},
		[dispatch]
	)

	const addTodoHandler = useCallback(() => {
		dispatch(addTodo())
	}, [dispatch])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				addTodoHandler()
			}}
			className={classNames(cls.TodoForm, {}, [className])}
		>
			<Input
				onChange={onChangeTodo}
				type="text"
				placeholder="Название задачи"
				value={addTodoForm.text}
			/>
			<Button theme={ThemeButton.PRIMARY}>Добавить</Button>
		</form>
	)
})
