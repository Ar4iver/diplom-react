import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import IncrButtontime from 'shared/assets/icons/add_time_icon.svg'
import DecrButtontime from 'shared/assets/icons/depr_time_icon.svg'
import EditButtonTodo from 'shared/assets/icons/edit_icon.svg'
import DeleteButtonTodo from 'shared/assets/icons/delete_icon.svg'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'
import { Todo } from 'entities/Todo/model/types/todo'
import { Dropdown } from 'shared/ui/Dropdowm/Dropdown'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { addTodoFormActions } from 'features/addTodoPomodoro'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'

interface TodoItemProps {
	className?: string
	todo: Todo
}

export const TodoItem = ({ className, todo }: TodoItemProps) => {
	const dispatch = useAppDispatch()

	const [isEdit, setIsEdit] = useState(false)

	/**Берём количество отведённых помидоров из todo */
	const countPomidorTodo = useSelector(
		(state: StateSchema) =>
			state.addTodoForm.todos[todo.id - 1].isTotalPomidorForTodo
	)

	const handleRemoveTodo = (id: number) => {
		dispatch(addTodoFormActions.removeTodo(id))
	}

	const handleIncrementPomidorTodo = (id: number) => {
		dispatch(addTodoFormActions.incrementTodoPomidor(id))
	}

	const handleDecrementPomidorTodo = (id: number) => {
		if (countPomidorTodo != 1) {
			dispatch(addTodoFormActions.decrementTodoPomidor(id))
		} else {
			return
		}
	}

	const openEdit = () => {
		setIsEdit(true)
	}

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				{isEdit ? (
					<>
						<Input type="text" />
						<Button>✓</Button>
						<Button>✗</Button>
					</>
				) : (
					<>
						<div className={cls.circle}>{countPomidorTodo}</div>
						<div>{todo?.todoText}</div>
					</>
				)}
			</div>
			<div className={cls.actionBtn}>
				<Dropdown
					items={[
						{
							content: (
								<div>
									<span>
										<IncrButtontime />
									</span>
									<span>Увеличить</span>
								</div>
							),
							onClick: () => handleIncrementPomidorTodo(todo.id),
						},
						{
							content: (
								<div>
									<span>
										<DecrButtontime />
									</span>
									<span>Уменьшить</span>
								</div>
							),
							onClick: () => handleDecrementPomidorTodo(todo.id),
						},
						{
							content: (
								<div>
									<span>
										<EditButtonTodo />
									</span>
									<span>Редактировать</span>
								</div>
							),
							onClick: () => openEdit(),
						},
						{
							content: (
								<div>
									<span>
										<DeleteButtonTodo />
									</span>
									<span>Удалить</span>
								</div>
							),
							onClick: () => handleRemoveTodo(todo.id),
						},
					]}
					trigger={<ButtonActionDropdown />}
				/>
			</div>
		</div>
	)
}
