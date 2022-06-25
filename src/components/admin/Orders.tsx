import { useState } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, useOrders } from '../../api/orders';

const AllOrders = () => {

    useAuth('admin')
    const navigate = useNavigate()

    // redux
    const dispatch = useDispatch()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)
    const [showAllOrders, setShowAllOrders] = useState(true)
    const [showSampleOrders, setShowSampleOrders] = useState(false)
    const [showRejectedOrders, setShowRejectedOrders] = useState(false)
    const [showCompletedOrders, setShowCompletedOrders] = useState(false)
    const [showProcessingOrders, setShowProcessingOrders] = useState(false)

    useOrders('/admin/order/all')
    const { isLoading, orders, error } = useSelector((state: RootState) => state.orders)

    return (
        <>
            {isLoading ? 'Loading ...' :
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

                        {/* orders */}
                        <div className='px-2 md:px-6 lg:px-14 w-full'>
                            <p className='font-bold my-3 text-sm'>My Orders</p>
                            <div className='bg-white border border-slate-200'>
                                <div className=' border-b border-slate-200'>
                                    <ul className='w-full text-xs flex cursor-pointer uppercase'>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/5 text-center
                                            py-3 ${showAllOrders && 'border-b-2 border-[#00adef]'}`}

                                            onClick={() => {
                                                setShowAllOrders(true)
                                                setShowSampleOrders(false)
                                                setShowRejectedOrders(false)
                                                setShowCompletedOrders(false)
                                                setShowProcessingOrders(false)
                                                allOrders(dispatch, '/admin/order/all')
                                            }}
                                        >All
                                        </li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/5 text-center
                                            py-3 ${showProcessingOrders && 'border-b-2 border-[#00adef]'}`}

                                            onClick={() => {
                                                setShowAllOrders(false)
                                                setShowSampleOrders(false)
                                                setShowRejectedOrders(false)
                                                setShowProcessingOrders(true)
                                                setShowCompletedOrders(false)
                                                allOrders(dispatch, '/admin/order/processing')
                                            }}
                                        >Processing</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/5 text-center
                                            py-3 ${showSampleOrders && 'border-b-2 border-[#00adef]'}`}
                                            onClick={() => {
                                                setShowAllOrders(false)
                                                setShowSampleOrders(true)
                                                setShowRejectedOrders(false)
                                                setShowCompletedOrders(false)
                                                setShowProcessingOrders(false)
                                                allOrders(dispatch, '/admin/order/status?is_sample=true')
                                            }}

                                        >Sample</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/5 text-center
                                            py-3 ${showCompletedOrders && 'border-b-2 border-[#00adef]'}`}
                                            onClick={() => {
                                                setShowAllOrders(false)
                                                setShowSampleOrders(false)
                                                setShowCompletedOrders(true)
                                                setShowRejectedOrders(false)
                                                setShowProcessingOrders(false)
                                                allOrders(dispatch, '/admin/order/status?status=delivered')
                                            }}
                                        >Completed</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800 px-1 w-1/5 text-center
                                            py-3 ${showRejectedOrders && 'border-b-2 border-[#00adef]'}`}
                                            onClick={() => {
                                                setShowAllOrders(false)
                                                setShowSampleOrders(false)
                                                setShowRejectedOrders(true)
                                                setShowCompletedOrders(false)
                                                setShowProcessingOrders(false)
                                                allOrders(dispatch, '/admin/order/status?status=rejected')
                                            }}

                                        >Rejected</li>
                                    </ul>
                                </div>

                                <div className='w-full my-4 px-4 md:my-5 md:px-5 lg:my-6 lg:px-6'>

                                    {orders ?
                                        <table className='w-full border-slate-200 text-slate-600'>
                                            <thead className='bg-slate-100'>
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
                                                    >Shop</th>
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
                                                        className='text-center text-xs md:text-sm lg:text-base border text-slate-800
                                                hover:bg-slate-100 cursor-pointer' onClick={() => navigate(`/admin/orders/${order.id}`)}>
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
                                                            <p className='font-normal text-sm'>{order.shop.name}</p>
                                                        </td>
                                                        <td className='py-3 border'>
                                                            <p className='font-normal text-sm'>{format(new Date(order.createdAt), 'dd.MM.yyyy hh:mm')}</p>
                                                        </td>
                                                    </tr>

                                                ))}
                                            </tbody>

                                        </table> : <div className='text-center font-semibold py-10 text-slate-800'>{error?.message}</div>}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AllOrders
