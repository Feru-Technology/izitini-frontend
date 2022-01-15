import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from './product.interface'

export interface ProductState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    products: IProduct[];
}

const initialState: ProductState = {
    isLoading: false,
    error: null,
    products: [],
}

export const allStoreProductsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchingProducts: (state) => {
            state.isLoading = true;
        },
        retrievedProducts: (state, { payload }) => {
            state.isLoading = false;
            state.products = [...state.products, ...payload]
        },
        retrievedProductFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { fetchingProducts, retrievedProducts, retrievedProductFailed } = allStoreProductsSlice.actions

export default allStoreProductsSlice.reducer
