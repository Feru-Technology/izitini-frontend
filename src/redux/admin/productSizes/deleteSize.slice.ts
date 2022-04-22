import { createSlice } from '@reduxjs/toolkit'
import { ISize, HTTPError } from './size.interfaces'


export interface sizeState {
    isDeletingSize: boolean
    deleteSizeError: Error | HTTPError | null
    deleted: ISize | null
}

const initialState: sizeState = {
    isDeletingSize: false,
    deleteSizeError: null,
    deleted: null,
}

export const deleteSizeSlice = createSlice({
    name: 'delete size',
    initialState,
    reducers: {
        deletingSize: (state) => {
            state.isDeletingSize = true
            state.deleted = null
            state.deleteSizeError = null
        },
        deletedSize: (state, { payload }) => {
            state.deleteSizeError = null
            state.isDeletingSize = false
            state.deleted = payload
        },
        deleteFailed: (state, { payload }) => {
            state.deleted = null
            state.isDeletingSize = false
            state.deleteSizeError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { deletingSize, deletedSize, deleteFailed } = deleteSizeSlice.actions

export default deleteSizeSlice.reducer
