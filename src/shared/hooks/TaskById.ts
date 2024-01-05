import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { useSelector } from 'react-redux'

export const useTaskById = (id: string) => {
	return useSelector((state: StateSchema) =>
		state.tasks.tasks.find((task) => task.id === id)
	)
}
