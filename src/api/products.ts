import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
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
