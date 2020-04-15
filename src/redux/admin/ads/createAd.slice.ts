import { createSlice } from '@reduxjs/toolkit'
import { IAd, HTTPError } from './ads.interfaces'


export interface adState {
    isCreating: boolean
    error: Error | HTTPError | null
    ad: IAd | null
}

const initialState: adState = {
    isCreating: false,
    error: null,
    ad: null,
}

export const createAdSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        creatingAd: (state) => {
            state.isCreating = true
            state.ad = null
            state.error = null
        },
        createdAd: (state, { payload }) => {
            state.error = null
            state.isCreating = false
            state.ad = payload
        },
        createFailed: (state, { payload }) => {
            state.ad = null
            state.isCreating = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingAd, createdAd, createFailed } = createAdSlice.actions

export default createAdSlice.reducer
