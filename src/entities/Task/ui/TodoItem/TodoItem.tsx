import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import { TaskDropdownActions } from './TaskActions'
import { formActions } from 'features/taskForm'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'

/**TypeScript Utility Types - получаем тип непосредственно из структуры */
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
		dispatch(formActions.incrementTaskPomidor(id))
	}

	const handleDecrementPomidorTask = (id: string) => {
		dispatch(formActions.decrementTaskPomidor(id))
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
					onIncrement={handleIncrementPomidorTask}
					onDecrement={handleDecrementPomidorTask}
					id={id}
					taskSummary={taskSummary}
				/>
			</div>
		</div>
	)
}
