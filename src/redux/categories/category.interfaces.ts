export interface ICategory {
    id: string; name: string; image_url: string;
    SubCategories: [{ name: string }];
};
export interface HTTPError { status: number; message: string }
