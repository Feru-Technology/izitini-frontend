export interface IStore {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    about_shop: string
    shop_email: string
    is_blocked: boolean
    is_approved: boolean
    owner: { name: string }
    shop_contact_no: string
    shop_image_url: string
    shopSpecialty: [{
        id: string
        category: string
    }]
}
export interface HTTPError {
    status: number
    message: string
}
