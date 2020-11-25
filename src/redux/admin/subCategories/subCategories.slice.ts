import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isLoading: boolean
    error: Error | HTTPError | null
    subCategories: ISubCategory[]
}

const initialState: SubCategoryState = {
    isLoading: false,
    error: null,
    subCategories: [],
}

export const AdminSubCategoriesSlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        fetchingSubCategories: (state) => {
            state.error = null
            state.isLoading = true
            state.subCategories = []
        },
        retrievedSubCategories: (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.subCategories = [...payload]
        },
        fetchFailed: (state, { payload }) => {
            state.error = payload
            state.isLoading = false
            state.subCategories = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingSubCategories, retrievedSubCategories, fetchFailed } = AdminSubCategoriesSlice.actions

export default AdminSubCategoriesSlice.reducer
