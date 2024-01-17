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

	return (
		<div>
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
						onClick: () => onIncrement && onIncrement(id),
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
						onClick: () => onDecrement && onDecrement(id),
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
						onClick: () => onEdit && onEdit(id, taskSummary),
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
						onClick: () => onRemove && onRemove(id),
					},
				]}
				trigger={<ButtonActionDropdown />}
			/>
		</div>
	)
}
