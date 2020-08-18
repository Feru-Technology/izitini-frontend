import { IStore } from '../stores/store.interfaces'
import { ICategory } from '../admin/categories/category.interfaces'

export interface HTTPError {
    status: number
    message: string
}

export interface IProduct {
    id: string
    name: string
    unit: string
    brand: string
    price: number
    manual: string
    status: string
    shop_id: string
    quantity: string
    image_url: string
    description: string
    return_policy: string
    specification: string
    shipping_policy: string
    shop: IStore
    createdAt: Date
    updatedAt: Date
    productImages: []
    category: ICategory
}
