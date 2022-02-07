import { IProduct } from "../products/product.interface"

export interface IOrder {
    id: string
    user_id: string
    status: string
    is_sample: boolean
}

export interface IOrderItem {
    id: string
    order_id: string
    product_id: string
    color_id: string,
    size_id: string,
    quantity: string,
    details: string,
    product: IProduct
}

export interface ICart {
    id: string
    user_id: string
    status: string
    is_sample: boolean
    order_items: [IOrderItem]
}

export interface HTTPError { status: number; message: string }
