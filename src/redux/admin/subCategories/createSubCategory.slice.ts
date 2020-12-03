import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isCreating: boolean
    createError: Error | HTTPError | null
    subCategory: ISubCategory | null
}

const initialState: SubCategoryState = {
    isCreating: false,
    createError: null,
    subCategory: null,
}

export const createSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        creatingSubCategory: (state) => {
            state.createError = null
            state.isCreating = true
            state.subCategory = null
        },
        createdSubCategory: (state, { payload }) => {
            state.createError = null
            state.isCreating = false
            state.subCategory = payload
        },
        createFailed: (state, { payload }) => {
            state.createError = payload
            state.isCreating = false
            state.subCategory = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingSubCategory, createdSubCategory, createFailed } = createSubCategorySlice.actions

export default createSubCategorySlice.reducer
