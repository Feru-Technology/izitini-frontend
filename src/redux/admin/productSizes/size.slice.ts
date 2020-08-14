import { createSlice } from '@reduxjs/toolkit'
import { ISize, HTTPError } from './size.interfaces'


export interface sizeState {
    isFetching: boolean
    error: Error | HTTPError | null
    size: ISize | null
}

const initialState: sizeState = {
    isFetching: false,
    error: null,
    size: null,
}

export const sizeSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {
        fetchingSize: (state) => {
            state.isFetching = true
            state.size = null
            state.error = null
        },
        fetchedSize: (state, { payload }) => {
            state.error = null
            state.isFetching = false
            state.size = payload
        },
        fetchFailed: (state, { payload }) => {
            state.size = null
            state.isFetching = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingSize, fetchedSize, fetchFailed } = sizeSlice.actions

export default sizeSlice.reducer
