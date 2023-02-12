import { create } from 'zustand'

type AuthState = {
	auth: string | null
	setAuth: (arg: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	auth: localStorage.getItem("user") || null,
	setAuth: (arg: string) => {
		localStorage.setItem("user", arg)
		set(() => ({ auth: arg }))
	},
}))