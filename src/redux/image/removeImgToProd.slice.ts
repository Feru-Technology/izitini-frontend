import { createSlice } from '@reduxjs/toolkit'
import { IImage, HTTPError } from './image.interfaces'


export interface imageState {
    isRemovingImg: boolean
    removeImgError: Error | HTTPError | null
    removedImgRes: IImage | null
}

const initialState: imageState = {
    isRemovingImg: false,
    removeImgError: null,
    removedImgRes: null,
}

export const removeImgToProdSlice = createSlice({
    name: 'create image',
    initialState,
    reducers: {
        removingImg: (state) => {
            state.isRemovingImg = true
            state.removedImgRes = null
            state.removeImgError = null
        },
        removedImg: (state, { payload }) => {
            state.removeImgError = null
            state.removedImgRes = payload
            state.isRemovingImg = false
        },
        removeImgFailed: (state, { payload }) => {
            state.removedImgRes = null
            state.removeImgError = payload
            state.isRemovingImg = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { removingImg, removedImg, removeImgFailed } = removeImgToProdSlice.actions

export default removeImgToProdSlice.reducer
