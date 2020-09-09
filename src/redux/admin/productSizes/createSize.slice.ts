import { createSlice } from '@reduxjs/toolkit'
import { ISize, HTTPError } from './size.interfaces'


export interface sizeState {
    isCreatingSize: boolean
    sizeError: Error | HTTPError | null
    newSize: ISize | null
}

const initialState: sizeState = {
    isCreatingSize: false,
    sizeError: null,
    newSize: null,
}

export const createSizeSlice = createSlice({
    name: 'create size',
    initialState,
    reducers: {
        creatingSize: (state) => {
            state.isCreatingSize = true
            state.newSize = null
            state.sizeError = null
        },
        createdSize: (state, { payload }) => {
            state.sizeError = null
            state.isCreatingSize = false
            state.newSize = payload
        },
        createFailed: (state, { payload }) => {
            state.newSize = null
            state.isCreatingSize = false
            state.sizeError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingSize, createdSize, createFailed } = createSizeSlice.actions

export default createSizeSlice.reducer
