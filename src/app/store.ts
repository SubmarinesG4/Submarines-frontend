import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { api } from "./services/api";
import userSlice from "./slices/userSlice"
import messagesSlice from "./slices/messagesSlice"

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		userSlice,
		messagesSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
