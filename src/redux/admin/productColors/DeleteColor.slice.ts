import { createSlice } from '@reduxjs/toolkit'
import { IColor, HTTPError } from './color.interfaces'


export interface colorState {
    isDeletingColor: boolean
    deleteColorError: Error | HTTPError | null
    deleted: IColor | null
}

const initialState: colorState = {
    isDeletingColor: false,
    deleteColorError: null,
    deleted: null,
}

export const deleteColorSlice = createSlice({
    name: 'create color',
    initialState,
    reducers: {
        deletingColor: (state) => {
            state.isDeletingColor = true
            state.deleted = null
            state.deleteColorError = null
        },
        deletedColor: (state, { payload }) => {
            state.deleteColorError = null
            state.deleted = payload
            state.isDeletingColor = false
        },
        deleteColorFailed: (state, { payload }) => {
            state.deleted = null
            state.deleteColorError = payload
            state.isDeletingColor = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { deletingColor, deletedColor, deleteColorFailed } = deleteColorSlice.actions

export default deleteColorSlice.reducer
