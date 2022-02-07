
export interface IOrder {
    quantity: string
    id: string
    user_id: string
    status: string
    is_sample: boolean
    order_items: [IOrderItem]
}

export interface IOrderItem {
    id: string
    order_id: string
    product_id: string
    color_id: string,
    size_id: string,
    quantity: string,
    details: string,
}

export interface ICart {
    id: string
    user_id: string
    status: string
    is_sample: boolean
    order_items: [IOrder]
}

export interface HTTPError { status: number; message: string }
