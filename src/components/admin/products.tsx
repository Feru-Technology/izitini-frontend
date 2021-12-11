import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { Link, useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

const Products = () => {

    const { isLoading, profile } = useSelector((state: RootState) => state.profile);

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
    const [showWaiting, setShowWaiting] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(true)
    const [showApproved, setShowApproved] = useState(false)
    const [showUnpublished, setShowUnpublished] = useState(false)

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
                                                    setShowApproved(false)
                                                    setShowWaiting(false)
                                                    setShowUnpublished(false)
                                                }}
                                            >All</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showApproved && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowApproved(true)
                                                    setShowAllProducts(false)
                                                    setShowWaiting(false)
                                                    setShowUnpublished(false)
                                                }}

                                            >Approved</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showUnpublished && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowUnpublished(true)
                                                    setShowAllProducts(false)
                                                    setShowApproved(false)
                                                    setShowWaiting(false)
                                                }}
                                            >Waiting</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showWaiting && 'border-b-2 border-dark-blue'}`}
                                                onClick={() => {
                                                    setShowWaiting(true)
                                                    setShowAllProducts(false)
                                                    setShowApproved(false)
                                                    setShowUnpublished(false)
                                                }}

                                            >Unpublished</li>
                                        </ul>
                                    </div>

                                    <div className='w-full my-4 md:my-5 lg:my-6 '>
                                        <table className='w-full border-gray-200 text-gray-600 border'>
                                            <thead className=''>
                                                <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                    <th
                                                        scope='col'
                                                        className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                    >Names</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Owner</th>
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
                                                    >Date Created</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr className='text-center text-xs md:text-sm lg:text-base border-b text-gray-800'>
                                                    <td className='py-3 '>
                                                        <div className='md:flex items-center'>
                                                            <div className='md:w-1/4 mx-3'>
                                                                <img src='https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg' alt='product' className='w-full' />
                                                            </div>
                                                            <div className='md:w-2/4'>

                                                                <p className='font-normal text-sm'>
                                                                    <span className=''>Product Name</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-3 '>
                                                        <p className='font-normal text-sm'>Rukali</p>
                                                    </td>
                                                    <td className='py-3 '>
                                                        <p className='font-normal text-sm'>waiting for review</p>
                                                    </td>
                                                    <td className='py-3 '>
                                                        <p className='font-normal text-sm'>15-06-2021 10:40</p>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>

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

export default Products
