import { createSlice } from '@reduxjs/toolkit'
import { IStore, HTTPError } from './store.interfaces'


export interface storeState {
    isLoading: boolean
    error: Error | HTTPError | null
    createdStore: IStore | null
}

const initialState: storeState = {
    isLoading: false,
    error: null,
    createdStore: null,
}

export const createStoreSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addStore: (state) => {
            state.createdStore = null
            state.isLoading = true
            state.error = null
        },
        getStore: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.createdStore = payload
        },
        storeFailed: (state, { payload }) => {
            state.createdStore = null
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addStore, getStore, storeFailed } = createStoreSlice.actions

export default createStoreSlice.reducer
