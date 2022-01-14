import { createSlice } from '@reduxjs/toolkit'
import { IStore, HTTPError } from './store.interfaces';


export interface storeState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    store: IStore | null;
}

const initialState: storeState = {
    isLoading: false,
    error: null,
    store: null,
}

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        getStore: (state) => {
            state.isLoading = true;
        },
        store: (state, { payload }) => {
            state.isLoading = false;
            state.store = payload;
        },
        storeFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { getStore, store, storeFailed } = storeSlice.actions

export default storeSlice.reducer
