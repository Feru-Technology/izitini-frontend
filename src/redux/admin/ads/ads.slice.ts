import { createSlice } from '@reduxjs/toolkit'
import { IAd, HTTPError } from './ads.interfaces'


export interface AdsState {
    isFetching: boolean
    error: Error | HTTPError | null
    ads: IAd[]
}

const initialState: AdsState = {
    isFetching: false,
    error: null,
    ads: [],
}

// all ads in the system
export const AdsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        fetchingAds: (state) => {
            state.isFetching = true
        },
        retrievedAds: (state, { payload }) => {
            state.isFetching = false
            state.ads = [...payload]
        },
        adsFailed: (state, { payload }) => {
            state.isFetching = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingAds, retrievedAds, adsFailed } = AdsSlice.actions

export default AdsSlice.reducer
