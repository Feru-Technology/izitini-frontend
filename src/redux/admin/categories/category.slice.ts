import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface categoryState {
    isFetching: boolean
    error: Error | HTTPError | null
    category: ICategory | null
}

const initialState: categoryState = {
    isFetching: false,
    error: null,
    category: null,
}

export const adminCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchingCategory: (state) => {
            state.isFetching = true
            state.category = null
            state.error = null
        },
        fetchedCategory: (state, { payload }) => {
            state.error = null
            state.isFetching = false
            state.category = payload
        },
        fetchFailed: (state, { payload }) => {
            state.category = null
            state.isFetching = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingCategory, fetchedCategory, fetchFailed } = adminCategorySlice.actions

export default adminCategorySlice.reducer
