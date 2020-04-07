import { createSlice } from '@reduxjs/toolkit'
import { IAd, HTTPError } from './ads.interfaces'


export interface adState {
    isDeleting: boolean
    error: Error | HTTPError | null
    deleted: IAd | null
}

const initialState: adState = {
    isDeleting: false,
    error: null,
    deleted: null,
}

export const deleteAdSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        deletingAd: (state) => {
            state.isDeleting = true
            state.deleted = null
            state.error = null
        },
        deletedAd: (state, { payload }) => {
            state.error = null
            state.isDeleting = false
            state.deleted = payload
        },
        deleteFailed: (state, { payload }) => {
            state.deleted = null
            state.isDeleting = false
            state.error = payload
        }
    },
})

// Action deletors are generated for each case reducer function
export const { deletingAd, deletedAd, deleteFailed } = deleteAdSlice.actions

export default deleteAdSlice.reducer
