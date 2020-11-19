import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface CategoryState {
    isUpdating: boolean
    updateError: Error | HTTPError | null
    updatedCategories: ICategory[]
}

const initialState: CategoryState = {
    isUpdating: false,
    updateError: null,
    updatedCategories: [],
}

// all categories in the system
export const UpdateCategorySlice = createSlice({
    name: 'update category',
    initialState,
    reducers: {
        updatingCategory: (state) => {
            state.updateError = null
            state.isUpdating = true
            state.updatedCategories = []
        },
        updated: (state, { payload }) => {
            state.updateError = null
            state.isUpdating = false
            state.updatedCategories = [payload]
        },
        updateFailed: (state, { payload }) => {
            state.updateError = payload
            state.isUpdating = false
            state.updatedCategories = []

        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingCategory, updated, updateFailed } = UpdateCategorySlice.actions

export default UpdateCategorySlice.reducer
