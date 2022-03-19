import { IProduct } from "../products/product.interface"
import { ICategory } from '../categories/category.interfaces'

export interface HTTPError {
    status: number
    message: string
}

export interface ISubCategory {
    id: string
    name: string
    imageUrl: string
    category: ICategory
}

export interface ISubCategoryProducts {
    id: string
    product_id: string
    subCategory_id: string
    product: IProduct
    subCategory: ISubCategory
}
