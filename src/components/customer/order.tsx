import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Order = () => {

    // redux
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)

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
                        name={'Customer'}
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
                        <div className='bg-white border border-gray-200 rounded-md'>

                            <div className='w-full my-4 px-4 md:my-5 md:px-5 lg:my-6 lg:px-6'>
                                <table className='w-full border-gray-200 text-gray-600'>
                                    <thead className='bg-gray-100'>
                                        <tr className='font-bold text-xs md:text-sm text-center border uppercase'>
                                            <th
                                                scope='col'
                                                className='
                                                py-3 lg:text-base
                                    '
                                            >Product</th>
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
                                            >quantity</th>
                                            <th
                                                scope='col'
                                                className='
                                                py-3 lg:text-base
                                    '
                                            >Notes</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>)
}

export default Order
