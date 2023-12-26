import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TodoItem.module.scss'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { taskActions } from 'entities/Task/model/slice/taskSlice'
import {
	CountPomidor,
	TaskId,
	TaskSummary,
} from 'entities/Task/model/types/task'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { formActions } from 'features/taskForm'
import { TaskDropdownActions } from './TaskActions'
import { timerActions } from 'features/taskTimer/model/slice/timerSlice'

/**TypeScript Utility Types - полчаем тип непосредственно из структуры */
interface TodoItemProps {
	className?: string
	id: TaskId
	taskSummary: TaskSummary
	countPomidor: CountPomidor
}

export const TodoItem = (props: TodoItemProps) => {
	const { className, id, taskSummary, countPomidor } = props

	const [edit, setEdit] = useState(false)

	const openEdit = () => {
		setEdit(true)
	}

	const dispatch = useAppDispatch()

	const editTaskText = useSelector(
		(state: StateSchema) => state.form.taskSummaryEditInput
	)

	const handleRemoveTask = (id: TaskId) => {
		dispatch(taskActions.removeTask(id))
	}

	const handleIncrementPomidorTask = (id: TaskId) => {
		dispatch(taskActions.incrementTaskPomidor(id))
	}

	const handleDecrementPomidorTask = (id: TaskId) => {
		dispatch(taskActions.decrementTaskPomidor(id))
	}

	const handleEditTask = (id: TaskId, taskSummary: TaskSummary) => {
		dispatch(taskActions.editTask({ id, taskSummary }))
		setEdit(false)
	}

	const handleChangeStateTask = (id: TaskId) => {
		console.log(id)
		dispatch(timerActions.setActiveTask(id))
	}

	const onChangeEditTask = (value: string) => {
		dispatch(formActions.setTaskEditInput(value))
	}

	return (
		<div className={classNames(cls.TodoItem, {}, [className])}>
			<div className={cls.contentTodo}>
				<div className={cls.circle}>{countPomidor}</div>
				{edit ? (
					<>
						<Input
							onChange={onChangeEditTask}
							type="text"
							value={editTaskText}
						/>
						<Button
							onClick={() => handleEditTask(id, editTaskText)}
						>
							✓
						</Button>
						<Button onClick={() => setEdit(false)}>✗</Button>
					</>
				) : (
					<>
						<div>{taskSummary}</div>
					</>
				)}
			</div>
			<div className={cls.actionBtn}>
				<TaskDropdownActions
					id={id}
					taskSummary={taskSummary}
					onIncrement={handleIncrementPomidorTask}
					onDecrement={handleDecrementPomidorTask}
					onEdit={openEdit}
					onRemove={handleRemoveTask}
					onChangeState={handleChangeStateTask}
				/>
			</div>
		</div>
	)
}
