import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from '../../products/product.interface'

export interface ProductState {
    isFetching: boolean
    fetchError: Error | HTTPError | null
    products: IProduct[]
}

const initialState: ProductState = {
    isFetching: false,
    fetchError: null,
    products: [],
}

export const shopProductsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchingProducts: (state) => {
            state.isFetching = true
            state.fetchError = null
            state.products = []
        },
        fetchedProducts: (state, { payload }) => {
            state.isFetching = false
            state.fetchError = null
            state.products = [...payload]
        },
        fetchFailed: (state, { payload }) => {
            state.products = []
            state.isFetching = false
            state.fetchError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingProducts, fetchedProducts, fetchFailed } = shopProductsSlice.actions

export default shopProductsSlice.reducer
