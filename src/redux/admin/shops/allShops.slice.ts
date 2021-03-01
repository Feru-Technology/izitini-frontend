import { createSlice } from '@reduxjs/toolkit'
import { IShop, HTTPError } from './Shop.interfaces'


export interface ShopState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    shops: IShop[];
}

const initialState: ShopState = {
    isLoading: false,
    error: null,
    shops: [],
}

// all my Shop
export const AllShopSlice = createSlice({
    name: 'all Shop',
    initialState,
    reducers: {
        fetchingShop: (state) => {
            state.isLoading = true;
        },
        retrievedShop: (state, { payload }) => {
            state.isLoading = false;
            state.shops = [...state.shops, ...payload]
        },
        retrievedShopFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { fetchingShop, retrievedShop, retrievedShopFailed } = AllShopSlice.actions
export default AllShopSlice.reducer
