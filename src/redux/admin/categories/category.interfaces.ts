import { ISubCategory } from '../../subCategories/subCategory.interface';

export interface HTTPError {
    status: number
    message: string
}
export interface ICategory {
    id: string
    name: string
    image_url: string
    subCategories: [ISubCategory]
    createdAt: Date,
    updatedAt: Date
}
