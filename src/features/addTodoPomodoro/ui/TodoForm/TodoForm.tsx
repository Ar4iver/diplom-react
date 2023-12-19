import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
// import { useDispatch, useSelector } from 'react-redux'

interface TodoFormProps {
	className?: string
}

/**
 * Во избежание лишних перерисовок, форму оборачиваем в memo.
 *
 * Все функции, которые передаём пропсом, оборачиваем в useCallback, чтобы ссылка на этот обьект не изменялась,
 * и после каждого рендера она не вызывалась.
 *
 */

// eslint-disable-next-line react/display-name
export const TodoForm = memo(({ className }: TodoFormProps) => {
	// const dispatch = useDispatch()

	// const text = useSelector(getAddTodoFormText)

	// const onChangeTodo = useCallback(
	// 	(value: string) => {
	// 		dispatch(addTodoFormActions.setTodoTextInput(value))
	// 	},
	// 	[dispatch]
	// )

	// const onAddTodo = useCallback(() => {
	// 	dispatch(addTodoFormActions.addTodoTextInput(text))
	// }, [dispatch, text])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				// onAddTodo()
			}}
			className={classNames(cls.TodoForm, {}, [className])}
		>
			<Input
				// onChange={onChangeTodo}
				type="text"
				placeholder="Название задачи"
				// value={text}
			/>
			<Button theme={ThemeButton.PRIMARY}>Добавить</Button>
		</form>
	)
})
