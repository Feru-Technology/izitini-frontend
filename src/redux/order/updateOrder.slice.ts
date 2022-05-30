import { createSlice } from '@reduxjs/toolkit'
import { IOrder, HTTPError } from './order.interface'

export interface orderState {
    updating: boolean
    updated: IOrder | null
    updateError: Error | HTTPError | null
}

const initialState: orderState = {
    updating: false,
    updateError: null,
    updated: null,
}

export const updateOrderSlice = createSlice({
    name: 'update order',
    initialState,
    reducers: {
        updatingOrder: (state) => {
            state.updated = null
            state.updating = true
            state.updateError = null
        },
        updatedOrder: (state, { payload }) => {
            state.updated = payload
            state.updating = false
            state.updateError = null
        },
        updateFailed: (state, { payload }) => {
            state.updated = null
            state.updating = false
            state.updateError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingOrder, updatedOrder, updateFailed } = updateOrderSlice.actions

export default updateOrderSlice.reducer
