import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isUpdating: boolean
    updateError: Error | HTTPError | null
    updated: ISubCategory | null
}

const initialState: SubCategoryState = {
    isUpdating: false,
    updateError: null,
    updated: null,
}

export const updateSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        updatingSubCategory: (state) => {
            state.updateError = null
            state.isUpdating = true
            state.updated = null
        },
        updatedSubCategory: (state, { payload }) => {
            state.updateError = null
            state.isUpdating = false
            state.updated = payload
        },
        updateFailed: (state, { payload }) => {
            state.updateError = payload
            state.isUpdating = false
            state.updated = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingSubCategory, updatedSubCategory, updateFailed } = updateSubCategorySlice.actions

export default updateSubCategorySlice.reducer
