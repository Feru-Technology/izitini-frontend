import { createSlice } from '@reduxjs/toolkit'
import { IOrder, HTTPError } from './order.interface'

export interface orderState {
    isLoading: boolean
    error: Error | HTTPError | null
    order: IOrder | null
}

const initialState: orderState = {
    isLoading: false,
    error: null,
    order: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrder: (state) => {
            state.isLoading = true
            state.order = null
            state.error = null
        },
        order: (state, { payload }) => {
            state.isLoading = false
            state.order = payload
            state.error = null
        },
        orderFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
            state.order = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { getOrder, order, orderFailed } = orderSlice.actions

export default orderSlice.reducer
