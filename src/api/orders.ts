import axiosAction from './apiAction'
import { cart, cartFailed } from '../redux/order/cart'
import { getOrders, orders, ordersFailed } from '../redux/order/orders.slice'

const token = localStorage.getItem('token')

// remove order item handler
export const remove = (dispatch: any, order_id: string, product_id: string) => {
    axiosAction('delete', dispatch, cart, cartFailed, `/orders/${order_id}/${product_id}`, token)
}

// increase order quantity handler
export const increaseQty = (dispatch: any, order_id: string, product_id: string) => {
    axiosAction('patch', dispatch, cart, cartFailed, `/orders/increase-quantity/${order_id}/${product_id}`, token)
}

// increase order quantity handler
export const reduceQty = (dispatch: any, order_id: string, product_id: string) => {
    axiosAction('patch', dispatch, cart, cartFailed, `/orders/reduce-quantity/${order_id}/${product_id}`, token)
}

// check out handler
export const checkOut = (dispatch: any, navigate: any, order: {}) => {
    dispatch(getOrders())
    axiosAction('patch', dispatch, orders, ordersFailed, '/orders/checkout', token, order)
    navigate('/user/orders')
}
