import { createSlice } from '@reduxjs/toolkit'
import { IImage, HTTPError } from './image.interfaces'


export interface imageState {
    image: IImage | null
    isUploading: boolean
    uploadError: Error | HTTPError | null
}

const initialState: imageState = {
    isUploading: false,
    uploadError: null,
    image: null,
}

export const uploadImageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        uploadingImage: (state) => {
            state.isUploading = true
            state.image = null
            state.uploadError = null
        },
        uploadedImage: (state, { payload }) => {
            state.uploadError = null
            state.image = payload
            state.isUploading = false
        },
        uploadFailed: (state, { payload }) => {
            state.image = null
            state.uploadError = payload
            state.isUploading = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { uploadingImage, uploadedImage, uploadFailed } = uploadImageSlice.actions

export default uploadImageSlice.reducer
