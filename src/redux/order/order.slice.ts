import { createSlice } from '@reduxjs/toolkit'
import { IOrder, HTTPError } from './order.interface'

export interface orderState {
    fetching: boolean
    order: IOrder | null
    fetchError: Error | HTTPError | null
}

const initialState: orderState = {
    fetching: false,
    fetchError: null,
    order: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchingOrder: (state) => {
            state.order = null
            state.fetching = true
            state.fetchError = null
        },
        fetchedOrder: (state, { payload }) => {
            state.order = payload
            state.fetching = false
            state.fetchError = null
        },
        fetchFailed: (state, { payload }) => {
            state.order = null
            state.fetching = false
            state.fetchError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingOrder, fetchedOrder, fetchFailed } = orderSlice.actions

export default orderSlice.reducer
