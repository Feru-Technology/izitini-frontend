export interface IStore {
    id: string
    name: string
    owner: string
    about_shop: string
    shop_email: string
    is_approved: boolean
    shop_contact_no: string
    shop_image_url: string
}
export interface HTTPError {
    status: number
    message: string
}
