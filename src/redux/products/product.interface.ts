export interface IProduct {
    id: string;
    name: string;
    image_url: string;
    brand: string
    unit: string
    shop_id: string
    specification: string
    manual: string
    quantity: string
    status: string
    price: number
};
export interface HTTPError { status: number; message: string }
