import { createSlice } from '@reduxjs/toolkit'
import { IImage } from '../image/image.interfaces'
import { IProduct, HTTPError } from './product.interface'
import { ISize } from '../admin/productSizes/size.interfaces'
import { IColor } from '../admin/productColors/color.interfaces'
import { ISubCategory } from '../subCategories/subCategory.interface'


export interface productState {
    isLoading: boolean
    error: Error | HTTPError | null
    currentProduct: {
        sizes: {
            size: ISize
            price: number
            quantity: string
        }[]
        colors: {
            id: string
            color: IColor
            price: number
            quantity: string
        }[]
        images: {
            image: IImage
            product_id: string
        }[]
        product: IProduct,
        subCategory: [{ subCategory: ISubCategory }]
    } | null
}

const initialState: productState = {
    isLoading: false,
    error: null,
    currentProduct: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProduct: (state) => {
            state.isLoading = true
            state.currentProduct = null
            state.error = null
        },
        product: (state, { payload }) => {
            state.error = null
            state.isLoading = false
            state.currentProduct = payload
        },
        productFailed: (state, { payload }) => {
            state.currentProduct = null
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getProduct, product, productFailed } = productSlice.actions

export default productSlice.reducer
