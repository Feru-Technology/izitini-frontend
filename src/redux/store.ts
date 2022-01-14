
import { configureStore } from '@reduxjs/toolkit'
import { subCategorySlice } from './subCategory.slice'
import { categorySlice } from './categories/categories.slice'
import { allProductSlice } from './products/allProduct.slice'
import { profileSlice } from './profile.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'
import { AllStoresSlice } from './stores/allMyStores.slice'
import { storeSlice } from './stores/store.slice'

export const store = configureStore({
    reducer: {
        subCategory: subCategorySlice.reducer,
        category: categorySlice.reducer,
        AllCategories: AllCategoriesSlice.reducer,
        allProducts: allProductSlice.reducer,
        profile: profileSlice.reducer,
        myStores: AllStoresSlice.reducer,
        store: storeSlice.reducer
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
