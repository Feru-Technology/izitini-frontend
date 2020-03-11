import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { addingToCart, cart, cartFailed } from '../redux/order/cart'
import { getOrders, orders, ordersFailed } from '../redux/order/orders.slice'
import { fetchingOrder, fetchedOrder, fetchFailed } from '../redux/order/order.slice'
import { updatingOrder, updatedOrder, updateFailed } from '../redux/order/updateOrder.slice'

const token = localStorage.getItem('token')

// remove order item handler
export const remove = (dispatch: Dispatch, order_id: string, product_id: string) => {
    axiosAction('delete', dispatch, cart, cartFailed, `/orders/${order_id}/${product_id}`, token)
}

// increase order quantity handler
export const increaseQty = (dispatch: Dispatch, order_id: string, product_id: string) => {
    axiosAction('patch', dispatch, cart, cartFailed, `/orders/increase-quantity/${order_id}/${product_id}`, token)
}

// increase order quantity handler
export const reduceQty = (dispatch: Dispatch, order_id: string, product_id: string) => {
    axiosAction('patch', dispatch, cart, cartFailed, `/orders/reduce-quantity/${order_id}/${product_id}`, token)
}

// add to cart
export const addToCart = (dispatch: Dispatch, data: {}) => {
    dispatch(addingToCart())
    axiosAction('post', dispatch, cart, cartFailed, '/orders/add-to-cart', token, data)
}

// get cart
export const useCart = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addingToCart())
        axiosAction('get', dispatch, cart, cartFailed, '/orders/cart', token)
    }, [dispatch])
}

// check out handler
export const checkOut = (dispatch: Dispatch, navigate: any, order: {}) => {
    dispatch(getOrders())
    axiosAction('patch', dispatch, orders, ordersFailed, '/orders/checkout', token, order)
    navigate('/user/orders')
}

export const useOrder = (id: any, route: string) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingOrder())
        axiosAction('get', dispatch, fetchedOrder, fetchFailed, `/orders/${route}${id}`, token)
    }, [dispatch, id, route])
}

export const useOrders = (route: string) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
        axiosAction('get', dispatch, orders, ordersFailed, `/orders/${route}`, token)
    }, [dispatch, route])
}

export const allOrders = (dispatch: Dispatch, route: string) => {
    return axiosAction('get', dispatch, orders, ordersFailed, `/orders/${route}`, token)
}

export const updateOrderStatus = (dispatch: Dispatch, id: any, status: string) => {
    dispatch(updatingOrder())
    axiosAction('patch', dispatch, updatedOrder, updateFailed, `/orders/order/status/${status}/${id}`, token)
}
