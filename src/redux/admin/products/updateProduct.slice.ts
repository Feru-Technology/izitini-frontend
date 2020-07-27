import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from '../../products/product.interface'


export interface productState {
    isCreating: boolean
    createError: Error | HTTPError | null
    updated: IProduct | null
}

const initialState: productState = {
    isCreating: false,
    createError: null,
    updated: null,
}

export const updateProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updatingProduct: (state) => {
            state.isCreating = true
            state.updated = null
            state.createError = null
        },
        updatedProduct: (state, { payload }) => {
            state.createError = null
            state.isCreating = false
            state.updated = payload
        },
        updateFailed: (state, { payload }) => {
            state.updated = null
            state.isCreating = false
            state.createError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingProduct, updatedProduct, updateFailed } = updateProductSlice.actions

export default updateProductSlice.reducer
