import { useState } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useStores } from '../../api/stores'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import shorten from '../../utils/common/shotenString'
import { useDispatch, useSelector } from 'react-redux'
import { useSubCategories } from '../../api/subCategories'
import { useAllProducts, getAllProducts, createProd, useRefreshProduct } from '../../api/products'

const Products = () => {

    useAuth('admin')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)
    const [createMode, setCreateMode] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [showWaiting, setShowWaiting] = useState(false)
    const [brand, setBrand] = useState<string | null>(null)
    const [showApproved, setShowApproved] = useState(false)
    const [shop_id, setShop_id] = useState<string | null>(null)
    const [showAllProducts, setShowAllProducts] = useState(true)
    const [showUnpublished, setShowUnpublished] = useState(false)
    const [subCategory, setSubCategory] = useState<string | null>(null)

    useAllProducts()
    const { isFetching, products } = useSelector((state: RootState) => state.adminProducts)

    useStores()
    const { isLoading, stores } = useSelector((state: RootState) => state.stores)

    useSubCategories('/admin/subcategory')
    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)

    const { isCreating, createError } = useSelector((state: RootState) => state.adminCreateProduct)
    useRefreshProduct(setCreateMode)

    return (
        <>
            {isFetching ? (<h1>loading ...</h1>)
                : products ?
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
                                        <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>Products</h3>
                                        <button className='bg-[#004896] hover:bg-[#0e87d2] text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base shadow-md hover:shadow-lg'
                                            onClick={() => setCreateMode(true)} >
                                            ADD A Product
                                        </button>
                                    </div>

                                    <div className='  border-slate-200'>
                                        <ul className='w-full text-xs flex cursor-pointer'>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/4 text-center
                                            py-3 ${showAllProducts && 'border-b-2 border-[#004896]'}`}

                                                onClick={() => {
                                                    setShowWaiting(false)
                                                    setShowApproved(false)
                                                    setShowAllProducts(true)
                                                    setShowUnpublished(false)
                                                    getAllProducts(dispatch, 'all')
                                                }}
                                            >All</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/4 text-center
                                            py-3 ${showApproved && 'border-b-2 border-[#004896]'}`}
                                                onClick={() => {
                                                    setShowApproved(true)
                                                    setShowWaiting(false)
                                                    setShowAllProducts(false)
                                                    setShowUnpublished(false)
                                                    getAllProducts(dispatch, 'approved')
                                                }}

                                            >Approved</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/4 text-center
                                            py-3 ${showUnpublished && 'border-b-2 border-[#004896]'}`}
                                                onClick={() => {
                                                    setShowWaiting(false)
                                                    setShowApproved(false)
                                                    setShowUnpublished(true)
                                                    setShowAllProducts(false)
                                                    getAllProducts(dispatch, 'waiting')
                                                }}
                                            >Pending</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/4 text-center
                                            py-3 ${showWaiting && 'border-b-2 border-[#004896]'}`}
                                                onClick={() => {
                                                    setShowWaiting(true)
                                                    setShowApproved(false)
                                                    setShowUnpublished(false)
                                                    setShowAllProducts(false)
                                                    getAllProducts(dispatch, 'drafts')
                                                }}

                                            >Unpublished</li>
                                        </ul>
                                    </div>

                                    <div className='w-full my-4 md:my-5 lg:my-6 '>
                                        <table className='w-full border-slate-200 text-slate-600 border'>
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

                                            <tbody>
                                                {products.map((product) => {
                                                    return (
                                                        <tr key={product.id}
                                                            className='text-center text-xs md:text-sm lg:text-base border-b text-slate-800 hover:bg-slate-100'>
                                                            <td className='py-1 hover:text-[#004896] hover:underline'
                                                                onClick={() => navigate(`/admin/products/${product.id}`)}>
                                                                <div className='md:flex'>
                                                                    <div className='md:w-1/6 m-2'>
                                                                        <img src={product.display_image || 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg'}
                                                                            alt='product' className='w-auto h-10 mx-auto' />
                                                                    </div>
                                                                    <div className='md:w-5/6 m-1'>
                                                                        <p className='font-normal text-sm cursor-pointer text-left'>
                                                                            {shorten(product.name, 120)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-3'
                                                                onClick={e => navigate(`/admin/products/shop/${product.shop.id}`)}>
                                                                <p className='font-normal text-sm hover:underline hover:text-[#004896] cursor-pointer'>{product.shop.name}</p>
                                                            </td>
                                                            <td className='py-3'
                                                                onClick={e => navigate(`/admin/products/${product.id}`)}>
                                                                <p className='font-normal text-sm'>{product.status}</p>
                                                            </td>
                                                            <td className='py-3'
                                                                onClick={e => navigate(`/admin/products/${product.id}`)}>
                                                                <p className='font-normal text-sm'>{format(new Date(product.createdAt), 'dd.MM.yyyy')}</p>
                                                            </td>
                                                        </tr>)
                                                })}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>
                            </div>

                            {/* create product */}
                            <Transition show={!!createMode} className='absolute'>
                                <div className='top-0 z-10 text-slate-500 bg-slate-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-0 right-6 md:right-1/4
                                    text-slate-600 hover:text-[#004896] hover:shadow-lg'
                                            onClick={() => setCreateMode(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-slate-600'>Create Product</div>
                                        <div className='container'>
                                            <Transition
                                                show={!!createError}
                                            >
                                                <p className='p-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{createError?.message}</p>

                                            </Transition>
                                        </div>
                                        <form>


                                            <div className=' w-full mb-3'>
                                                <h3 className='block uppercase text-slate-600 text-xs font-bold mb-2'>Shops</h3>
                                                <div className=' w-full mb-3'>
                                                    <select
                                                        className='block appearance-none w-full bg-white border text-slate-700 py-3 px-4 pr-8 rounded border-slate-500'
                                                        id='grid-state'
                                                        onChange={e => setShop_id(e.target.value)}
                                                    >
                                                        <option>Choose shop</option>
                                                        {isLoading ? 'Loading...'
                                                            : stores.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <h3 className='block uppercase text-slate-600 text-xs font-bold mb-2'>Sub-Categories</h3>
                                                <div className=' w-full mb-3'>
                                                    <select
                                                        className='block appearance-none w-full bg-white border text-slate-700 py-3 px-4 pr-8 rounded border-slate-500'
                                                        id='grid-state'
                                                        onChange={e => setSubCategory(e.target.value)}
                                                    >
                                                        <option>Choose sub-category</option>
                                                        {isSubCatLoading ? 'Loading...'
                                                            : subCategories.map((c) => (<option key={c.id}>{c.name}</option>))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='name'
                                                    onChange={e => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Brand
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Brand'
                                                    onChange={e => setBrand(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Unit
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='unit'
                                                    onChange={e => setUnit(e.target.value)}
                                                />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className='bg-[#004896] hover:bg-[#0e87d2] text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return createProd(dispatch, shop_id!, { subCategory, name, brand, unit })
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
                    : navigate('/signin')

            }
        </>
    )
}

export default Products
