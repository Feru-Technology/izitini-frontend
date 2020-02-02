import axiosAction from './apiAction'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IImage } from '../redux/image/image.interfaces'
import { getStore, store, storeFailed } from '../redux/stores/store.slice'
import { updatingStore, updated, updateFailed } from '../redux/stores/updateStore.slice'
import { addStore, getStore as s, storeFailed as f } from '../redux/stores/createStore.slice'
import { uploadingImage, uploadedImage, uploadFailed } from '../redux/image/uploadImage.slice'
import { fetchingStores, retrievedStores, retrievedStoreFailed } from '../redux/stores/allStores.slice'

const token = localStorage.getItem('token')

// admin get shops
export const useStores = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingStores())
        axiosAction('get', dispatch, retrievedStores, retrievedStoreFailed, '/shop')
    }, [dispatch])
}

export const useShop = (id: string) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStore())
        axiosAction('get', dispatch, store, storeFailed, `/shop/${id}`)
    }, [dispatch, id])
}

export const useStore = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStore())
        axiosAction('get', dispatch, store, storeFailed, '/shop/mine/all', token)
    }, [dispatch])
}

export const getShop = (dispatch: Dispatch) => {
    dispatch(getStore())
    return axiosAction('get', dispatch, store, storeFailed, '/shop/mine/all', token)
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
    axiosAction('patch', dispatch, updated, updateFailed, `/shop/image/${id}`, token, formData)
}

export const adminCreateStore = (dispatch: Dispatch, data: {}) => {
    dispatch(addStore())
    axiosAction('post', dispatch, s, f, '/admin/shop', token, data)
}

export const uploadShopImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadingImage())
    axiosAction('post', dispatch, uploadedImage, uploadFailed, '/images/upload', token, formData)
}

export const useImageUrl = (setShop_image_url: SetStateAction<any>, image: IImage) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (image) {
            setShop_image_url(image.url)
            dispatch(uploadedImage(null))
        }
    }, [dispatch, image, setShop_image_url])
}

export const useOpenCreatedStore = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { createdStore } = useSelector((state: RootState) => state.createStore)
    useEffect(() => {
        if (createdStore) {
            const { id } = createdStore
            dispatch(s(null))
            return navigate(`/admin/shops/${id}`)
        }
    }, [createdStore, dispatch, navigate])
}
