import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	user: any
}

const initialState = { user: null } as UserState

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<any>) {
			state.user = action.payload
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer