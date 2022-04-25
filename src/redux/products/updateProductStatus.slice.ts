import { createSlice } from '@reduxjs/toolkit'
import { IProduct, HTTPError } from './product.interface'


export interface productState {
    isUpdatingStatus: boolean
    statusUpdateError: Error | HTTPError | null
    newProductStatus: IProduct | null
}

const initialState: productState = {
    isUpdatingStatus: false,
    statusUpdateError: null,
    newProductStatus: null,
}

export const updateProductStatusSlice = createSlice({
    name: 'product status',
    initialState,
    reducers: {
        updatingProductStatus: (state) => {
            state.isUpdatingStatus = true
            state.newProductStatus = null
            state.statusUpdateError = null
        },
        updatedProductStatus: (state, { payload }) => {
            state.statusUpdateError = null
            state.isUpdatingStatus = false
            state.newProductStatus = payload
        },
        failedToUpdateStatus: (state, { payload }) => {
            state.newProductStatus = null
            state.isUpdatingStatus = false
            state.statusUpdateError = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingProductStatus, updatedProductStatus, failedToUpdateStatus } = updateProductStatusSlice.actions

export default updateProductStatusSlice.reducer
