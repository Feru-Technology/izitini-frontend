import { createSlice } from '@reduxjs/toolkit'

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
export interface ProfileState {
    isLoading: boolean
    error: Error | HTTPError | null
    profile: IUser | null
}

const initialState: ProfileState = {
    isLoading: false,
    error: null,
    profile: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoading = true
            state.profile = null
            state.error = null
        },
        loggedIn: (state, { payload }) => {
            state.isLoading = false
            state.profile = payload
        },
        loginFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, loggedIn, loginFailed } = profileSlice.actions

export default profileSlice.reducer
