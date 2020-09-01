
export interface HTTPError {
    status: number
    message: string
}
export interface IImage {
    id: string
    url: string
    image_url: string
    note: string
    createdAt: Date
    updatedAt: Date
}

export interface IProductImage {
    product_id: string
    image_id: string
    image: IImage
    createdAt: Date
    updatedAt: Date
}
