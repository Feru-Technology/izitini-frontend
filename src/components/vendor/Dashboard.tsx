import Header from './Header'
import { useState } from 'react'
import SiderBar from './SiderBar'
import data from '../../data/data.json'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Example from './charts/overallRevenue'
import DashboardCard10 from './cards/topDeals'
import { Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { MyResponsiveRadialBar } from './charts/orderCharts'
import { ChevronDownIcon, DotsHorizontalIcon } from '@heroicons/react/solid'

const VendorDashboard = () => {

    const { isLoading, profile } = useSelector((state: RootState) => state.profile);

    const [isClosed, setIsClosed] = useState(true)
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const navigate = useNavigate()

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : profile ?
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
                                    name={'Vendor'}
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
                                <div className='px-4 sm:px-6  lg:px-8 py-8 w-full h-full max-w-9xl mx-auto bg-gray-200'>
                                    {/* Welcome */}
                                    <div className='grid gap-4 grid-cols-1 md:grid-cols-3 mt-5'>
                                        <div className='flex flex-col bg-white p-4 rounded-lg'>
                                            <div className='flex justify-around'>
                                                <h3 className='font-bold text-xl'>
                                                    Order Activity
                                                </h3>
                                                <div className='flex items-center'>
                                                    <h5>this week</h5>
                                                    <ChevronDownIcon className='w-5 h-5' />
                                                </div>
                                                <DotsHorizontalIcon className='w-5 h-5 text-xl' />
                                            </div>
                                            <div style={{ height: 240, zIndex: 10 }}>
                                                <MyResponsiveRadialBar data={data} />
                                            </div>
                                        </div>

                                        <div className='grid gap-4 grid-rows-2'>
                                            <div className='bg-white p-4 rounded-lg'>
                                                <h2 className='font-bold text-3xl px-4 text-light-blue'>
                                                    876,000 Rwf
                                                </h2>
                                                <h2 className='font-bold text-3xl px-4'>
                                                    Earned this Month
                                                </h2>
                                            </div>
                                            <div className='bg-white p-4 rounded-lg'>
                                                <h2 className='font-bold text-3xl px-4 text-light-blue'>
                                                    150
                                                </h2>
                                                <h2 className='font-bold text-3xl px-4'>
                                                    New Customer
                                                </h2>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center bg-white p-4 rounded-lg'></div>
                                    </div>
                                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mt-5'>
                                        <div className='flex flex-col py-4 px-4 bg-white rounded-lg'>
                                            <div className='flex justify-between'>
                                                <h3 className='font-bold text-xl'>
                                                    Overall Revenue
                                                </h3>
                                                <div className='flex items-center'>
                                                    <h5>This month</h5>
                                                    <ChevronDownIcon className='w-5 h-5' />
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <h2 className='font-bold text-3xl mb-2  text-light-blue'>
                                                    876,000 Rwf
                                                </h2>

                                                <Example />
                                            </div>
                                        </div>
                                        <div className='flex flex-col p-4 bg-white rounded-lg'>
                                            <DashboardCard10 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : navigate('/signin')

            }
        </>
    )
}

export default VendorDashboard
