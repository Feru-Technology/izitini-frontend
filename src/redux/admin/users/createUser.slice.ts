import { createSlice } from '@reduxjs/toolkit'
import { ICreateUser, HTTPError } from './users.interface'


export interface userState {
    isLoading: boolean
    error: Error | HTTPError | null
    createdUser: ICreateUser | null
}

const initialState: userState = {
    isLoading: false,
    error: null,
    createdUser: null,
}

export const createUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        postUser: (state) => {
            state.createdUser = null
            state.isLoading = true
            state.error = null
        },
        getUser: (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.createdUser = payload
        },
        userFailed: (state, { payload }) => {
            state.createdUser = null
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { postUser, getUser, userFailed } = createUserSlice.actions

export default createUserSlice.reducer
