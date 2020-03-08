import { useEffect, useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { RootState } from '../../redux/store'
import axiosAction from '../../api/apiAction'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
    fetchingProducts,
    storeProducts,
    productFailed
} from '../../redux/products/storeProducts.slice '
import { createdProduct, createFailed, creatingProduct } from '../../redux/admin/products/createProduct.slice'
import { fetchingSubCategories, retrievedSubCategories, fetchFailed } from '../../redux/admin/subCategories/subCategories.slice'
const Products = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useAuth('business')

    const params = useParams()
    const { id } = params

    const [isClosed, setIsClosed] = useState(true)
    const [createMode, setCreateMode] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [subCategory, setSubCategory] = useState<string | null>(null)
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    // redux
    const dispatch = useDispatch()


    const isLoggingIn = useSelector((state: RootState) => state.profile.isLoading)

    const { currentStore } = useSelector((state: RootState) => state.store)

    useEffect(() => {
        dispatch(fetchingProducts())
        axiosAction('get', dispatch, storeProducts, productFailed, `/product/s/all`, token)

    }, [dispatch, token])

    const { isLoading, products } = useSelector((state: RootState) => state.storeProducts)

    // get subcategories
    useEffect(() => {
        dispatch(fetchingSubCategories())
        axiosAction('get', dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
    }, [dispatch])

    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)

    const createProduct = () => {
        dispatch(creatingProduct())
        axiosAction('post', dispatch, createdProduct, createFailed, '/product', token, { subCategory, name, brand, unit })
    }

    const { isCreating, product, createError } = useSelector((state: RootState) => state.adminCreateProduct)

    useEffect(() => {
        if (product) {
            const { id } = product
            dispatch(createdProduct(null))
            setCreateMode(false)
            navigate(`/vendor/products/${id}`)
        }
    }, [dispatch, navigate, product])

    return (
        <>
            {isLoggingIn ? 'Loading ...' :
                <div className='flex h-screen overflow-hidden bg-gray-100'>
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
                            name={'Vendor'}
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
                        <div className='px-2 lg:px-8 py-8 w-full mx-auto'>
                            <div className='flex items-center justify-between py-8'>
                                <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>{currentStore?.name}</h3>

                                <button className='hover:bg-middle-blue bg-dark-blue text-white font-bold
                            py-2 px-4 rounded cursor-pointer text-sm md:text-base shadow-md'
                                    onClick={() => setCreateMode(true)}>
                                    ADD A PRODUCT
                                </button>
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
                                                                <tr className='hover:bg-gray-100 cursor-default' key={product.id}
                                                                    onClick={e => navigate(`/vendor/products/${product.id}`)}>
                                                                    <td className='pl-3 w-5/12 py-4'>
                                                                        <div className='flex items-center'>
                                                                            <div className='flex-shrink-0 h-10 w-10'>
                                                                                <img
                                                                                    className='h-10 w-10'
                                                                                    src={product.display_image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'}
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
                    {/* create product */}
                    <Transition show={!!createMode} className='absolute'>
                        <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen min-h-screen'>
                        </div>
                        <div className='absolute top-16 w-full z-30 text-xs md:text-base'>
                            <div className='p-3 bg-white w-ful mx-6 md:w-2/4 md:mx-auto rounded-md shadow-md
                        md:p-6 lg:p-8'>

                                <MdOutlineCancel className='h-6 w-auto absolute top-0 right-6 md:right-1/4
                        text-gray-600 hover:text-dark-blue hover:shadow-lg'
                                    onClick={() => setCreateMode(false)} />

                                <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>Create Product</div>
                                <div className='container'>
                                    <Transition
                                        show={!!createError}
                                    >
                                        <p className='py-2 px-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{createError?.message}</p>

                                    </Transition>
                                </div>
                                <form>

                                    <div className=' w-full mb-3'>
                                        <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Sub-Categories</h3>
                                        <div className=' w-full mb-3'>
                                            <select
                                                className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded border-gray-500'
                                                id='grid-state'
                                                onChange={e => setSubCategory(e.target.value)}
                                            >
                                                <option>Choose sub-category</option>
                                                {isSubCatLoading ? <h1>loading...</h1>
                                                    : subCategories.map((c) => (<option>{c.name}</option>))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className=' w-full mb-3'>
                                        <label
                                            className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                            htmlFor='grid-text'
                                        >
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                            placeholder='name'
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className=' w-full mb-3'>
                                        <label
                                            className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                            htmlFor='grid-text'
                                        >
                                            Brand
                                        </label>
                                        <input
                                            type='text'
                                            className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                            placeholder='Brand'
                                            onChange={e => setBrand(e.target.value)}
                                        />
                                    </div>

                                    <div className=' w-full mb-3'>
                                        <label
                                            className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                            htmlFor='grid-text'
                                        >
                                            Unit
                                        </label>
                                        <input
                                            type='text'
                                            className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                            placeholder='unit'
                                            onChange={e => setUnit(e.target.value)}
                                        />
                                    </div>
                                    <div className='text-center mt-6'>
                                        <button
                                            className='bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                    rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                            type='button'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                return createProduct()
                                            }}
                                        >
                                            {!!isCreating ? 'Creating...' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition>
                </div>
            }
        </>
    )
}

export default Products
