import { createSlice } from '@reduxjs/toolkit'
import { IUser, HTTPError } from './users.interface'


export interface UsersState {
    isLoading: boolean
    error: Error | HTTPError | null
    users: IUser[]
}

const initialState: UsersState = {
    isLoading: false,
    error: null,
    users: [],
}

// all users
export const usersSlice = createSlice({
    name: 'all users',
    initialState,
    reducers: {
        fetchingUsers: (state) => {
            state.isLoading = true
            state.error = null
            state.users = []
        },
        retrievedUsers: (state, { payload }) => {
            state.isLoading = false
            state.users = payload
        },
        retrievedUserFailed: (state, { payload }) => {
            state.isLoading = false
            state.users = []
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingUsers, retrievedUsers, retrievedUserFailed } = usersSlice.actions

export default usersSlice.reducer
