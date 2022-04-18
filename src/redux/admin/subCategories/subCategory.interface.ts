import { IProduct } from '../../products/product.interface'
import { ICategory } from '../categories/category.interfaces'

export interface HTTPError {
    status: number
    message: string
}

export interface ISubCategory {
    id: string
    name: string
    image_url: string
    category: ICategory
}

// products in a subcategory
export interface IPSubCategory {
    createdAt: Date
    id: string | null
    product: IProduct
    subCategory: ISubCategory
}
