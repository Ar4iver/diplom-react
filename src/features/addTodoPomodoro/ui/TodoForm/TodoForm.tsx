import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoForm.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { formActions } from 'features/addTodoPomodoro/model/slice/formSlice'
import { getAddTodoFormText } from 'features/addTodoPomodoro/model/selectors/selectTodoState/addTodoFormSelectors'
import { useSelector } from 'react-redux'
import { taskActions } from 'features/addTodoPomodoro/model/slice/taskSlice'
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
	const dispatch = useAppDispatch()

	const taskSummary = useSelector(getAddTodoFormText)

	const onChangeTask = useCallback(
		(value: string) => {
			dispatch(formActions.setTodoTextInput(value))
		},
		[dispatch]
	)

	// const onAddTodo = useCallback(() => {
	// 	dispatch(addTodoFormActions.addTodoTextInput(text))
	// }, [dispatch, text])

	const addTask = () => {
		dispatch(taskActions.addTaskToList(taskSummary))
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				// onAddTodo()
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
