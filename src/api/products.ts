import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import {
    getProduct,
    product,
    productFailed
} from '../redux/products/product.slice'
import {
    fetchingProducts,
    retrievedProductFailed,
    retrievedProducts
} from '../redux/products/allProduct.slice'
import {
    updatingProductStatus,
    updatedProductStatus,
    failedToUpdateStatus
} from '../redux/products/updateProductStatus.slice'
import {
    updatingProduct,
    updatedProduct,
    updateFailed
} from '../redux/admin/products/updateProduct.slice'
import {
    addingImage,
    addedImage,
    addFailed
} from '../redux/image/addImageToProduct.slice'
import {
    removingImg,
    removedImg,
    removeImgFailed
} from '../redux/image/removeImgToProd.slice'


const token = localStorage.getItem('token')


export const useProducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingProducts())
        axiosAction('get', dispatch, retrievedProducts, retrievedProductFailed, '/product')
    }, [dispatch])
}

export const useProduct = (id: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
        axiosAction('get', dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])
}

// change product status
export const publishUnPublish = (dispatch: Dispatch, id: string, newStatus: string) => {
    if (newStatus === 'publish') {
        //publish
        dispatch(updatingProductStatus())
        return axiosAction('patch', dispatch, updatedProductStatus, failedToUpdateStatus, `/product/publish/${id}`, token)
    }
    // un-publish
    dispatch(updatingProductStatus())
    return axiosAction('patch', dispatch, updatedProductStatus, failedToUpdateStatus, `/product/unpublish/${id}`, token)
}

export const updateProduct = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(updatingProduct())
    return axiosAction('patch', dispatch, updatedProduct, updateFailed, `/product/${id}`, token, data)
}

export const addProdImage = (dispatch: Dispatch, id: string, image_id: string, image_url: string) => {
    dispatch(addingImage())
    axiosAction('post', dispatch, addedImage, addFailed, `/product/image/${id}/${image_id}`, token, { image_url })
}

export const removeImage = (dispatch: Dispatch, id: string, img_id: string) => {
    dispatch(removingImg())
    axiosAction('delete', dispatch, removedImg, removeImgFailed, `/product/image/${id}/${img_id}`, token)
}
