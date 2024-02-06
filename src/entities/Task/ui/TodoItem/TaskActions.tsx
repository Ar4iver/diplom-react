import React from 'react'
import IncrButtontime from 'shared/assets/icons/add_time_icon.svg'
import DecrButtontime from 'shared/assets/icons/depr_time_icon.svg'
import EditButtonTodo from 'shared/assets/icons/edit_icon.svg'
import DeleteButtonTodo from 'shared/assets/icons/delete_icon.svg'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'
import { Dropdown } from 'shared/ui/Dropdowm/Dropdown'

interface TaskActionsProps {
	onIncrement?: (id: string) => void
	onDecrement?: (id: string) => void
	onEdit?: (id: string, taskSummary: string) => void
	onRemove?: (id: string) => void
	id: string
	taskSummary: string
}

export const TaskDropdownActions = (props: TaskActionsProps) => {
	const { onIncrement, onDecrement, onEdit, onRemove, id, taskSummary } =
		props

	const handleIncrement = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (onIncrement) onIncrement(id)
	}

	const handleDecrement = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (onDecrement) onDecrement(id)
	}

	const handleEdit = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (onEdit) onEdit(id, taskSummary)
	}

	const handleRemove = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (onRemove) onRemove(id)
	}

	return (
		<div>
			<Dropdown
				items={[
					{
						content: (
							<div onClick={handleIncrement}>
								<span>
									<IncrButtontime />
								</span>
								<span>Увеличить</span>
							</div>
						),
					},
					{
						content: (
							<div onClick={handleDecrement}>
								<span>
									<DecrButtontime />
								</span>
								<span>Уменьшить</span>
							</div>
						),
					},
					{
						content: (
							<div onClick={handleEdit}>
								<span>
									<EditButtonTodo />
								</span>
								<span>Редактировать</span>
							</div>
						),
					},
					{
						content: (
							<div onClick={handleRemove}>
								<span>
									<DeleteButtonTodo />
								</span>
								<span>Удалить</span>
							</div>
						),
					},
				]}
				trigger={<ButtonActionDropdown />}
			/>
		</div>
	)
}
