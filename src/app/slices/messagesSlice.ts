import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
	message: string | null
}

const initialState = { message: null } as MessageState

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessage(state, action: PayloadAction<string | null>) {
			state.message = action.payload
		},
	},
})

export const { setMessage } = messagesSlice.actions
export default messagesSlice.reducer