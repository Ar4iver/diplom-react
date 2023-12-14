import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import IncrButtontime from 'shared/assets/icons/add_time_icon.svg'
import DecrButtontime from 'shared/assets/icons/depr_time_icon.svg'
import EditButtonTodo from 'shared/assets/icons/edit_icon.svg'
import DeleteButtonTodo from 'shared/assets/icons/delete_icon.svg'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'
import { Todo } from 'entities/Todo/model/types/todo'
import { Dropdown } from 'shared/ui/Dropdowm/Dropdown'
import { useDispatch } from 'react-redux'
import { addTodoFormActions } from 'features/addTodoPomodoro'

interface TodoItemProps {
	className?: string
	todo: Todo
	id: number
}

export const TodoItem = ({ className, todo, id }: TodoItemProps) => {
	const dispatch = useDispatch()

	const handleRemoveTodo = useCallback(
		(id: number) => {
			dispatch(addTodoFormActions.removeTodo(id))
		},
		[dispatch]
	)

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				<div className={cls.circle}>{id}</div>
				<div>{todo?.todoText}</div>
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
							onClick: () => handleRemoveTodo(id),
						},
					]}
					trigger={<ButtonActionDropdown />}
				/>
			</div>
		</div>
	)
}
