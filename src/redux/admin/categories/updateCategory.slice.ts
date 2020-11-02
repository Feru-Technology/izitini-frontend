import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface CategoryState {
    isUpdating: boolean
    error: Error | HTTPError | null
    updatedCategories: ICategory[] | null
}

const initialState: CategoryState = {
    isUpdating: false,
    error: null,
    updatedCategories: null,
}

// all categories in the system
export const UpdateCategorySlice = createSlice({
    name: 'update category',
    initialState,
    reducers: {
        updatingCategory: (state) => {
            state.error = null
            state.isUpdating = true
            state.updatedCategories = null
        },
        updated: (state, { payload }) => {
            state.error = null
            state.isUpdating = false
            state.updatedCategories = [payload]
        },
        categoriesFailed: (state, { payload }) => {
            state.error = payload
            state.isUpdating = false
            state.updatedCategories = null

        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingCategory, updated, categoriesFailed } = UpdateCategorySlice.actions

export default UpdateCategorySlice.reducer
