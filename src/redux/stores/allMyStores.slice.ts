import { createSlice } from '@reduxjs/toolkit'
import { IStore, HTTPError } from './store.interfaces';


export interface StoreState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    stores: IStore[];
}

const initialState: StoreState = {
    isLoading: false,
    error: null,
    stores: [],
}

// all stores
export const AllStoresSlice = createSlice({
    name: 'all stores',
    initialState,
    reducers: {
        fetchingStores: (state) => {
            state.isLoading = true;
        },
        retrievedStores: (state, { payload }) => {
            state.isLoading = false;
            state.stores = [...state.stores, ...payload]
        },
        retrievedStoreFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { fetchingStores, retrievedStores, retrievedStoreFailed } = AllStoresSlice.actions
export default AllStoresSlice.reducer
