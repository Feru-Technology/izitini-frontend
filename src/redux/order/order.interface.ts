import { IAddress } from '../adress/adress.interface'
import { IProduct } from '../products/product.interface'

export interface HTTPError {
    status: number
    message: string
}

export interface IOrder {
    id: string
    status: string
    user_id: string
    is_sample: boolean
    shipping_address_id: string
}

export interface IOrderItem {
    id: string
    shop_id: string
    size_id: string
    details: string
    color_id: string
    quantity: string
    order_id: string
    product: IProduct
    product_id: string
}

export interface ICart {
    id: string
    status: string
    user_id: string
    is_sample: boolean
    order_items: [IOrderItem]
}

export interface IOrders {
    id: string
    status: string
    shop_id: string
    user_id: string
    isPaid: boolean
    createdAt: Date
    order_no: number
    address: IAddress
    sub_total: string
    is_sample: boolean
    paid_amount: number
    shipping_cost: number
    payment_method: string
    shipping_method: number
    order_items: IOrderItem[]
    shipping_address_id: string
}
