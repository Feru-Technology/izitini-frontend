import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isCreating: boolean
    createError: Error | HTTPError | null
    subCategories: ISubCategory | null
}

const initialState: SubCategoryState = {
    isCreating: false,
    createError: null,
    subCategories: null,
}

export const createSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        creatingSubCategories: (state) => {
            state.createError = null
            state.isCreating = true
            state.subCategories = null
        },
        createdSubCategory: (state, { payload }) => {
            state.createError = null
            state.isCreating = false
            state.subCategories = payload
        },
        createFailed: (state, { payload }) => {
            state.createError = payload
            state.isCreating = false
            state.subCategories = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { creatingSubCategories, createdSubCategory, createFailed } = createSubCategorySlice.actions

export default createSubCategorySlice.reducer
