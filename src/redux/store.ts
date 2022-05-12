import { cartSlice } from './order/cart'
import { profileSlice } from './profile.slice'
import { orderSlice } from './order/order.slice'
import { storeSlice } from './stores/store.slice'
import { configureStore } from '@reduxjs/toolkit'
import { ordersSlice } from './order/orders.slice'
import { userSlice } from './admin/users/user.slice'
import { usersSlice } from './admin/users/users.slice'
import { productSlice } from './products/product.slice'
import { AllStoresSlice } from './stores/allStores.slice'
import { categorySlice } from './categories/category.slice'
import { uploadImageSlice } from './image/uploadImage.slice'
import { updateStoreSlice } from './stores/updateStore.slice'
import { createStoreSlice } from './stores/createStore.slice'
import { allProductSlice } from './products/allProduct.slice'
import { productsSlice } from './admin/products/products.slice'
import { categoriesSlice } from './categories/categories.slice'
import { updateUserSlice } from './admin/users/updateUser.slice'
import { createUserSlice } from './admin/users/createUser.slice'
import { removeImgToProdSlice } from './image/removeImgToProd.slice'
import { storeProductsSlice } from './products/storeProducts.slice '
import { subCategorySlice } from './subCategories/subCategory.slice'
import { AllCategoriesSlice } from './categories/allCategories.slice'
import { adminCategorySlice } from './admin/categories/category.slice'
import { deleteSizeSlice } from './admin/productSizes/deleteSize.slice'
import { createSizeSlice } from './admin/productSizes/createSize.slice'
import { addImageToProductSlice } from './image/addImageToProduct.slice'
import { updateProductSlice } from './admin/products/updateProduct.slice'
import { shopProductsSlice } from './admin/products/productsInShop.slice'
import { createProductSlice } from './admin/products/createProduct.slice'
import { createColorSlice } from './admin/productColors/createColor.slice'
import { AdminCategoriesSlice } from './admin/categories/categories.slice'
import { deleteColorSlice } from './admin/productColors/DeleteColor.slice'
import { crateCategorySlice } from './admin/categories/createCategory.slice'
import { UpdateCategorySlice } from './admin/categories/updateCategory.slice'
import { updateProductStatusSlice } from './products/updateProductStatus.slice'
import { adminSubCategorySlice } from './admin/subCategories/subCategory.slice'
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
        order: orderSlice.reducer,
        orders: ordersSlice.reducer,
        profile: profileSlice.reducer,
        product: productSlice.reducer,
        stores: AllStoresSlice.reducer,
        category: categorySlice.reducer,
        updateUser: updateUserSlice.reducer,
        createSize: createSizeSlice.reducer,
        deleteSize: deleteSizeSlice.reducer,
        categories: categoriesSlice.reducer,
        createUser: createUserSlice.reducer,
        allProducts: allProductSlice.reducer,
        adminProducts: productsSlice.reducer,
        subCategory: subCategorySlice.reducer,
        createStore: createStoreSlice.reducer,
        createColor: createColorSlice.reducer,
        deleteColor: deleteColorSlice.reducer,
        uploadImage: uploadImageSlice.reducer,
        updateStore: updateStoreSlice.reducer,
        AllCategories: AllCategoriesSlice.reducer,
        storeProducts: storeProductsSlice.reducer,
        adminCategory: adminCategorySlice.reducer,
        adminShopProducts: shopProductsSlice.reducer,
        removeImgToProd: removeImgToProdSlice.reducer,
        adminCategories: AdminCategoriesSlice.reducer,
        productImages: addImageToProductSlice.reducer,
        adminCreateProduct: createProductSlice.reducer,
        adminUpdateProduct: updateProductSlice.reducer,
        adminSubCategory: adminSubCategorySlice.reducer,
        adminCreateCategory: crateCategorySlice.reducer,
        adminUpdateCategory: UpdateCategorySlice.reducer,
        adminSubCategories: AdminSubCategoriesSlice.reducer,
        subCategoryProducts: subCategoryProductsSlice.reducer,
        updateProductStatus: updateProductStatusSlice.reducer,
        adminCreateSubCategory: createSubCategorySlice.reducer,
        adminUpdateSubCategory: updateSubCategorySlice.reducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
