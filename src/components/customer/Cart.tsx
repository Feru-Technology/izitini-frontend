import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { destroy, update } from '../../api/apiAction'
import { useDispatch, useSelector } from 'react-redux'
import { cart as getCart, cartFailed } from '../../redux/order/cart'
import { getOrders, orders, ordersFailed } from '../../redux/order/orders.slice'

const lodash = require('lodash')
const Cart = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const { isLoading, cart } = useSelector((state: RootState) => state.cart)

    let totalPrices: any = []

    const subTotal = (totals: []) => {
        return lodash.sum(totals)
    }

    // remove order item handler
    const removeOrderItem = (order_id: string, product_id: string) => {
        destroy(dispatch, getCart, cartFailed, `/orders/${order_id}/${product_id}`, token)
    }

    // increase order quantity handler
    const increaseOrderItemQyt = (order_id: string, product_id: string) => {
        update(dispatch, getCart, cartFailed, `/orders/increase-quantity/${order_id}/${product_id}`, {}, token)
    }

    // increase order quantity handler
    const reduceOrderItemQyt = (order_id: string, product_id: string) => {
        update(dispatch, getCart, cartFailed, `/orders/reduce-quantity/${order_id}/${product_id}`, {}, token)
    }

    const navigate = useNavigate()

    // check out handler
    const checkOut = () => {
        dispatch(getOrders())
        update(dispatch, orders, ordersFailed, '/orders/checkout', {}, token)
        navigate('/orders')
    }

    return (
        <div className='bg-gray-100'>
            <Navbar />

            {isLoading ? (<div>loading ...</div>)
                : cart.length !== 0 ? cart.map((orders: any) => (

                    <div className='h-full'>
                        <p className='font-bold text-xl text-center pt-3 md:pt-5'>Your cart</p>
                        <div className='mx-3 my-3
                                md:flex md:mx-6 md:my-5  md:space-x-3 md:y-3
                                lg:mx:12 lg:space-x-5'>
                            <div className='w-full md:w-2/3'>

                                {orders.map((items: any) => {
                                    console.log('items', items)

                                    let totalPricesPerOrder: any = []

                                    const totalPrice = (price: number, quantity: string) => {
                                        const total = price * parseInt(quantity)
                                        totalPricesPerOrder.push(total)
                                        totalPrices.push(total)
                                        return total
                                    }
                                    return (
                                        <div>
                                            <table className='min-w-full divide-y divide-gray-200'>
                                                <thead className='bg-white'>
                                                    <tr className=''>
                                                        <th
                                                            scope='col'
                                                            className='px-3 font-semibold text-gray-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Product
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-gray-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base
                                    '
                                                        >
                                                            Price
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-gray-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Quality
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='font-semibold text-gray-700
                                                md:px-6 text-xs md:text-sm
                                                lg:px-6 py-3 text-left lg:text-base'
                                                        >
                                                            Total
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='relative md:px-6 lg:px-6 py-3'
                                                        >
                                                            <span className='sr-only'>
                                                                Edit
                                                            </span>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                {items.order_items.map((item: any) => (

                                                    <tbody className='bg-white'>
                                                        <tr
                                                        >
                                                            <td className='px-3 md:px-6 py-4'>
                                                                <div className='flex items-center'>
                                                                    <div className='flex-shrink-0'>
                                                                        <img
                                                                            className='h-8 w-auto md:h-10 lg:h-16'
                                                                            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                                                            alt=''
                                                                        />
                                                                    </div>
                                                                    <div className='ml-4 text-xs md:text-sm lg:text-base font-medium text-gray-800'>
                                                                        {item.product.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            md:px-6 lg:px-6 py-4'>
                                                                {item.product.price}
                                                            </td>
                                                            <td className='py-4 text-xs md:text-sm text-gray-800
                                            md:px-6 lg:px-6'>
                                                                <div className='rounded-full border-2 border-gray-400 w-16 md:w-20 lg:w-28'>
                                                                    <div className='flex justify-center md:py-1 text-xs md:text-sm lg:text-base'>
                                                                        <button className='font-medium text-gray-400 hover:text-dark-blue'
                                                                            onClick={() => increaseOrderItemQyt(item.order_id, item.product_id)} >+</button>
                                                                        <span className='mx-3 md:mx-3 lg:mx-6 font-medium'>
                                                                            {item.quantity}
                                                                        </span>
                                                                        <button className='font-medium text-gray-400 hover:text-dark-blue'
                                                                            onClick={() => reduceOrderItemQyt(item.order_id, item.product_id)} >-</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            md:px-6 lg:px-6 py-4'>
                                                                {totalPrice(item.product.price, item.quantity)}
                                                            </td>
                                                            <td className='px-2 md:px-3 lg:px-6 py-4 text-right text-base font-medium'>
                                                                <button type='button'
                                                                    className='text-dark-blue hover:text-red-600'
                                                                    onClick={() => removeOrderItem(item.order_id, item.product_id)}
                                                                >
                                                                    <MdOutlineCancel className='w-6 h-auto' />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                )
                                                )}

                                            </table>

                                            <div className='flex border border-gray-200 bg-white mb-4 p-3 font-light text-xs space-x-3
                                            md:text-sm lg:text-base'>
                                                <p className='w-2/6 flex'>Vendor: <span className='ml-1 text-gray-500'>{items.shop.name}</span></p>
                                                <p className='w-2/6 flex'>Total <span className='sr-only md:not-sr-only md:ml-1'>price</span> :
                                                    <span className='ml-1 text-dark-blue'>{subTotal(totalPricesPerOrder)}</span> </p>
                                                <p className='w-2/6 flex'>Shipping <span className='sr-only md:not-sr-only md:ml-1'>price</span> :
                                                    <span className='ml-1 text-dark-blue'>1000</span> </p>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className=' mt-3 md:mt-0 md:w-1/3 bg-white text-base font-bold'>
                                <p className='py-3 border-b-2 border-dark-blue text-center
                                text-base lg:text-lg'>Order Summary</p>
                                <div className='flex m-3 text-gray-500'>
                                    <p>Subtotal</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16'>
                                        {subTotal(totalPrices)}
                                        RWF</p>
                                </div>
                                <div className='flex m-3 text-gray-500'>
                                    <p>Shipping</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16'> N/A </p>
                                </div>
                                <p className='m-3 text-dark-blue'>Have a Coupon</p>
                                <div className='flex bg-gray-200 font-bold py-2 md:py-3'>
                                    <p className='ml-3'>Total</p>
                                    <p className='absolute right-8 md:right-10 lg:right-16'>{subTotal(totalPrices) + 0}</p>
                                </div>
                                <button
                                    className='bg-dark-blue text-white text-lg font-bold uppercase py-2 md:py-3 rounded mt-3
                                    shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                                    type='button'
                                    onClick={() => checkOut()}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )) :
                    (<div className='flex flex-col items-center justify-center font-semibold '> your cart is empty </div>)
            }
            <Footer />
        </div>
    )
}


export default Cart
