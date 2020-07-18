import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { fetch, post } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

const AdminProduct = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const params = useParams()
    const { id } = params

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
    const [addSize, setAddSize] = useState(false)
    const [addColor, setAddColor] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [price, setPrice] = useState<string | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [manual, setManual] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string | null>(null)
    const [specification, setSpecification] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProduct())
        fetch(dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])


    const { isLoading, currentProduct, error } = useSelector((state: RootState) => state.product)

    console.log('===========', currentProduct)

    // get subcategories
    useEffect(() => {
        dispatch(fetchingSubCategories())
        fetch(dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
    }, [dispatch])

    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)


    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : currentProduct ?
                    (
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

                                    <form action=''>
                                        <div className='flex md:justify-center'>
                                            <div className='space-y-6 mx-2'>
                                                <Transition show={!!error}>
                                                    <div className='border border-red-600 bg-red-100'>
                                                        <span className='px-2 py-4 text-red-600'> {error?.message} </span>
                                                    </div>
                                                </Transition>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='names'>Name:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none ${editMode && 'pointer-events-auto border'}`}
                                                        id='grid-first-name' type='text' onChange={e => setName(e.target.value)} defaultValue={name || currentStore.name} />

                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='contact'>Contact:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none ${editMode && 'pointer-events-auto border'}`}
                                                        id='grid-last-name' type='text' onChange={e => setShop_contact_no(e.target.value)} defaultValue={shop_contact_no || currentStore.shop_contact_no} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Tin no'>About:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none ${editMode && 'pointer-events-auto border'}`}
                                                        id='grid-last-name' type='text' onChange={e => setAbout_shop(e.target.value)} defaultValue={about_shop || currentStore.about_shop || 'N/A'} />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='email'>Email:</label>
                                                    <input className={`mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none  ${editMode && 'pointer-events-auto border'}`}
                                                        id='grid-last-name' type='text' onChange={e => setShop_email(e.target.value)} defaultValue={shop_email || currentStore.shop_email} />
                                                </div>

                                                {currentStore.shopSpecialties.map((specialties) => (
                                                    <div className='space-x-2 md:space-x-4 flex w-full'>
                                                        <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                            htmlFor='Specialty type'>Specialty:</label>
                                                        <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                            id='grid-last-name' type='text'
                                                            value={specialties.category.name}
                                                        />
                                                    </div>
                                                ))}

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Owner'>Owner:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text'
                                                        value={currentStore.owner.full_name}
                                                    />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Approved'>Approved:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={`${currentStore.is_approved}`} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='created At'>created At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentStore.createdAt), 'dd.MM.yyyy')} />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-3/12 flex justify-end'
                                                        htmlFor='Updated At'>Updated At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-8/12 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={format(new Date(currentStore.updatedAt), 'dd.MM.yyyy')} />
                                                </div>

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            {/* add size to a product */}


                            <div className='flex justify-center my-5 '>
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
                                            return updateShop()
                                        }} >
                                        SAVE
                                    </button>
                                </Transition>
                                <Transition
                                    show={!editMode}>
                                    <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                        onClick={e => {
                                            e.preventDefault()
                                            return setEditMode(true)
                                        }} >
                                        Edit
                                    </button>
                                </Transition>
                            </div>
                        </div>
                    )
                    : ''

            }
        </>
    )
}

export default AdminProduct
