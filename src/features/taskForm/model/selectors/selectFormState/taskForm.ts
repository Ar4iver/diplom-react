import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getAddTaskFormText = (state: StateSchema) =>
	state?.createTaskformSlice?.taskSummaryInput
