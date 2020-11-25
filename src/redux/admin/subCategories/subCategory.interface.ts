import { ICategory } from '../categories/category.interfaces'

export interface HTTPError {
    status: number
    message: string
}

export interface ISubCategory {
    id: string
    name: string
    image_url: string
    category: ICategory
}

