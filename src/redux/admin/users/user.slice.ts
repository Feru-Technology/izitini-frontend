import { createSlice } from '@reduxjs/toolkit'
import { IUser, HTTPError } from './users.interface'


export interface userState {
    isLoading: boolean
    error: Error | HTTPError | null
    currentUser: IUser | null
}

const initialState: userState = {
    isLoading: false,
    error: null,
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state) => {
            state.isLoading = true
            state.currentUser = null
            state.error = null
        },
        user: (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.currentUser = payload
        },
        userFailed: (state, { payload }) => {
            state.currentUser = null
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, user, userFailed } = userSlice.actions

export default userSlice.reducer
