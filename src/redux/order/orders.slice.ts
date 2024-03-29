import { createSlice } from '@reduxjs/toolkit'
import { IOrders, HTTPError } from './order.interface'

export interface ordersState {
    isLoading: boolean
    error: Error | HTTPError | null
    orders: IOrders[] | null
}

const initialState: ordersState = {
    isLoading: false,
    error: null,
    orders: [],
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrders: (state) => {
            state.isLoading = true
            state.orders = null
            state.error = null
        },
        orders: (state, { payload }) => {
            state.isLoading = false
            state.orders = payload
            state.error = null
        },
        ordersFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
            state.orders = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { getOrders, orders, ordersFailed } = ordersSlice.actions

export default ordersSlice.reducer
