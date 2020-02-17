import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axiosAction from '../api/apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { getUser, user, userFailed } from '../redux/admin/users/user.slice'
import { fetchingUsers, retrievedUsers, retrievedUserFailed } from '../redux/admin/users/users.slice'

const token = localStorage.getItem('token')

export const useUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        axiosAction('get', dispatch, user, userFailed, '/users/my/profile', token)
    }, [dispatch])
}

export const updateUser = (dispatch: Dispatch, data: {}) => {
    dispatch(getUser())
    axiosAction('patch', dispatch, user, userFailed, '/users/profile', token, data)
}

export const changeProfileImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(getUser())
    axiosAction('patch', dispatch, user, userFailed, '/users/profile-image', token, formData)
}

export const useVendorsWithoutStore = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingUsers())
        axiosAction('get', dispatch, retrievedUsers, retrievedUserFailed, '/admin/user/vendor-without-shop', token)
    }, [dispatch])
}
