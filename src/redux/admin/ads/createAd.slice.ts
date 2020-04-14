import { createSlice } from '@reduxjs/toolkit'
import { IAd, HTTPError } from './ads.interfaces'


export interface adState {
    iAdLoading: boolean
    error: Error | HTTPError | null
    ad: IAd | null
}

const initialState: adState = {
    iAdLoading: false,
    error: null,
    ad: null,
}

export const createAdSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        createAd: (state) => {
            state.iAdLoading = true
            state.ad = null
            state.error = null
        },
        createdAd: (state, { payload }) => {
            state.error = null
            state.iAdLoading = false
            state.ad = payload
        },
        createFailed: (state, { payload }) => {
            state.ad = null
            state.iAdLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { createAd, createdAd, createFailed } = createAdSlice.actions

export default createAdSlice.reducer
