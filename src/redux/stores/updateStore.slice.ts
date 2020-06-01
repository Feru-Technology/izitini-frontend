import { createSlice } from '@reduxjs/toolkit'
import { IStore, HTTPError } from './store.interfaces'


export interface storeState {
    isUpdating: boolean
    updateError: Error | HTTPError | null
    updatedStore: IStore | null
}

const initialState: storeState = {
    isUpdating: false,
    updateError: null,
    updatedStore: null,
}

export const updateStoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        updatingStore: (state) => {
            state.updatedStore = null
            state.isUpdating = true
            state.updateError = null
        },
        updated: (state, { payload }) => {
            state.isUpdating = false
            state.updateError = null
            state.updatedStore = payload
        },
        updateFailed: (state, { payload }) => {
            state.updatedStore = null
            state.isUpdating = false
            state.updateError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingStore, updated, updateFailed } = updateStoreSlice.actions

export default updateStoreSlice.reducer
