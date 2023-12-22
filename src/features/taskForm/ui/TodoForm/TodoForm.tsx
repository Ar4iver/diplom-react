import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useSelector } from 'react-redux'
import { taskActions } from 'entities/Task'
import { formActions } from 'features/taskForm/model/slice/formSlice'
import { getAddTaskFormText } from 'features/taskForm/model/selectors/selectFormState/taskForm'

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
			dispatch(formActions.setTaskTextInput(value))
		},
		[dispatch]
	)

	const addTask = useCallback(() => {
		dispatch(taskActions.addTaskToList(taskSummary))
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
				type="text"
				placeholder="Название задачи"
				value={taskSummary}
			/>
			<Button onClick={addTask} theme={ThemeButton.PRIMARY}>
				Добавить
			</Button>
		</form>
	)
})
