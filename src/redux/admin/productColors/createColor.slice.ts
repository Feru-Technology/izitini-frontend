import { createSlice } from '@reduxjs/toolkit'
import { IColor, HTTPError } from './color.interfaces'


export interface colorState {
    isCreating: boolean
    colorError: Error | HTTPError | null
    newColor: IColor | null
}

const initialState: colorState = {
    isCreating: false,
    colorError: null,
    newColor: null,
}

export const createColorSlice = createSlice({
    name: 'create color',
    initialState,
    reducers: {
        creatingColor: (state) => {
            state.isCreating = true
            state.newColor = null
            state.colorError = null
        },
        cratedColor: (state, { payload }) => {
            state.colorError = null
            state.newColor = payload
            state.isCreating = false
        },
        createColorFailed: (state, { payload }) => {
            state.newColor = null
            state.colorError = payload
            state.isCreating = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingColor, cratedColor, createColorFailed } = createColorSlice.actions

export default createColorSlice.reducer
