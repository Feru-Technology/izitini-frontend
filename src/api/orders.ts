import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import { addingToCart, cart, cartFailed } from '../redux/order/cart'
import { getOrders, orders, ordersFailed } from '../redux/order/orders.slice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

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

// check out handler
export const checkOut = (dispatch: Dispatch, navigate: any, order: {}) => {
    dispatch(getOrders())
    axiosAction('patch', dispatch, orders, ordersFailed, '/orders/checkout', token, order)
    navigate('/user/orders')
}

export const useCart = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addingToCart())
        axiosAction('get', dispatch, cart, cartFailed, '/orders/cart', token)
    }, [dispatch])
}
