import { createSlice } from '@reduxjs/toolkit'
import { IOrder, HTTPError } from './order.interface'

export interface orderState {
    fetching: boolean
    fetchError: Error | HTTPError | null
    order: IOrder | null
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
            state.fetching = true
            state.fetchError = null
            state.fetchError = null
        },
        fetchedOrder: (state, { payload }) => {
            state.fetching = false
            state.fetchError = null
            state.fetchError = payload
        },
        fetchFailed: (state, { payload }) => {
            state.fetching = false
            state.fetchError = null
            state.fetchError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingOrder, fetchedOrder, fetchFailed } = orderSlice.actions

export default orderSlice.reducer
