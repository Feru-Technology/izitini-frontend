import { createSlice } from '@reduxjs/toolkit'
import { IShop, HTTPError } from './Shop.interfaces'


export interface shopState {
    isLoading: boolean
    error: Error | HTTPError | null
    currentShop: IShop | null
}

const initialState: shopState = {
    isLoading: false,
    error: null,
    currentShop: null,
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        getShop: (state) => {
            state.isLoading = true
            state.error = null
            state.currentShop = null
        },
        shop: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.currentShop = payload
        },
        shopFailed: (state, { payload }) => {
            state.isLoading = false
            state.currentShop = null
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getShop, shop, shopFailed } = shopSlice.actions

export default shopSlice.reducer
