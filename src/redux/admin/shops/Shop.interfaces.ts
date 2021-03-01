export interface IShop {
    id: string
    name: string
    owner: string
    about_shop: string
    shop_email: string
    shop_contact_no: string
    is_approved: boolean
}
export interface HTTPError {
    status: number
    message: string
}
