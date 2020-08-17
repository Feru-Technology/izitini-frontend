import { createSlice } from '@reduxjs/toolkit'
import { IColor, HTTPError } from './color.interfaces'


export interface colorState {
    isFetching: boolean
    error: Error | HTTPError | null
    color: IColor | null
}

const initialState: colorState = {
    isFetching: false,
    error: null,
    color: null,
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        fetchingColor: (state) => {
            state.isFetching = true
            state.color = null
            state.error = null
        },
        fetchedColor: (state, { payload }) => {
            state.error = null
            state.color = payload
            state.isFetching = false
        },
        fetchFailed: (state, { payload }) => {
            state.color = null
            state.error = payload
            state.isFetching = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingColor, fetchedColor, fetchFailed } = colorSlice.actions

export default colorSlice.reducer
