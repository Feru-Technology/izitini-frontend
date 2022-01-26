
export interface IOrder {
    id: string
    user_id: string
    status: string
    is_sample: boolean
}
export interface HTTPError { status: number; message: string }
