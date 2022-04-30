import { IAddress } from '../adress/adress.interface'
import { IProduct } from '../products/product.interface'
import { ISize } from '../admin/productSizes/size.interfaces'
import { IColor } from '../admin/productColors/color.interfaces'


export interface HTTPError {
    status: number
    message: string
}

export interface IOrder {
    id: string
    status: string
    user_id: string
    is_sample: boolean
    orderItems: IOrderItem[]
    shipping_address_id: string
}

export interface IOrderItem {
    id: string
    color: IColor
    size_id: ISize
    shop_id: string
    details: string
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
