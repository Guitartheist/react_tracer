import { configureStore, createReducer } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api } from './services/api'
import imageReducer from "./slices/imageSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
			[api.reducerPath]: api.reducer,
			user: userReducer,
			image: imageReducer,
			product: productReducer,
			cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
