import SiderBar from './SiderBar'
import { format } from 'date-fns'
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

    // const { profile } = useSelector((state: RootState) => state.profile)

    const [isClosed, setIsClosed] = useState(true)
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


    const Orders = (type: string, status?: string) => {
        dispatch(getOrders())
        let url: string
        type === 'all' ? url = '/orders/mine' :
            type === 'processing' ? url = '/orders/processing' :
                type === 'sample' ? url = '/orders/sample' :
                    url = `/orders/my/${status}`

        return fetch(dispatch, myOrders, ordersFailed, url, token)
    }

    const { orders, error } = useSelector((state: RootState) => state.orders)

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
                        name={''}
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
                    <div className='px-2 md:px-6 lg:px-14 w-full'>
                        <p className='font-bold my-3 text-sm'>My Orders</p>
                        <div className='bg-white border border-gray-200'>
                            <div className=' border-b border-gray-200'>
                                <ul className='w-full text-xs flex cursor-pointer uppercase'>
                                    <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            py-3 ${showAllOrders && 'border-b-2 border-light-blue'}`}

                                        onClick={() => {
                                            Orders('all')
                                            setShowAllOrders(true)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}
                                    >All
                                    </li>
                                    <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            py-3 ${showProcessingOrders && 'border-b-2 border-light-blue'}`}

                                        onClick={() => {
                                            Orders('processing')
                                            setShowProcessingOrders(true)
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                        }}
                                    >Processing</li>
                                    <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            py-3 ${showSampleOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            Orders('sample')
                                            setShowAllOrders(false)
                                            setShowSampleOrders(true)
                                            setShowRejectedOrders(false)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}

                                    >Sample</li>
                                    <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            py-3 ${showCompletedOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            Orders('d', 'delivered')
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowCompletedOrders(true)
                                            setShowRejectedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}
                                    >Completed</li>
                                    <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/5 text-center
                                            py-3 ${showRejectedOrders && 'border-b-2 border-light-blue'}`}
                                        onClick={() => {
                                            Orders('r', 'rejected')
                                            setShowAllOrders(false)
                                            setShowSampleOrders(false)
                                            setShowRejectedOrders(true)
                                            setShowCompletedOrders(false)
                                            setShowProcessingOrders(false)
                                        }}

                                    >Rejected</li>
                                </ul>
                            </div>

                            <div className='w-full my-4 px-4 md:my-5 md:px-5 lg:my-6 lg:px-6'>

                                {orders ?
                                    <table className='w-full border-gray-200 text-gray-600'>
                                        <thead className='bg-gray-100'>
                                            <tr className='font-bold text-xs md:text-sm text-center border uppercase'>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Order no</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Price</th>
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
                                                >Date</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id}
                                                    className='text-center text-xs md:text-sm lg:text-base border text-gray-800
                                                hover:bg-gray-100 cursor-pointer' onClick={() => navigate(`/orders/${order.id}`)}>
                                                    <td className='py-3 border'>
                                                        <p className='font-normal text-sm'>
                                                            <span className=''>{order.order_no}</span>
                                                        </p>
                                                    </td>
                                                    <td className='py-3 border'>
                                                        <p className='font-normal text-sm'>{order.sub_total}</p>
                                                    </td>
                                                    <td className='py-3 border'>
                                                        <p className='font-normal text-sm'>{order.status}</p>
                                                    </td>
                                                    <td className='py-3 border'>
                                                        <p className='font-normal text-sm'>{format(new Date(order.createdAt), 'dd.MM.yyyy hh:mm')}</p>
                                                    </td>
                                                </tr>

                                            ))}
                                        </tbody>

                                    </table> : <div className='text-center font-semibold py-10 text-gray-800'>{error?.message}</div>}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders
