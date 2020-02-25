import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { getStore, store, storeFailed } from '../redux/stores/store.slice'
import { updatingStore, updated, updateFailed } from '../redux/stores/updateStore.slice'

const token = localStorage.getItem('token')

export const useStore = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStore())
        axiosAction('get', dispatch, store, storeFailed, '/shop/mine/all', token)
    }, [dispatch])
}

export const createStore = (dispatch: Dispatch, data: {}) => {
    dispatch(getStore())
    axiosAction('get', dispatch, store, storeFailed, '/shop', token, data)
}

export const updateShop = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(getStore())
    axiosAction('patch', dispatch, store, storeFailed, `/shop/${id}`, token, data)
}

export const changeShopImage = (dispatch: Dispatch, id: string, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(updatingStore())
    axiosAction('patch', dispatch, updated, updateFailed, `/image/${id}`, token, formData)
}
