import { createSlice } from '@reduxjs/toolkit'
import { ISize, HTTPError } from './size.interfaces'


export interface sizeState {
    isCreating: boolean
    sizeError: Error | HTTPError | null
    newSize: ISize | null
}

const initialState: sizeState = {
    isCreating: false,
    sizeError: null,
    newSize: null,
}

export const createSizeSlice = createSlice({
    name: 'create size',
    initialState,
    reducers: {
        creatingSize: (state) => {
            state.isCreating = true
            state.newSize = null
            state.sizeError = null
        },
        createdSize: (state, { payload }) => {
            state.sizeError = null
            state.isCreating = false
            state.newSize = payload
        },
        createFailed: (state, { payload }) => {
            state.newSize = null
            state.isCreating = false
            state.sizeError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingSize, createdSize, createFailed } = createSizeSlice.actions

export default createSizeSlice.reducer
