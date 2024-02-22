import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import { TaskDropdownActions } from './TaskActions'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { tasksActions } from 'entities/Task/model/slice/tasks'

interface TodoItemProps {
	className?: string
	id: string
	taskSummary: string
	countPomidor: number
}

export const TodoItem = (props: TodoItemProps) => {
	const dispatch = useAppDispatch()
	const { className, id, taskSummary, countPomidor } = props

	const handleIncrementPomidorTask = (id: string) => {
		dispatch(tasksActions.incrementTaskPomidor(id))
	}

	const handleDecrementPomidorTask = (id: string) => {
		dispatch(tasksActions.decrementTaskPomidor(id))
	}

	const handleRemoveTask = (id: string) => {
		dispatch(tasksActions.removeTask(id))
	}

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				<div className={cls.circle}>{countPomidor}</div>
				<>
					<div>{taskSummary}</div>
				</>
			</div>
			<div className={cls.actionBtn}>
				<TaskDropdownActions
					id={id}
					taskSummary={taskSummary}
					onRemove={handleRemoveTask}
					onIncrement={handleIncrementPomidorTask}
					onDecrement={handleDecrementPomidorTask}
				/>
			</div>
		</div>
	)
}
