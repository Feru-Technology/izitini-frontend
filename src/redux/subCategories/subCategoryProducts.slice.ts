import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategoryProducts } from './subCategory.interface'

export interface SubCategoryProductsState {
    isLoading: boolean
    error: Error | HTTPError | null
    subCategoryProducts: ISubCategoryProducts[]
}

const initialState: SubCategoryProductsState = {
    isLoading: false,
    error: null,
    subCategoryProducts: [],
}

export const subCategoryProductsSlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        fetchingSubCategoryProducts: (state) => {
            state.isLoading = true
        },
        subCategoryProducts: (state, { payload }) => {
            state.isLoading = false
            state.subCategoryProducts = [...payload]
        },
        subCategoryProductsFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchingSubCategoryProducts, subCategoryProducts, subCategoryProductsFailed } = subCategoryProductsSlice.actions

export default subCategoryProductsSlice.reducer
