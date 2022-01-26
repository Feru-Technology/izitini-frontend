import { createSlice } from '@reduxjs/toolkit'
import { HTTPError } from './subCategory.interface'
import { ISubCategory } from './subCategory.interface'

export interface SubCategoryState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    subCategories: ISubCategory[];
}

const initialState: SubCategoryState = {
    isLoading: false,
    error: null,
    subCategories: [],
}

export const subCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        fetchingSubCategories: (state) => {
            state.isLoading = true;
        },
        retrievedSubCategory: (state, { payload }) => {
            state.isLoading = false;
            state.subCategories = [...payload]
        },
        retrievedSubCategoryFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { fetchingSubCategories, retrievedSubCategory, retrievedSubCategoryFailed } = subCategorySlice.actions

export default subCategorySlice.reducer
