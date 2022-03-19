import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface CategoryState {
    isLoading: boolean
    error: Error | HTTPError | null
    categories: ICategory[]
}

const initialState: CategoryState = {
    isLoading: false,
    error: null,
    categories: [],
}

// all categories
export const AllCategoriesSlice = createSlice({
    name: 'all categories',
    initialState,
    reducers: {
        fetchingCategories: (state) => {
            state.isLoading = true
        },
        retrievedCategories: (state, { payload }) => {
            state.isLoading = false
            state.categories = [payload]
        },
        retrievedCategoryFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingCategories, retrievedCategories, retrievedCategoryFailed } = AllCategoriesSlice.actions

export default AllCategoriesSlice.reducer
