import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
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
