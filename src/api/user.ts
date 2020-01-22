import { useEffect } from 'react'
import axiosAction from '../api/apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, user, userFailed } from '../redux/admin/users/user.slice'
import { postUser, getUser as u, userFailed as f } from '../redux/admin/users/createUser.slice'
import { fetchingUsers, retrievedUsers, retrievedUserFailed } from '../redux/admin/users/users.slice'

const token = localStorage.getItem('token')

export const useProfile = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        axiosAction('get', dispatch, user, userFailed, '/users/my/profile', token)
    }, [dispatch])
}

export const updateProfile = (dispatch: Dispatch, data: {}) => {
    dispatch(getUser())
    axiosAction('patch', dispatch, user, userFailed, '/users/profile', token, data)
}

export const changeProfileImage = (dispatch: Dispatch, route: string, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(getUser())
    axiosAction('patch', dispatch, user, userFailed, `${route}`, token, formData)
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

export const useUser = (id: string) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
        axiosAction('get', dispatch, user, userFailed, `/users/${id}`)
    }, [dispatch, id])
}

export const updateUser = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(getUser())
    axiosAction('patch', dispatch, user, userFailed, `/admin/user/${id}`, token, data)
}

export const useUsers = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingUsers())
        axiosAction('get', dispatch, retrievedUsers, retrievedUserFailed, '/users', token)
    }, [dispatch])
}

export const fetchByAccountType = (dispatch: Dispatch, accountType: string) => {
    dispatch(fetchingUsers())
    axiosAction('get', dispatch, retrievedUsers, retrievedUserFailed, `/users/account-type/${accountType}`, token)
}

export const allUsers = (dispatch: Dispatch) => {
    dispatch(fetchingUsers())
    axiosAction('get', dispatch, retrievedUsers, retrievedUserFailed, '/users', token)
}
