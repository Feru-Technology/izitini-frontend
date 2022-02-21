export interface ICategory {
    id: string; name: string; image_url: string;
    subCategories: [{
        id: string
        name: string
    }];
};
export interface HTTPError { status: number; message: string }
