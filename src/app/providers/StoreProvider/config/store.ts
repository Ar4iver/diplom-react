import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { addTodoFormReducer } from 'features/addTodoPomodoro'

/***
 * ReducersMapObject - позволяет структурировать и обьединять множество редьюсеров
 * в одно целостное глобальное состояние. В нашем случае, rootReducers используется
 * для создания основного редьюсера, который затем передается в configureStore.
 *
 */

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		addTodoForm: addTodoFormReducer,
	}

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState,
	})
}
