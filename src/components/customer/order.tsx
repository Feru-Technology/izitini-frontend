import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchingOrder, fetchedOrder, fetchFailed } from '../../redux/order/order.slice'

const Order = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useAuth(navigate, token)

    // redux
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)

    useEffect(() => {
        dispatch(fetchingOrder())
        fetch(dispatch, fetchedOrder, fetchFailed, `/orders/mine/${id}`, token)
    }, [dispatch, id, token])

    const { fetching, order, fetchError } = useSelector((state: RootState) => state.order)

    return (
        <>
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

                    {/* customer order */}
                    <div className=' md:px-6 lg:px-14 w-full'>
                        <div className='flex justify-between text-sm md:text-base my-4 mx-2'>
                            <p className='font-bold '>My Order</p>
                            <p> <span className='font-bold'> status:</span> <span className='px-2 py-1 text-white bg-dark-blue rounded-lg'>{order?.status}</span> </p>
                        </div>
                        <div className='bg-white border border-gray-200 rounded-md'>

                            {order ?
                                <div className='w-full p-0.5 md:my-5 md:px-5 lg:my-6 lg:px-6'>
                                    <table className='w-full border-gray-200 text-gray-600'>
                                        <thead className='bg-gray-100'>
                                            <tr className='font-bold text-xs md:text-sm text-center border uppercase'>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Products</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base sr-only md:not-sr-only
                                    '
                                                >Price</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base sr-only md:not-sr-only
                                    '
                                                >Quantity</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base sr-only lg:not-sr-only
                                    '
                                                >Notes</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {order.order_items.map((item) => {
                                                return (
                                                    <tr className='border text-gray-900' key={item.id}>
                                                        <td className='md:w-2/4'>
                                                            <div className='md:flex p-3'>
                                                                <div className='w-8/12 md:w-1/3 md:p-1'>
                                                                    <img className=' 2xl:h-52 w-full'
                                                                        src={item.product.display_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png'} alt='' />
                                                                </div>
                                                                <div className='md:w-2/3 md:px-3'>
                                                                    <ul className='font-normal text:xs md:text-base text-gray-800'>
                                                                        <li className='font-bold text:sm text-lg'>{item.product.name}</li>
                                                                        <li>By <span className='text-sm italic text-gray-500'>product Brand</span> </li>
                                                                        <li className='md:sr-only'>Price: <span className='text-sm italic text-gray-500'>{item.product.price} Frw</span></li>
                                                                        <li>Color: <span className='text-sm italic text-gray-500'>Red</span></li>
                                                                        <li>Size: <span className='text-sm italic text-gray-500'>Lg</span></li>
                                                                        <li className='md:sr-only'>Qty: <span className='text-sm italic text-gray-500'>2</span></li>
                                                                        <li className='lg:sr-only'>Note: <span className='text-sm italic text-gray-500'>note</span></li>
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center sr-only md:not-sr-only'>{item.product.price}</td>
                                                        <td className='text-center sr-only md:not-sr-only'>{item.quantity}</td>
                                                        <td className='text-center sr-only lg:not-sr-only'>{item.details}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                    </table>

                                    <div className='mt-5 border'>
                                        <h1 className='border-b'> <span className='px-2 py-3 font-bold text-lg'>More Details</span> </h1>
                                        <ul className='space-y-2 px-2 py-3 font-semibold text-base text-gray-500'>
                                            <li>Order no: <span className='font-normal ml-2 text-gray-900'>1</span></li>
                                            <li>Type: <span className='font-normal ml-2 text-gray-900'>Sample</span></li>
                                            <li>Is Paid: <span className='font-normal ml-2 text-gray-900'>Yes</span></li>
                                            <li>Paid Amount: <span className='font-normal ml-2 text-gray-900'>1000</span></li>
                                            <li>Payment method: <span className='font-normal ml-2 text-gray-900'>card</span></li>
                                            <li>Total Order cost: <span className='font-normal ml-2 text-gray-900'>20000</span></li>
                                            <li>Total Shipping cost: <span className='font-normal ml-2 text-gray-900'>5000</span></li>
                                            <li>Shipping method: <span className='font-normal ml-2 text-gray-900'>transit</span></li>
                                            <li>Shipping address: <span className='font-normal ml-2 text-gray-900'>123456 ave</span></li>

                                        </ul>

                                    </div>

                                </div> : <div></div>}

                        </div>

                    </div>

                </div>
            </div>

        </>)
}

export default Order
