export interface ICategory {
    id: string; name: string; image_url: string;
    subCategories: [{ name: string }];
};
export interface HTTPError { status: number; message: string }
