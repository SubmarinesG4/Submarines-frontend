import { create } from 'zustand'

type AuthState = {
	auth: string | null
	setAuth: (arg: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	auth: localStorage.getItem("auth") || null,
	setAuth: (arg: string) => {
		localStorage.setItem("auth", arg)
		set(() => ({ auth: arg }))
	},
}))