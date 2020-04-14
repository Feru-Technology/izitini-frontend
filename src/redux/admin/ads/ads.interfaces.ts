
export interface HTTPError {
    status: number
    message: string
}
export interface IAd {
    id: string
    title: string
    is_active: boolean
    big_screen_image: string
    medium_screen_image: string
    small_screen_image: string
    start_time: Date
    end_time: Date
    big_screen_design: string
    medium_screen_design: string
    small_screen_design: string
    createdAt: Date,
    updatedAt: Date
}
