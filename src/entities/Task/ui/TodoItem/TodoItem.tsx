import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import IncrButtontime from 'shared/assets/icons/add_time_icon.svg'
import DecrButtontime from 'shared/assets/icons/depr_time_icon.svg'
import EditButtonTodo from 'shared/assets/icons/edit_icon.svg'
import DeleteButtonTodo from 'shared/assets/icons/delete_icon.svg'
import ButtonActionDropdown from 'shared/assets/icons/btn-action-dpd-todo.svg'
import { Dropdown } from 'shared/ui/Dropdowm/Dropdown'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { taskActions } from 'entities/Task/model/slice/taskSlice'
import { TaskSchema } from 'entities/Task/model/types/task'

/**TypeScript Utility Types - полчаем тип непосредственно из структуры */
type TaskId = TaskSchema['id']
type CountPomidor = TaskSchema['countPomidor']

interface TodoItemProps {
	className?: string
	id: TaskId
	taskSummary: string
	countPomidor: CountPomidor
}

export const TodoItem = (props: TodoItemProps) => {
	const { className, id, taskSummary, countPomidor } = props

	const dispatch = useAppDispatch()

	const handleRemoveTask = (id: TaskId) => {
		dispatch(taskActions.removeTask(id))
	}

	const handleIncrementPomidorTask = (id: TaskId) => {
		dispatch(taskActions.incrementTaskPomidor(id))
	}

	const handleDecrementPomidorTask = (id: TaskId) => {
		dispatch(taskActions.decrementTaskPomidor(id))
	}

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				<div className={cls.circle}>{countPomidor}</div>
				<div>{taskSummary}</div>
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
							onClick: () => handleIncrementPomidorTask(id),
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
							onClick: () => handleDecrementPomidorTask(id),
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
							onClick: () => handleRemoveTask(id),
						},
					]}
					trigger={<ButtonActionDropdown />}
				/>
			</div>
		</div>
	)
}
