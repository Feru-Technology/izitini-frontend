export interface IStore {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    about_shop: string
    shop_email: string
    is_blocked: boolean
    is_approved: boolean
    owner: { full_name: string }
    shop_contact_no: string
    shop_image_url: string
    shopSpecialties: [{
        name: any
        id: string
        category: {
            id: string,
            name: string,
            image_url: string
        }
    }]
}
export interface HTTPError {
    status: number
    message: string
}
