import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { fetch, post } from '../../api/apiAction'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    fetchingSubCategory,
    fetchedSubCategory,
    fetchFailed
} from '../../redux/admin/subCategories/subCategory.slice'
import {
    fetchingStores,
    retrievedStores,
    retrievedStoreFailed
} from '../../redux/stores/allStores.slice'
import {
    creatingProduct,
    createdProduct,
    createFailed
} from '../../redux/admin/products/createProduct.slice'

const SubCatProducts = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const params = useParams()
    const { id } = params

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [shop_id, setShop_id] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchingSubCategory())
        fetch(dispatch, fetchedSubCategory, fetchFailed, `/admin/subcategory/products/${id}`)
    }, [dispatch, id])

    const { isFetching, subCategory, fetchError } = useSelector((state: RootState) => state.adminSubCategory)
    const categoryName = subCategory[0]?.subCategory.name

    useEffect(() => {
        dispatch(fetchingStores())
        fetch(dispatch, retrievedStores, retrievedStoreFailed, '/shop')
    }, [dispatch])

    const { isLoading, stores } = useSelector((state: RootState) => state.stores)

    const createProduct = () => {
        dispatch(creatingProduct())
        post(dispatch, createdProduct, createFailed, `/admin/product/${shop_id}`, { subCategory: categoryName, name, brand, unit }, token)
    }

    const { isCreating, product, createError } = useSelector((state: RootState) => state.adminCreateProduct)

    useEffect(() => {
        if (product) {
            dispatch(fetchingSubCategory())
            fetch(dispatch, fetchedSubCategory, fetchFailed, `/admin/subcategory/products/${id}`)
            dispatch(createdProduct(null))
            setCreateMode(false)
        }
    }, [dispatch, id, product])

    return (
        <>
            {isFetching ? (<h1>loading ...</h1>)
                : subCategory ?
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

                                    <div className='flex items-center justify-between py-8'>
                                        <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>{categoryName}</h3>
                                        <button className='bg-dark-blue hover:bg-middle-blue text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base shadow-md hover:shadow-lg'
                                            onClick={() => setCreateMode(true)} >
                                            ADD A Product
                                        </button>
                                    </div>

                                    <div className='w-full my-4 md:my-5 lg:my-6 '>
                                        <table className='w-full border-gray-200 text-gray-600 border'>
                                            <thead className=''>
                                                <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                    <th
                                                        scope='col'
                                                        className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                    >Names</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Owner</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Status</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Date Created</th>
                                                </tr>
                                            </thead>

                                            {subCategory.map((subCat) => {
                                                return (
                                                    <tbody>
                                                        <tr className='text-center text-xs md:text-sm lg:text-base border-b text-gray-800 hover:bg-gray-100'>
                                                            <td className='py-1 '>
                                                                <div className='md:flex items-center'>
                                                                    <div className='md:w-1/4 mx-3'>
                                                                        <img src='https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg' alt='subCat'
                                                                            className='w-auto h-10' />
                                                                    </div>
                                                                    <div className='md:w-2/4'>

                                                                        <p className='font-normal text-sm'>
                                                                            <span className=''>{subCat.product.name}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-3 '>
                                                                <p className='font-normal text-sm hover:underline hover:text-dark-blue cursor-pointer'
                                                                    onClick={() => navigate(`/admin/shops/${subCat.product.shop.id}`)} >{subCat.product.shop.name}</p>
                                                            </td>
                                                            <td className='py-3 '>
                                                                <p className='font-normal text-sm'>{subCat.product.status}</p>
                                                            </td>
                                                            <td className='py-3 '>
                                                                <p className='font-normal text-sm'>{format(new Date(subCat.product.createdAt), 'dd.MM.yyyy')}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>)
                                            }

                                            )}

                                        </table>

                                    </div>

                                </div>
                            </div>

                            {/* create product */}
                            <Transition show={!!createMode} className='absolute'>
                                <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1 w-full z-30 text-xs md:text-base'>
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
                                                <p className='p-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{createError?.message}</p>

                                            </Transition>
                                        </div>
                                        <form>

                                            <div className=' w-full mb-3'>
                                                <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Shops</h3>
                                                <div className=' w-full mb-3'>
                                                    <select
                                                        className='block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded border-gray-500'
                                                        id='grid-state'
                                                        onChange={e => setShop_id(e.target.value)}
                                                    >
                                                        <option>Choose shop</option>
                                                        {isLoading ? <h1>loading...</h1>
                                                            : stores.map((s) => (<option value={s.id}>{s.name}</option>))}
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
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none 
                                                    w-full ease-linear transition-all duration-150'
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
                    )
                    : <div className='flex justify-center'>{createError?.message}</div>

            }
        </>
    )
}

export default SubCatProducts
