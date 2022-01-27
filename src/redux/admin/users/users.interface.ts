export interface IUser {
    id: string
    full_name: string
    email: string
    tin_no: string
    contact: string
    provider: string
    account_type: string
    profile_image: string
}
export interface HTTPError {
    status: number
    message: string
}
