import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { fetch, post } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchingProducts,
    fetchedProducts,
    fetchFailed
} from '../../redux/admin/products/products.slice'
import {
    fetchingStores,
    retrievedStores,
    retrievedStoreFailed
} from '../../redux/stores/allStores.slice'
import {
    fetchingSubCategories,
    retrievedSubCategories,
    fetchFailed as fetchError
} from '../../redux/admin/subCategories/subCategories.slice'
import {
    creatingProduct,
    createdProduct,
    createFailed
} from '../../redux/admin/products/createProduct.slice'

const AdminProduct = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
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

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchingProducts())
        fetch(dispatch, fetchedProducts, fetchFailed, '/admin/product/all', token)
    }, [dispatch, token])


    const { isFetching, products, error } = useSelector((state: RootState) => state.adminProducts)

    // get subcategories
    useEffect(() => {
        dispatch(fetchingSubCategories())
        fetch(dispatch, retrievedSubCategories, fetchError, '/admin/subcategory')
    }, [dispatch])

    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)


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
                                    product
                                </div>
                            </div>

                            {/* add size to a product */}
                        </div>
                    )
                    : navigate('/signin')

            }
        </>
    )
}

export default AdminProduct
