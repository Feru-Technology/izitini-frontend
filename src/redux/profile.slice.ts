import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
    user: any
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
    profile: IUser | null
    error: Error | HTTPError | null
    loginSignupError: Error | HTTPError | null
}

const initialState: ProfileState = {
    error: null,
    profile: null,
    isLoading: false,
    loginSignupError: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoading = true
            state.profile = null
            state.error = null
            state.loginSignupError = null
        },
        loggedIn: (state, { payload }) => {
            state.isLoading = false
            state.profile = payload
            state.loginSignupError = null
        },
        loginFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.profile = null
            state.loginSignupError = payload
        },
        reLoginFailed: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
            state.profile = null
            state.loginSignupError = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, loggedIn, loginFailed, reLoginFailed } = profileSlice.actions

export default profileSlice.reducer
