import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import thunk from 'redux-thunk'
import { taskReducer } from 'features/addTodoPomodoro'
import { useDispatch } from 'react-redux'

/***
 * ReducersMapObject - позволяет структурировать и обьединять множество редьюсеров
 * в одно целостное глобальное состояние. В нашем случае, rootReducers используется
 * для создания основного редьюсера, который затем передается в configureStore.
 *
 */

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		tasks: taskReducer,
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
