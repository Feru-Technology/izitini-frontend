import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { Link, useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

const Reports = () => {

    const { isLoading, profile } = useSelector((state: RootState) => state.profile);

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
    const [showWaiting, setShowWaiting] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(true)
    const [showUsers, setShowUsers] = useState(false)
    const [showShops, setShowShops] = useState(false)

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
                                    <p className='font-bold my-3 text-sm md:mt-6 md:text-xl text-center underline'>Products</p>
                                    <div className='  border-gray-200'>
                                        <ul className='w-full text-xs flex cursor-pointer'>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showAllProducts && 'border-b-2 border-dark-blue'}`}

                                                onClick={() => {
                                                    setShowAllProducts(true)
                                                    setShowUsers(false)
                                                    setShowWaiting(false)
                                                    setShowShops(false)
                                                }}
                                            >All</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showUsers && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowUsers(true)
                                                    setShowAllProducts(false)
                                                    setShowWaiting(false)
                                                    setShowShops(false)
                                                }}

                                            >Users</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showShops && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowShops(true)
                                                    setShowAllProducts(false)
                                                    setShowUsers(false)
                                                    setShowWaiting(false)
                                                }}
                                            >Shops</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showWaiting && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowWaiting(true)
                                                    setShowAllProducts(false)
                                                    setShowUsers(false)
                                                    setShowShops(false)
                                                }}

                                            >Products</li>
                                        </ul>
                                    </div>

                                    <div className='flex justify-center font-medium text-lg mt-5'>You have no Report</div>

                                </div>
                            </div>
                        </div>
                    )
                    : navigate('/signin')

            }
        </>
    )
}

export default Reports
