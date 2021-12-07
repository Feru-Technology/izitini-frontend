
export interface HTTPError {
    status: number
    message: string
}

export interface IAddress {
    id: string
    user_id: string
    province: string
    district: string
    sector: string
    cell: string
    street_no1: string
    street_no2: string
    house_no: string
    notes: string
}
