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
import { createStoreSlice } from './stores/createStore.slice'
import { allProductSlice } from './products/allProduct.slice'
import { productsSlice } from './admin/products/products.slice'
import { categoriesSlice } from './categories/categories.slice'
import { createUserSlice } from './admin/users/createUser.slice'
import { storeProductsSlice } from './products/storeProducts.slice '
import { subCategorySlice } from './subCategories/subCategory.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'
import { adminCategorySlice } from './admin/categories/category.slice'
import { createProductSlice } from './admin/products/createProduct.slice'
import { AdminCategoriesSlice } from './admin/categories/categories.slice'
import { crateCategorySlice } from './admin/categories/createCategory.slice'
import { UpdateCategorySlice } from './admin/categories/updateCategory.slice'
import { AdminSubCategoriesSlice } from './admin/subCategories/subCategories.slice'
import { subCategoryProductsSlice } from './subCategories/subCategoryProducts.slice'
import { createSubCategorySlice } from './admin/subCategories/createSubCategory.slice'
import { updateSubCategorySlice } from './admin/subCategories/updateSubCategory.slice'

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
        adminProducts: productsSlice.reducer,
        subCategory: subCategorySlice.reducer,
        createStore: createStoreSlice.reducer,
        AllCategories: AllCategoriesSlice.reducer,
        storeProducts: storeProductsSlice.reducer,
        adminCategory: adminCategorySlice.reducer,
        adminCategories: AdminCategoriesSlice.reducer,
        adminCreateProduct: createProductSlice.reducer,
        adminCreateCategory: crateCategorySlice.reducer,
        adminUpdateCategory: UpdateCategorySlice.reducer,
        adminSubCategories: AdminSubCategoriesSlice.reducer,
        subCategoryProducts: subCategoryProductsSlice.reducer,
        adminCreateSubCategory: createSubCategorySlice.reducer,
        adminUpdateSubCategory: updateSubCategorySlice.reducer,

    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
