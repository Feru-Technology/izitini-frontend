import { createSlice } from '@reduxjs/toolkit'
import { ICart, HTTPError } from './order.interface'

export interface cartState {
    isLoading: boolean
    error: Error | HTTPError | null
    cart: ICart[]
}

const initialState: cartState = {
    isLoading: false,
    error: null,
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state) => {
            state.isLoading = true
        },
        cart: (state, { payload }) => {
            state.isLoading = false
            state.cart = [payload]
        },
        cartFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getCart, cart, cartFailed } = cartSlice.actions

export default cartSlice.reducer
