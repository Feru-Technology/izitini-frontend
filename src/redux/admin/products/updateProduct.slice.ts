import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from '../../products/product.interface'


export interface productState {
    isUpdating: boolean
    updateError: Error | HTTPError | null
    updated: IProduct | null
}

const initialState: productState = {
    isUpdating: false,
    updateError: null,
    updated: null,
}

export const updateProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updatingProduct: (state) => {
            state.isUpdating = true
            state.updated = null
            state.updateError = null
        },
        updatedProduct: (state, { payload }) => {
            state.updateError = null
            state.isUpdating = false
            state.updated = payload
        },
        updateFailed: (state, { payload }) => {
            state.updated = null
            state.isUpdating = false
            state.updateError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingProduct, updatedProduct, updateFailed } = updateProductSlice.actions

export default updateProductSlice.reducer
