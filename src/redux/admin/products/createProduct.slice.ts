import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from '../../products/product.interface'


export interface productState {
    isCreating: boolean
    createError: Error | HTTPError | null
    product: IProduct | null
}

const initialState: productState = {
    isCreating: false,
    createError: null,
    product: null,
}

export const createProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        creatingProduct: (state) => {
            state.isCreating = true
            state.product = null
            state.createError = null
        },
        createdProduct: (state, { payload }) => {
            state.createError = null
            state.isCreating = false
            state.product = payload
        },
        createFailed: (state, { payload }) => {
            state.product = null
            state.isCreating = false
            state.createError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingProduct, createdProduct, createFailed } = createProductSlice.actions

export default createProductSlice.reducer
