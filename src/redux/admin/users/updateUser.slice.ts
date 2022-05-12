import { createSlice } from '@reduxjs/toolkit'
import { IUser, HTTPError } from './users.interface'


export interface userState {
    isUpdating: boolean
    updatedUser: IUser | null
    updateError: Error | HTTPError | null
}

const initialState: userState = {
    isUpdating: false,
    updateError: null,
    updatedUser: null,
}

export const updateUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updatingUser: (state) => {
            state.isUpdating = true
            state.updateError = null
        },
        updated: (state, { payload }) => {
            state.updateError = null
            state.isUpdating = false
            state.updatedUser = payload
        },
        updateFailed: (state, { payload }) => {
            state.isUpdating = false
            state.updateError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingUser, updated, updateFailed } = updateUserSlice.actions

export default updateUserSlice.reducer
