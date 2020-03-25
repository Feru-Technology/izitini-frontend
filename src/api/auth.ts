import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { login, loggedIn, loginFailed } from '../redux/profile.slice'


export const auth = (dispatch: Dispatch<any>, operation: string, data: {}) => {

    dispatch(login())
    axiosAction('post', dispatch, loggedIn, loginFailed, `/auth/${operation}`, '', data)
}

export const logout = (dispatch: Dispatch, navigate: NavigateFunction) => {
    dispatch(loggedIn(null))
    localStorage.clear()
    navigate('/')
}
