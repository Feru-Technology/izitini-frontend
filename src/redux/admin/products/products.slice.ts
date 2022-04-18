import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from '../../products/product.interface'

export interface ProductState {
    isFetching: boolean;
    error: Error | HTTPError | null;
    products: IProduct[];
}

const initialState: ProductState = {
    isFetching: false,
    error: null,
    products: [],
}

export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchingProducts: (state) => {
            state.isFetching = true;
        },
        fetchedProducts: (state, { payload }) => {
            state.isFetching = false;
            state.products = [...payload]
        },
        fetchFailed: (state, { payload }) => {
            state.isFetching = false;
            state.error = payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingProducts, fetchedProducts, fetchFailed } = productsSlice.actions

export default productsSlice.reducer
