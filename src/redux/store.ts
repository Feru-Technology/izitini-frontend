
import { configureStore } from '@reduxjs/toolkit'
import { subCategorySlice } from './subCategory.slice'
import { categorySlice } from './category.slice'

export const store = configureStore({
    reducer: {
        subCategory: subCategorySlice.reducer,
        category: categorySlice.reducer
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
