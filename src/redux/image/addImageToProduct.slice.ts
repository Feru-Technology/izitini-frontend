import { createSlice } from '@reduxjs/toolkit'
import { IImage, HTTPError } from './image.interfaces'


export interface imageState {
    newImage: IImage | null
    isAdding: boolean
    addError: Error | HTTPError | null
}

const initialState: imageState = {
    isAdding: false,
    addError: null,
    newImage: null,
}

export const addImageToProductSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        addingImage: (state) => {
            state.isAdding = true
            state.newImage = null
            state.addError = null
        },
        addedImage: (state, { payload }) => {
            state.addError = null
            state.newImage = payload
            state.isAdding = false
        },
        addFailed: (state, { payload }) => {
            state.newImage = null
            state.addError = payload
            state.isAdding = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { addingImage, addedImage, addFailed } = addImageToProductSlice.actions

export default addImageToProductSlice.reducer
