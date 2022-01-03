import { createSlice } from '@reduxjs/toolkit'

export interface ISubCategory { id: string; name: string; imageUrl: string };
export interface HTTPError { status: number; message: string }
export interface SubCategoryState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    data: ISubCategory[];
}

const initialState: SubCategoryState = {
    isLoading: false,
    error: null,
    data: [],
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
            state.data = [...state.data, ...payload]
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