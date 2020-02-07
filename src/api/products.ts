import { useEffect } from 'react'
import axiosAction from './apiAction'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, product, productFailed } from '../redux/products/product.slice'
import { addingImage, addedImage, addFailed } from '../redux/image/addImageToProduct.slice'
import { removingImg, removedImg, removeImgFailed } from '../redux/image/removeImgToProd.slice'
import { updatingProduct, updatedProduct, updateFailed } from '../redux/admin/products/updateProduct.slice'
import { createdProduct, createFailed, creatingProduct } from '../redux/admin/products/createProduct.slice'
import { fetchingProducts, retrievedProductFailed, retrievedProducts } from '../redux/products/allProduct.slice'
import { fetchingProducts as fetchP, fetchedProducts, fetchFailed } from '../redux/admin/products/products.slice'
import { fetchingProducts as fetch, storeProducts, productFailed as fail } from '../redux/products/storeProducts.slice '
import { updatingProductStatus, updatedProductStatus, failedToUpdateStatus } from '../redux/products/updateProductStatus.slice'

const token = localStorage.getItem('token')

// admin get products
export const useAllProducts = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchP())
        axiosAction('get', dispatch, fetchedProducts, fetchFailed, '/admin/product/all', token)
    }, [dispatch])
}

export const getAllProducts = (dispatch: Dispatch, status: string) => {
    dispatch(fetchingProducts())
    return axiosAction('get', dispatch, fetchedProducts, fetchFailed, `/admin/product/${status}`, token)
}

// admin get all products in a shop
export const useShopProducts = (shop_id: string) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingProducts())
        axiosAction('get', dispatch, fetchedProducts, fetchFailed, `/admin/product/s/${shop_id}`, token)
    }, [dispatch, shop_id])
}

export const useReloadPage = () => {
    const dispatch = useDispatch()
    const { newProductStatus } = useSelector((state: RootState) => state.updateProductStatus)

    // reload the page after status update
    useEffect(() => {
        if (newProductStatus) {
            dispatch(updatedProductStatus(null))
            return window.location.reload()
        }
    }, [dispatch, newProductStatus])
}

export const useProducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingProducts())
        axiosAction('get', dispatch, retrievedProducts, retrievedProductFailed, '/product')
    }, [dispatch])
}

export const useStoreProducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetch())
        axiosAction('get', dispatch, storeProducts, fail, `/product/s/all`, token)

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
export const publishUnPublish = (dispatch: Dispatch, route: string, id: string, newStatus: string) => {
    //publish
    dispatch(updatingProductStatus())
    return axiosAction('patch', dispatch, updatedProductStatus, failedToUpdateStatus, `${route}/${newStatus}/${id}`, token)
}

export const updateProduct = (dispatch: Dispatch, route: string, id: string, data: {}) => {
    dispatch(updatingProduct())
    return axiosAction('patch', dispatch, updatedProduct, updateFailed, `${route}/${id}`, token, data)
}

export const addProdImage = (dispatch: Dispatch, route: string, id: string, image_id: string, image_url: string) => {
    dispatch(addingImage())
    axiosAction('post', dispatch, addedImage, addFailed, `${route}/${id}/${image_id}`, token, { image_url })
}

export const removeImage = (dispatch: Dispatch, route: string, id: string, img_id: string) => {
    dispatch(removingImg())
    axiosAction('delete', dispatch, removedImg, removeImgFailed, `${route}/${id}/${img_id}`, token)
}

export const createProduct = (dispatch: Dispatch, data: {}) => {
    dispatch(creatingProduct())
    axiosAction('post', dispatch, createdProduct, createFailed, '/product', token, data)
}

// admin create product
export const createProd = (dispatch: Dispatch, shop_id: string, data: {}) => {
    dispatch(creatingProduct())
    axiosAction('post', dispatch, createdProduct, createFailed, `/admin/product/${shop_id}`, token, data)
}

export const useRefreshProduct = (setCreateMode: React.SetStateAction<any>) => {
    const dispatch = useDispatch()
    const { product } = useSelector((state: RootState) => state.adminCreateProduct)

    useEffect(() => {
        if (product) {
            dispatch(fetchingProducts())
            axiosAction('get', dispatch, fetchedProducts, fetchFailed, '/admin/product/all', token)
            dispatch(createdProduct(null))
            setCreateMode(false)
        }
    }, [dispatch, product, setCreateMode])
}
