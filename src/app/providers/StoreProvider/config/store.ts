import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import thunk from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { actionsTaskReducer } from 'features/actions-task/model/slice/actions-task'
import { timerReducer } from 'features/task-timer/slice/taskTimer'
import { tasksReducer } from 'entities/Task/model/slice/tasks'
import { chartReducer } from 'features/chart/model/slice/chartAnalitic'

/***
 * ReducersMapObject - позволяет структурировать и обьединять множество редьюсеров
 * в одно целостное глобальное состояние. В нашем случае, rootReducers используется
 * для создания основного редьюсера, который затем передается в configureStore.
 *
 */

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		actionsTaskSlice: actionsTaskReducer,
		timerTask: timerReducer,
		tasks: tasksReducer,
		chart: chartReducer,
	}

	return configureStore<StateSchema>({
		reducer: rootReducers,
		middleware: [thunk],
		devTools: __IS_DEV__,
		preloadedState: initialState,
	})
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
