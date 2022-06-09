import { post } from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { login, loggedIn, loginFailed } from '../redux/profile.slice'


export const auth = (dispatch: Dispatch<any>, operation: string, data: {}) => {

    dispatch(login())
    post(dispatch, loggedIn, loginFailed, `/auth/${operation}`, data)
}

