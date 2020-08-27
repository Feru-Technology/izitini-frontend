import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { fetch, post, update } from '../../api/apiAction'
import {
    product,
    getProduct,
    productFailed
} from '../../redux/products/product.slice'
import {
    fetchingSubCategories,
    retrievedSubCategories,
    fetchFailed
} from '../../redux/admin/subCategories/subCategories.slice'
import {
    updatingProduct,
    updatedProduct,
    updateFailed
} from '../../redux/admin/products/updateProduct.slice'

const AdminProduct = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const params = useParams()
    const { id } = params

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [addSize, setAddSize] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [addColor, setAddColor] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [manual, setManual] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string | null>(null)
    const [specification, setSpecification] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getProduct())
        fetch(dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])


    const { isLoading, currentProduct, error } = useSelector((state: RootState) => state.product)

    console.log(currentProduct)

    useEffect(() => {
        if (currentProduct) {
            setEditMode(false)
            setName(currentProduct.product.name)
            setUnit(currentProduct.product.unit)
            setPrice(currentProduct.product.price)
            setBrand(currentProduct.product.brand)
            setStatus(currentProduct.product.status)
            setManual(currentProduct.product.manual)
            setQuantity(currentProduct.product.quantity)
            setSpecification(currentProduct.product.specification)
        }
    }, [currentProduct])

    // get subcategories
    useEffect(() => {
        dispatch(fetchingSubCategories())
        fetch(dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
    }, [dispatch])

    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)

    const updateProduct = () => {
        dispatch(updatingProduct())
        update(dispatch, updatedProduct, updateFailed, `/admin/product/${id}`, { name, unit, price, brand, status, manual, quantity, specification }, token)
    }

    const { isUpdating, updated, updateError } = useSelector((state: RootState) => state.adminUpdateProduct)

    useEffect(() => {
        if (updated) {
            dispatch(getProduct())
            fetch(dispatch, product, productFailed, `/product/${id}`)
            dispatch(updatedProduct(null))
            setEditMode(false)
        }
    }, [dispatch, id, updated])


    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : currentProduct ?
                    (
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
                                    name={'Admin'}
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

                                {/* admin dashboard */}

                                <div className='px-2 md:px-6 lg:px-14 w-full'>

                                    <div className='my-5 '>
                                        <Transition className='flex space-x-6'
                                            show={!!editMode}
                                        >
                                            <button className='py-3 px-6 border border-dark-blue text-dark-blue rounded-md text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                        </Transition>
                                        <Transition
                                            show={!editMode}>
                                            <button className='py-3 px-6 border border-dark-blue text-dark-blue rounded-md text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(true)
                                                }} >
                                                Edit
                                            </button>
                                        </Transition>
                                    </div>

                                    <div className='border border-gray-200 p-8 bg-white shadow-md rounded-md'>
                                        <form className='border-b border-dark-blue pb-8'>
                                            <div>
                                                <Transition show={!!updateError}>
                                                    <div className='border border-red-600 bg-red-100'>
                                                        <span className='px-2 py-4 text-red-600'> {updateError?.message} </span>
                                                    </div>
                                                </Transition>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
                                                    <div className=''>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Name:</label>
                                                        <input type='name'
                                                            className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-first-name' onChange={e => setName(e.target.value)} defaultValue={name || currentProduct.product.name} />

                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Unit:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setUnit(e.target.value)} defaultValue={specification || currentProduct.product.specification} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Price:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='number' onChange={e => setPrice(e.target.valueAsNumber)} defaultValue={price || currentProduct.product.price || 'N/A'} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Brand:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setBrand(e.target.value)} defaultValue={brand || currentProduct.product.brand} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Status:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setStatus(e.target.value)} defaultValue={status || currentProduct.product.status} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Specs:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setSpecification(e.target.value)} defaultValue={specification || currentProduct.product.specification} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Manual:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setManual(e.target.value)} defaultValue={manual || currentProduct.product.manual || 'N/A'} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Quantity:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue  pointer-events-none
                                                        ${editMode && 'pointer-events-auto border'}`}
                                                            id='grid-last-name' type='text' onChange={e => setQuantity(e.target.value)} defaultValue={quantity || currentProduct.product.quantity} />
                                                    </div>

                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Owner:</label>
                                                        <input className='border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            id='grid-last-name' type='text'
                                                            value={currentProduct.product.shop.name}
                                                        />
                                                    </div>
                                                    <div className='w-full'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >created At:</label>
                                                        <input className='border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            id='grid-last-name' type='text' value={format(new Date(currentProduct.product.createdAt), 'dd.MM.yyyy')} />
                                                    </div>

                                                </div>
                                            </div>

                                        </form>

                                        <div className='w-full mb-8'>
                                            {/* product sub-category */}
                                            <div >
                                                {currentProduct.subCategory.map((subCat) => (
                                                    <div className='font-semibold text-sm md:text-base text-gray-500 w-ful'>Sub-Category:
                                                        <span className='text-gray-800 ml-1'> {subCat.subCategory.name}</span></div>
                                                ))}
                                            </div>

                                            {/* product sizes */}
                                            <div className='w-full'>
                                                <p>Product sizes</p>
                                                <div className='flex'>
                                                    {currentProduct.sizes.map((size) => {
                                                        console.log('==========', size)
                                                        return (
                                                            <div className='w-1/4 mx-1 bg-white border shadow-md p-2'>
                                                                <p className='font-medium'>Size: <span className='font-normal'>{size.size.size}</span> </p>
                                                                <p className='font-medium'>Price: <span className='font-normal'>{size.price}</span> </p>
                                                                <p className='font-medium'>Quantity: <span className='font-normal'>{size.quantity}</span> </p>
                                                            </div>
                                                        )
                                                    })}
                                                    <div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=' my-5 '>
                                        <Transition className='flex space-x-6'
                                            show={!!editMode}
                                        >
                                            <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                            <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return updateProduct()
                                                }} >
                                                {isUpdating ? 'updating ...' : 'SAVE CHANGES'}
                                            </button>
                                        </Transition>
                                    </div>
                                </div>

                            </div>

                            {/* add size to a product */}


                        </div>
                    )
                    : ''

            }
        </>
    )
}

export default AdminProduct
