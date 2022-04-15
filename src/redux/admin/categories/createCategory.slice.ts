import { createSlice } from '@reduxjs/toolkit'
import { ICategory, HTTPError } from './category.interfaces'


export interface categoryState {
    isCatLoading: boolean
    error: Error | HTTPError | null
    category: ICategory | null
}

const initialState: categoryState = {
    isCatLoading: false,
    error: null,
    category: null,
}

export const crateCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        createCategory: (state) => {
            state.isCatLoading = true
            state.category = null
            state.error = null
        },
        createdCategory: (state, { payload }) => {
            state.error = null
            state.isCatLoading = false
            state.category = payload
        },
        createFailed: (state, { payload }) => {
            state.category = null
            state.isCatLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { createCategory, createdCategory, createFailed } = crateCategorySlice.actions

export default crateCategorySlice.reducer
