import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosAction from '../api/apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { getUser, user, userFailed } from '../redux/admin/users/user.slice'
import { postUser, getUser as u, userFailed as f } from '../redux/admin/users/createUser.slice'
import { fetchingUsers, retrievedUsers, retrievedUserFailed } from '../redux/admin/users/users.slice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'

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

export const createNewUser = (dispatch: Dispatch, route: string, data: {}) => {
    dispatch(postUser())
    axiosAction('post', dispatch, u, f, `/admin/${route}`, token, data)
}

export const useOpenCreatedUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { createdUser } = useSelector((state: RootState) => state.createUser)
    useEffect(() => {
        if (createdUser) {
            const { id } = createdUser.user
            dispatch(u(null))
            return navigate(`/admin/users/${id}`
            )
        }
    }, [createdUser, dispatch, navigate])
}
