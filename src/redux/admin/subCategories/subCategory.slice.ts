import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, IPSubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isFetching: boolean
    fetchError: Error | HTTPError | null
    subCategory: IPSubCategory[]
}

const initialState: SubCategoryState = {
    isFetching: false,
    fetchError: null,
    subCategory: [],
}

export const adminSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        fetchingSubCategory: (state) => {
            state.fetchError = null
            state.isFetching = true
            state.subCategory = []
        },
        fetchedSubCategory: (state, { payload }) => {
            state.fetchError = null
            state.isFetching = false
            state.subCategory = payload
        },
        fetchFailed: (state, { payload }) => {
            state.fetchError = payload
            state.isFetching = false
            state.subCategory = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingSubCategory, fetchedSubCategory, fetchFailed } = adminSubCategorySlice.actions

export default adminSubCategorySlice.reducer
