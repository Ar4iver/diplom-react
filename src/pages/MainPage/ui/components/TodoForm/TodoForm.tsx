import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { actionsTaskActions } from 'features/actions-task/model/slice/actions-task'
import { getAddTaskFormText } from 'features/actions-task/model/selectors/selectTaskText'

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
	const dispatch = useAppDispatch()
	const taskSummary = useSelector(getAddTaskFormText)

	const onChangeTask = useCallback(
		(value: string) => {
			dispatch(actionsTaskActions.setTaskTextInput(value))
		},
		[dispatch]
	)

	const addTask = useCallback(() => {
		dispatch(actionsTaskActions.addTask(taskSummary))
	}, [dispatch, taskSummary])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
			className={classNames(cls.TodoForm, {}, [className])}
		>
			<Input
				onChange={onChangeTask}
				value={taskSummary}
				type="text"
				placeholder="Название задачи"
			/>
			<Button onClick={addTask} theme={ThemeButton.PRIMARY}>
				Добавить
			</Button>
		</form>
	)
})