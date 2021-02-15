export interface IUser {
    id: string
    full_name: string
    email: string
    tin_no: string
    contact: string
    provider: string
    createdAt: string
    updatedAt: string
    is_blocked: boolean
    is_verified: boolean
    account_type: string
    profile_image: string
}
export interface HTTPError {
    status: number
    message: string
}

export interface ICreateUser {
    user: IUser
}
