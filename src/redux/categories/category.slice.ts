import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface categoryState {
    isLoading: boolean
    error: Error | HTTPError | null
    currentCategory: ICategory | null
}

const initialState: categoryState = {
    isLoading: false,
    error: null,
    currentCategory: null,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategory: (state) => {
            state.isLoading = true
            state.currentCategory = null
            state.error = null
        },
        category: (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.currentCategory = payload
        },
        categoryFailed: (state, { payload }) => {
            state.currentCategory = null
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getCategory, category, categoryFailed } = categorySlice.actions

export default categorySlice.reducer
