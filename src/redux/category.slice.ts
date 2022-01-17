import { createSlice } from '@reduxjs/toolkit'

export interface ICategory { id: string; name: string; image_url: string };
export interface HTTPError { status: number; message: string }
export interface CategoryState {
    isLoading: boolean;
    error: Error | HTTPError | null;
    categories: ICategory[];
}

const initialState: CategoryState = {
    isLoading: false,
    error: null,
    categories: [],
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchingCategories: (state) => {
            state.isLoading = true;
        },
        retrievedCategory: (state, { payload }) => {
            state.isLoading = false;
            state.categories = [...state.categories, ...payload]
        },
        retrievedCategoryFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { fetchingCategories, retrievedCategory, retrievedCategoryFailed } = categorySlice.actions

export default categorySlice.reducer
