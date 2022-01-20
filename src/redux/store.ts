
import { profileSlice } from './profile.slice'
import { configureStore } from '@reduxjs/toolkit'
import { storeSlice } from './stores/store.slice'
import { productSlice } from './products/product.slice'
import { AllStoresSlice } from './stores/allMyStores.slice'
import { categorySlice } from './categories/categories.slice'
import { allProductSlice } from './products/allProduct.slice'
import { storeProductsSlice } from './products/storeProducts.slice '
import { subCategorySlice } from './subCategories/subCategory.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'

export const store = configureStore({
    reducer: {
        store: storeSlice.reducer,
        profile: profileSlice.reducer,
        product: productSlice.reducer,
        category: categorySlice.reducer,
        myStores: AllStoresSlice.reducer,
        allProducts: allProductSlice.reducer,
        subCategory: subCategorySlice.reducer,
        AllCategories: AllCategoriesSlice.reducer,
        storeProducts: storeProductsSlice.reducer
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
