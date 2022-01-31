import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from './product.interface'


export interface productState {
    isLoading: boolean
    error: Error | HTTPError | null
    product: IProduct | null
}

const initialState: productState = {
    isLoading: false,
    error: null,
    product: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProduct: (state) => {
            state.isLoading = true
        },
        product: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.product = payload
        },
        productFailed: (state, { payload }) => {
            state.isLoading = false
            state.product = null
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getProduct, product, productFailed } = productSlice.actions

export default productSlice.reducer
