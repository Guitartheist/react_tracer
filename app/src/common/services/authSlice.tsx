import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AppUser } from '../types'

// Define a type for the slice state
export interface AuthState {
    token: string,
    user: AppUser
}

// Define the initial state using that type
const initialState: AuthState = {
    token: '',
    user: {
        id: 0,
        email: '',
        username: '',
        password: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            state = action.payload
        }
    }
})

export const { setAuthState } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
