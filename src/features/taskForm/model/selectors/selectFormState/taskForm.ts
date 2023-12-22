import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getAddTaskFormText = (state: StateSchema) =>
	state?.form?.taskSummaryInput

export const getAddTaskEditText = (state: StateSchema) =>
	state?.form?.taskSummaryEditInput
