import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './footer'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { product } from '../../redux/products/product.slice'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { IProduct } from '../../redux/products/product.interface'

import {
    fetchingProducts,
    storeProducts,
    productFailed
} from '../../redux/products/storeProducts.slice '
const Cart = () => {

    return (<>
        <Navbar />
        <div className='bg-gray-100 h-full'>
            <p>Your cart</p>
            <div className='md:flex md:p-12 md:space-x-5'>
                <div className='w-2/3 bg-black'>

                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-white'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700
                                    uppercase tracking-wider'
                                >
                                    Product
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700
                                    uppercase tracking-wider items-center'
                                >
                                    Price
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
                                >
                                    Quality
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
                                >
                                    Total
                                </th>
                                <th
                                    scope='col'
                                    className='relative px-6 py-3'
                                >
                                    <span className='sr-only'>
                                        Edit
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {/* {
                                                // isLoading
                                                //     ? (<h1>loading ...</h1>)
                                                //     : (products.map((product) => ( */}
                            <tr
                            // onClick={e => activeProduct(product)}
                            >
                                <td className='px-6 py-4'>
                                    <div className='flex items-center'>
                                        <div className='flex-shrink-0 h-10 w-10'>
                                            <img
                                                className='h-10 w-10'
                                                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                                alt=''
                                            />
                                        </div>
                                        <div className='ml-4 text-sm font-medium text-gray-800'>
                                            ab
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-800'>
                                    abc
                                </td>
                                <td className='px-6 py-4 text-xs text-gray-800'>
                                    <div className=' rounded border-2 w-24'>
                                        <div className='flex justify-center py-1'>
                                            <button>+</button>
                                            <span className='mx-4 font-semibold'>1</span>
                                            <button>-</button>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-800'>
                                    abcde
                                </td>
                                <td className='px-6 py-4 text-right text-sm font-medium'>
                                    <a
                                        href='#'
                                        className='text-indigo-600 hover:text-indigo-900'
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                            {/* // )))} */}

                        </tbody>
                    </table>
                </div>
                <div className='w-1/3 bg-white text-base font-bold'>
                    <p className='py-3'>Order Summary</p>
                    <div className='flex m-3 text-gray-500'>
                        <p>Subtotal</p>
                        <p className='right-0 inset-y-0'>75000 RWF</p>
                    </div>
                    <div className='flex m-3 text-gray-500'>
                        <p>Shipping</p>
                        <p className='right-0 inset-y-0'>75000 RWF</p>
                    </div>
                    <p className='m-3 text-dark-blue'>Add Coupon Code</p>
                    <div className='flex bg-gray-200 font-bold py-3'>
                        <p className='justify-start'>Total</p>
                        <p className='justify-end'>75000 RWF</p>
                    </div>
                    <button
                        className="bg-dark-blue text-white text-sm font-bold uppercase px-6 py-3 rounded mt-3
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
