import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, IPSubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isFetching: boolean
    fetchError: Error | HTTPError | null
    subCategory: IPSubCategory | null
}

const initialState: SubCategoryState = {
    isFetching: false,
    fetchError: null,
    subCategory: null,
}

export const adminSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        fetchingSubCategory: (state) => {
            state.fetchError = null
            state.isFetching = true
            state.subCategory = null
        },
        fetchedSubCategory: (state, { payload }) => {
            state.fetchError = null
            state.isFetching = false
            state.subCategory = payload
        },
        fetchFailed: (state, { payload }) => {
            state.fetchError = payload
            state.isFetching = false
            state.subCategory = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingSubCategory, fetchedSubCategory, fetchFailed } = adminSubCategorySlice.actions

export default adminSubCategorySlice.reducer
