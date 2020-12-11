import { createSlice } from '@reduxjs/toolkit'
import { HTTPError, ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isUpdating: boolean
    updateError: Error | HTTPError | null
    updatedSubCategory: ISubCategory[]
}

const initialState: SubCategoryState = {
    isUpdating: false,
    updateError: null,
    updatedSubCategory: [],
}

export const updateSubCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        updatingSubCategory: (state) => {
            state.updateError = null
            state.isUpdating = true
            state.updatedSubCategory = []
        },
        updated: (state, { payload }) => {
            state.updateError = null
            state.isUpdating = false
            state.updatedSubCategory = payload
        },
        updateFailed: (state, { payload }) => {
            state.updateError = payload
            state.isUpdating = false
            state.updatedSubCategory = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatingSubCategory, updated, updateFailed } = updateSubCategorySlice.actions

export default updateSubCategorySlice.reducer
