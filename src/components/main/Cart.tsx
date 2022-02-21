import React from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { MdOutlineCancel } from "react-icons/md"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const lodash = require('lodash')
const Cart = () => {

    const { isLoading, cart, error } = useSelector((state: RootState) => state.cart)
    console.log('==========================================')
    console.log(cart)

    let totalPrices: any = []

    const totalPrice = (price: number, quantity: string) => {
        const total = price * parseInt(quantity)
        totalPrices.push(total)
        return total
    }

    console.log(totalPrices)

    const subTotal = (totals: []) => {
        return lodash.sum(totals)
    }

    return (<>
        <Navbar />
        <div className='bg-gray-100 h-full'>
            <p className='font-bold text-xl text-center pt-3 md:pt-5'>Your cart</p>
            <div className='mx-3 my-3
            md:flex md:mx-6 md:my-5  md:space-x-3 md:y-3
            lg:mx:12 lg:space-x-5'>
                <div className='w-full md:w-2/3'>

                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-white'>
                            <tr className=''>
                                <th
                                    scope='col'
                                    className='px-3 font-semibold text-gray-700
                                    md:px-6 text-xs md:text-sm
                                    lg:px-6 py-3 text-left lg:text-base
                                    '
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
                        {isLoading ? (<h1>loading ...</h1>)
                            : cart ? cart.order_items.map((item) => (
                                <tbody className='bg-white'>
                                    <tr
                                    >
                                        <td className='px-3 md:px-6 py-4'>
                                            <div className='flex items-center'>
                                                <div className='flex-shrink-0'>
                                                    <img
                                                        className='h-8 w-auto
                                                md:h-10
                                                lg:h-16'
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
                                md:px-6
                                lg:px-6 py-4'>
                                            {item.product.price}
                                        </td>
                                        <td className='py-4 text-xs md:text-sm text-gray-800
                                md:px-6 lg:px-6'>
                                            <div className='rounded-full border-2 border-gray-400 w-16 md:w-20 lg:w-28'>
                                                <div className='flex justify-center md:py-1 text-xs md:text-sm lg:text-base'>
                                                    <button className='font-medium text-gray-400'>+</button>
                                                    <span className='mx-3 md:mx-3 lg:mx-6 font-medium'>{item.quantity}</span>
                                                    <button className='font-medium text-gray-400'>-</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-xs md:text-sm lg:text-base font-medium text-gray-800
                                md:px-6
                                lg:px-6 py-4'>
                                            {totalPrice(item.product.price, item.quantity)}
                                        </td>
                                        <td className='px-2 md:px-3 lg:px-6 py-4 text-right text-base font-medium'>
                                            <button type='button'
                                                className='text-dark-blue'
                                            >
                                                <MdOutlineCancel className='w-6 h-auto' />
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>

                            )) : <>{error?.message}</>}
                    </table>

                </div>
                <div className=' mt-3 md:mt-0 md:w-1/3 bg-white text-base font-bold'>
                    <p className='py-3 border-b-2 border-dark-blue text-center
                    text-base lg:text-lg'>Order Summary</p>
                    <div className='flex m-3 text-gray-500'>
                        <p>Subtotal</p>
                        <p className='absolute right-8 md:right-10 lg:right-16'>{subTotal(totalPrices)} RWF</p>
                    </div>
                    <div className='flex m-3 text-gray-500'>
                        <p>Shipping</p>
                        <p className='absolute right-8 md:right-10 lg:right-16'> N/A </p>
                    </div>
                    <p className='m-3 text-dark-blue'>Have a Coupon</p>
                    <div className='flex bg-gray-200 font-bold py-2 md:py-3'>
                        <p className='ml-3'>Total</p>
                        <p className='absolute right-8 md:right-10 lg:right-16'>75000 RWF</p>
                    </div>
                    <button
                        className="bg-dark-blue text-white text-lg font-bold uppercase py-2 md:py-3 rounded mt-3
                        shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
        <Footer />
    </>
    )
}

export default Cart
