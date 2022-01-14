import { createSlice } from '@reduxjs/toolkit'

export interface IProduct {
    id: string;
    name: string;
    image_url: string;
    brand: string
    unit: string
    shop_id: string
    specification: string
    manual: string
    quantity: string
    status: string
    price: number
};
export interface HTTPError { status: number; message: string }
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

export const allProductSlice = createSlice({
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
export const { fetchingProducts, retrievedProducts, retrievedProductFailed } = allProductSlice.actions

export default allProductSlice.reducer
