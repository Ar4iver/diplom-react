import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import IncrButtontime from 'shared/assets/icons/add_time_icon.svg'
import DecrButtontime from 'shared/assets/icons/depr_time_icon.svg'
import EditButtonTodo from 'shared/assets/icons/edit_icon.svg'
import DeleteButtonTodo from 'shared/assets/icons/delete_icon.svg'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'
import { Dropdown } from 'shared/ui/Dropdowm/Dropdown'

interface TodoItemProps {
	className?: string
	id: number
	taskSummary: string
	countPomidor: number
}

export const TodoItem = (props: TodoItemProps) => {
	const { className } = props

	// const handleRemoveTodo = () => {}

	// const handleIncrementPomidorTodo = () => {}

	// const handleDecrementPomidorTodo = () => {}

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				<div className={cls.circle}>
					(количество помидоров для задачи)
				</div>
				<div>(описание задачи)</div>
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
							// onClick: () => handleIncrementPomidorTodo(todo.id),
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
							// onClick: () => handleDecrementPomidorTodo(todo.id),
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
							// onClick: () => openEdit(),
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
							// onClick: () => handleRemoveTodo(todo.id),
						},
					]}
					trigger={<ButtonActionDropdown />}
				/>
			</div>
		</div>
	)
}
