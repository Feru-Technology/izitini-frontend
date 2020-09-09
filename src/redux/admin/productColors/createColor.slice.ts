import { createSlice } from '@reduxjs/toolkit'
import { IColor, HTTPError } from './color.interfaces'


export interface colorState {
    isCreatingColor: boolean
    colorError: Error | HTTPError | null
    newColor: IColor | null
}

const initialState: colorState = {
    isCreatingColor: false,
    colorError: null,
    newColor: null,
}

export const createColorSlice = createSlice({
    name: 'create color',
    initialState,
    reducers: {
        creatingColor: (state) => {
            state.isCreatingColor = true
            state.newColor = null
            state.colorError = null
        },
        createdColor: (state, { payload }) => {
            state.colorError = null
            state.newColor = payload
            state.isCreatingColor = false
        },
        createColorFailed: (state, { payload }) => {
            state.newColor = null
            state.colorError = payload
            state.isCreatingColor = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingColor, createdColor, createColorFailed } = createColorSlice.actions

export default createColorSlice.reducer
