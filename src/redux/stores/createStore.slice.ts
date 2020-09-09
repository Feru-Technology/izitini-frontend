import { createSlice } from '@reduxjs/toolkit'
import { IStore, HTTPError } from './store.interfaces'


export interface storeState {
    isCreating: boolean
    error: Error | HTTPError | null
    createdStore: IStore | null
}

const initialState: storeState = {
    isCreating: false,
    error: null,
    createdStore: null,
}

export const createStoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addStore: (state) => {
            state.createdStore = null
            state.isCreating = true
            state.error = null
        },
        getStore: (state, { payload }) => {
            state.isCreating = false
            state.error = null
            state.createdStore = payload
        },
        storeFailed: (state, { payload }) => {
            state.createdStore = null
            state.isCreating = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addStore, getStore, storeFailed } = createStoreSlice.actions

export default createStoreSlice.reducer
