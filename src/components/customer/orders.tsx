import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { fetch } from '../../api/apiAction'
import { useState, useEffect } from 'react'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, orders as myOrders, ordersFailed } from '../../redux/order/orders.slice'

const MyOrders = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { profile } = useSelector((state: RootState) => state.profile)

    const [isClosed, setIsClosed] = useState(false)
    const [showAllOrders, setShowAllOrders] = useState(true)
    const [showSampleOrders, setShowSampleOrders] = useState(false)
    const [showRejectedOrders, setShowRejectedOrders] = useState(false)
    const [showCompletedOrders, setShowCompletedOrders] = useState(false)
    const [showProcessingOrders, setShowProcessingOrders] = useState(false)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(getOrders())
        fetch(dispatch, myOrders, ordersFailed, '/orders/mine', token)
    }, [dispatch, token])

    const { isLoading, orders, error } = useSelector((state: RootState) => state.orders)
    console.log(orders)

    return (
        <div className='bg-gray-100'>
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

                    {/* customer orders */}
                    <div className='px-2 md:px-8 w-full'>
                        <p className='font-bold my-3 text-sm'>My Orders</p>
                        <div className='bg-white border border-gray-200'>
                            <div>
                                <tr className=' px-1 pt-6 md:p-5 w-full text-xs'>
                                    <td className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            md:px-6 lg:px-6 py-3 ${showAllOrders && 'border-b-2 border-light-blue'}`}

                                        onClick={() => {
                                            setShowAllOrders(true)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}
                                    >All</td>
                                    <td className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            md:px-6 lg:px-6 py-3 ${showProcessingOrders && 'border-b-2 border-light-blue'}`}

                                        onClick={() => {
                                            setShowProcessingOrders(true)
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                        }}
                                    >Processing</td>
                                    <td className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            md:px-6 lg:px-6 py-3 ${showSampleOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            setShowSampleOrders(true)
                                            setShowAllOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}

                                    >Sample</td>
                                    <td className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            md:px-6 lg:px-6 py-3 ${showCompletedOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            setShowCompletedOrders(true)
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}
                                    >Completed</td>
                                    <td className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            md:px-6 lg:px-6 py-3 ${showRejectedOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            setShowRejectedOrders(true)
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}

                                    >Rejected</td>
                                </tr>
                            </div>

                        </div>

                        <thead>
                            <th className=''>name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Tracking no</th>
                        </thead>

                    </div>

                    {/* orders */}

                    <div>
                        <div className='flex flex-col md:flex-row md:justify-center md:items-center'> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders
