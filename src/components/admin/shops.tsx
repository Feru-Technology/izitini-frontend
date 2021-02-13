import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchingStores,
    retrievedStores,
    retrievedStoreFailed
} from '../../redux/stores/allStores.slice'

const Shops = () => {

    // redux
    const dispatch = useDispatch()

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })
    const [isClosed, setIsClosed] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchingStores())
        fetch(dispatch, retrievedStores, retrievedStoreFailed, '/shop')
    }, [dispatch])

    const { isLoading, stores } = useSelector((state: RootState) => state.stores)

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : stores ? (
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

                            {/* customer dashboard */}

                            <div className='px-2 md:px-6 lg:px-14 w-full'>
                                <p className='font-bold my-3 text-sm md:mt-6 md:text-xl text-center underline'>Shops</p>

                                <div className='w-full my-4 md:my-5 lg:my-6 '>
                                    <table className='w-full border-gray-200 text-gray-600 border'>
                                        <thead className=''>
                                            <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                <th
                                                    scope='col'
                                                    className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                >Name</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Email</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Contacts</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >About Shop</th>
                                            </tr>
                                        </thead>

                                        {stores.map((store) => {
                                            const storeImage = store.shop_image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                            return (
                                                <tbody>

                                                    <tr className='text-center text-xs md:text-sm lg:text-base border-b
                                                    text-gray-800 hover:bg-gray-100'
                                                        onClick={() => navigate(`/admin/shop/${store.id}`)} >
                                                        <td className='py-3 '>
                                                            <div className='md:flex items-center'>
                                                                <div className='md:w-1/4 mx-3'>
                                                                    <img src={storeImage} alt='product' className='w-full' />
                                                                </div>
                                                                <div className='md:w-2/4'>

                                                                    <p className='font-normal text-sm'>
                                                                        <span className=''>{store.name}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.shop_email}</p>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.shop_contact_no}</p>
                                                        </td>
                                                        <td className='py-3 '>
                                                            <p className='font-normal text-sm'>{store.about_shop}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>)
                                        })
                                        }
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>

                )
                    : <div></div>

            }
        </>
    )
}

export default Shops
