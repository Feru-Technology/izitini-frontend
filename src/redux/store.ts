import { cartSlice } from './order/cart'
import { profileSlice } from './profile.slice'
import { storeSlice } from './stores/store.slice'
import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './products/product.slice'
import { AllStoresSlice } from './stores/allMyStores.slice'
import { categorySlice } from './categories/category.slice'
import { allProductSlice } from './products/allProduct.slice'
import { categoriesSlice } from './categories/categories.slice'
import { storeProductsSlice } from './products/storeProducts.slice '
import { subCategorySlice } from './subCategories/subCategory.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'
import { subCategoryProductsSlice } from './subCategories/subCategoryProducts.slice'

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        store: storeSlice.reducer,
        profile: profileSlice.reducer,
        product: productSlice.reducer,
        category: categorySlice.reducer,
        myStores: AllStoresSlice.reducer,
        categories: categoriesSlice.reducer,
        allProducts: allProductSlice.reducer,
        subCategory: subCategorySlice.reducer,
        AllCategories: AllCategoriesSlice.reducer,
        storeProducts: storeProductsSlice.reducer,
        subCategoryProducts: subCategoryProductsSlice.reducer

    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
