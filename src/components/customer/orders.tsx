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
    const [showSampleOrders, setShowSampleOrders] = useState(false)
    const [showRejectedOrders, setShowRejectedOrders] = useState(false)
    const [showCompletedOrders, setShowCompletedOrders] = useState(false)
    const [showProcessingOrders, setShowProcessingOrders] = useState(true)

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
                    <div className=''>
                        <p className='font-bold my-4'>My Orders</p>
                        <div className='bg-white border border-gray-200'>
                            <div className=' px-1 pt-6 md:p-5 flex justify-center text-xs'>
                                <div className={`border-2 p-2 mx-1 ${showProcessingOrders && 'border-light-blue bg-light-blue text-white'}`}

                                    onClick={() => {
                                        setShowProcessingOrders(true)
                                        setShowSampleOrders(false)
                                        setShowRejectedOrders(false)
                                        setShowCompletedOrders(false)
                                    }}
                                >Processing Orders</div>
                                <div className={`border-2 p-2 mx-1 ${showCompletedOrders && 'border-light-blue bg-light-blue text-white'}`}
                                    onClick={() => {
                                        setShowCompletedOrders(true)
                                        setShowSampleOrders(false)
                                        setShowRejectedOrders(false)
                                        setShowProcessingOrders(false)
                                    }}
                                >Completed Orders</div>
                                <div className={`border-2 p-2 mx-1 ${showSampleOrders && 'border-light-blue bg-light-blue text-white'}`}
                                    onClick={() => {
                                        setShowSampleOrders(true)
                                        setShowRejectedOrders(false)
                                        setShowCompletedOrders(false)
                                        setShowProcessingOrders(false)
                                    }}

                                >Sample Orders</div>
                                <div className={`border-2 p-2 mx-1 ${showRejectedOrders && 'border-light-blue bg-light-blue text-white'}`}
                                    onClick={() => {
                                        setShowRejectedOrders(true)
                                        setShowSampleOrders(false)
                                        setShowCompletedOrders(false)
                                        setShowProcessingOrders(false)
                                    }}

                                >Rejected Orders</div>
                            </div>

                        </div>

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
