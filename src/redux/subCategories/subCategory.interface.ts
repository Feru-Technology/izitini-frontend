import { IProduct } from "../products/product.interface";

export interface HTTPError { status: number; message: string }
export interface ISubCategory { id: string; name: string; imageUrl: string };
export interface ISubCategoryProducts {
    id: string
    product_id: string
    subCategory_id: string
    product: IProduct
}
