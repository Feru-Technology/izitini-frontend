import { cartSlice } from './order/cart'
import { profileSlice } from './profile.slice'
import { storeSlice } from './stores/store.slice'
import { configureStore } from '@reduxjs/toolkit'
import { ordersSlice } from './order/orders.slice'
import { userSlice } from './admin/users/user.slice'
import { usersSlice } from './admin/users/users.slice'
import { productSlice } from './products/product.slice'
import { AllStoresSlice } from './stores/allStores.slice'
import { categorySlice } from './categories/category.slice'
import { allProductSlice } from './products/allProduct.slice'
import { categoriesSlice } from './categories/categories.slice'
import { createUserSlice } from './admin/users/createUser.slice'
import { storeProductsSlice } from './products/storeProducts.slice '
import { subCategorySlice } from './subCategories/subCategory.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'
import { subCategoryProductsSlice } from './subCategories/subCategoryProducts.slice'


export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer,
        store: storeSlice.reducer,
        users: usersSlice.reducer,
        orders: ordersSlice.reducer,
        profile: profileSlice.reducer,
        product: productSlice.reducer,
        stores: AllStoresSlice.reducer,
        category: categorySlice.reducer,
        categories: categoriesSlice.reducer,
        createUser: createUserSlice.reducer,
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
