import { ICategory } from '../admin/categories/category.interfaces'
import { IStore } from '../stores/store.interfaces'

export interface HTTPError {
    status: number
    message: string
}

export interface IProduct {
    id: string
    name: string
    image_url: string
    brand: string
    unit: string
    shop_id: string
    specification: string
    manual: string
    quantity: string
    status: string
    price: number
    shop: IStore
    createdAt: Date
    updatedAt: Date
    productImages: []
    // colors: IColor
    // size: ISize
    category: ICategory
}
