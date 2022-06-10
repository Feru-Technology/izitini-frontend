import { useDispatch, useSelector } from 'react-redux'
import { cart, cartFailed } from '../redux/order/cart'
import { post, fetch, update, destroy } from './apiAction'

const token = localStorage.getItem('token')

export const useCart = (operation: string, order_id: string, product_id: string, route?: string) => {
    const dispatch = useDispatch()
    let op
    operation === 'update'
        ? op = update
        : op = destroy
    return op(dispatch, cart, cartFailed, `/orders/${route}/${order_id}/${product_id}`, {}, token)
}
