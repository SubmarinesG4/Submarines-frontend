import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/User'

interface UserState {
	user: User | null
}

const initialState = { user: null } as UserState

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer