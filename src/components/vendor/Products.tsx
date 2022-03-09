import { useEffect, useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { product } from '../../redux/products/product.slice'
import { Link, useNavigate } from 'react-router-dom'
import { IProduct } from '../../redux/products/product.interface'

import {
    fetchingProducts,
    storeProducts,
    productFailed
} from '../../redux/products/storeProducts.slice '
const Products = () => {

    //  get token
    const token = localStorage.getItem('token')

    const [isClosed, setIsClosed] = useState(false)
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    // redux
    const dispatch = useDispatch()

    const { currentStore } = useSelector((state: RootState) => state.store)

    useEffect(() => {
        dispatch(fetchingProducts())
        fetch(dispatch, storeProducts, productFailed, `/product/s/all`, token)

    }, [dispatch, token])

    const { isLoading, products } = useSelector((state: RootState) => state.storeProducts)

    const navigate = useNavigate()


    const activeProduct = (newProduct: IProduct) => {
        dispatch(product(newProduct))
        const { id } = newProduct
        return navigate(`/products/${id}`)
    }

    return (
        <div className='flex h-screen overflow-hidden'>
            <SiderBar
                isClosed={isClosed}
                setIsClosed={setIsClosed}
                isStatic={isStatic}
            />

            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <Header
                    isClosed={isClosed}
                    setIsClosed={setIsClosed}
                    isStatic={isStatic}
                />
                <Transition
                    appear={true}
                    show={!isStatic && !isClosed}
                    enter='transition-opacity duration-200'
                    enterFrom='opacity-0'
                    enterTo='opacity-50'
                    leave='transition-opacity duration-200'
                    leaveFrom='opacity-50'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black opacity-60 z-10' />
                </Transition>
                <div className='px-2 lg:px-8 py-8 w-full mx-auto bg-gray-200'>
                    <div className='flex items-center justify-between py-8'>
                        <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>{currentStore?.name}</h3>
                        <Link to='/vendor/create-product'>
                            <button className='bg-middle-blue hover:bg-dark-blue text-white font-bold
                            py-2 px-4 rounded cursor-pointer text-sm md:text-base'>
                                ADD A PRODUCT
                            </button>
                        </Link>
                    </div>
                    <div className='flex flex-col'>
                        <div className='overflow-x-auto'>
                            <div className='py-2 align-middle inline-block min-w-full'>
                                <div className='shadow overflow-hidden border-b border-gray-200 rounded-md lg:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200 text-gray-600 text-sm'>
                                        <thead className='bg-gray-50'>
                                            <tr className='w-full uppercase tracking-wider font-medium'>
                                                <th
                                                    scope='col'
                                                    className='pl-3 w-5/12 py-3 text-left'
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-1/12 py-3 text-left sr-only md:not-sr-only'
                                                >
                                                    Brand
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-2/12 py-3 text-left sr-only md:not-sr-only'
                                                >
                                                    Quantity
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-1/12 py-3 text-left sr-only md:not-sr-only'
                                                >
                                                    Unit
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-2/12 py-3 text-left sr-only md:not-sr-only'
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-1/12 py-3 text-left sr-only md:not-sr-only'
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white divide-y divide-gray-200'>
                                            {
                                                isLoading
                                                    ? (<h1>loading ...</h1>)
                                                    : (products.map((product) => (
                                                        <tr className='hover:bg-gray-100' key={product.id}
                                                            onClick={e => activeProduct(product)}>
                                                            <td className='pl-3 w-5/12 py-4'>
                                                                <div className='flex items-center'>
                                                                    <div className='flex-shrink-0 h-10 w-10'>
                                                                        <img
                                                                            className='h-10 w-10'
                                                                            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                                                            alt=''
                                                                        />
                                                                    </div>
                                                                    <div className='ml-4 font-medium w-full md:w-auto'>
                                                                        {product.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='w-1/12 py-4 sr-only md:not-sr-only'>
                                                                {product.brand}
                                                            </td>
                                                            <td className='w-2/12 py-4 sr-only md:not-sr-only'>
                                                                {product.quantity}
                                                            </td>
                                                            <td className='w-1/12 py-4 sr-only md:not-sr-only'>
                                                                {product.unit}
                                                            </td>
                                                            <td className='w-2/12 py-4 sr-only md:not-sr-only'>
                                                                {product.price}
                                                            </td>
                                                            <td className='w-1/12 py-4 sr-only md:not-sr-only'>
                                                                {product.status}
                                                            </td>
                                                        </tr>
                                                    )))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
