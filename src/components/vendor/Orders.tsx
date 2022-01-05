import React, { useState } from 'react'
import SiderBar from './SiderBar'
import { useMediaQuery } from 'react-responsive'
import Header from './Header'
import { Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import Example from './Dropdown'

interface Iactive {
    active: boolean
}
const Orders = () => {
    const [isClosed, setIsClosed] = useState(false)
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })
    return (
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
                <div className='px-4 sm:px-6  lg:px-8 py-8 w-full h-full max-w-9xl mx-auto bg-gray-200'>
                    <h2 className='font-extrabold text-3xl mb-4'>Orders</h2>
                    <div className=' bg-white p-4 rounded-lg mb-4'>
                        <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
                            <div>
                                <h3>search here</h3>
                                <div className='flex flex-col'>
                                    <div className='border-2 bg-gray-200 py-2 px-3 flex justify-between overflow-hidden  rounded-md'>
                                        <span>
                                            <SearchIcon className='w-5 h-5 text-gray-600' />
                                        </span>
                                        <input
                                            className='flex-grow outline-none bg-gray-100 text-gray-600 focus:text-blue-600'
                                            type='text'
                                            placeholder='Search for category, name, Company,etc'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3>Category</h3>
                                <div className='flex flex-col'>
                                    <div className='relative'>
                                        <select
                                            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                            id='grid-state'
                                        >
                                            <option>sima</option>
                                            <option>ingorofani</option>
                                            <option>Tv</option>
                                        </select>
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <svg
                                                className='fill-current h-4 w-4'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 20 20'
                                            >
                                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3>Status</h3>
                                <div className='flex flex-col'>
                                    <div className='relative'>
                                        <select
                                            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                            id='grid-state'
                                        >
                                            <option>sima</option>
                                            <option>ingorofani</option>
                                            <option>Texas</option>
                                        </select>
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                            <svg
                                                className='fill-current h-4 w-4'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 20 20'
                                            >
                                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="invisible">search</h3>
                                <div className='flex flex-col'>
                                    <button
                                        type='submit'
                                        className='text-center py-3 px-12 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-light-blue hover:bg-middle-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    >
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                                        <table className='min-w-full divide-y divide-gray-200'>
                                            <thead className='bg-gray-50'>
                                                <tr>
                                                    <th
                                                        scope='col'
                                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                                    >
                                                        Role
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='relative px-6 py-3'
                                                    >
                                                        <span className='sr-only'>
                                                            Edit
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-gray-200'>
                                                <tr>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <div className='flex items-center'>
                                                            <div className='flex-shrink-0 h-10 w-10'>
                                                                <img
                                                                    className='h-10 w-10 rounded-full'
                                                                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='ml-4'>
                                                                <div className='text-sm font-medium text-gray-900'>
                                                                    Jane Cooper
                                                                </div>
                                                                <div className='text-sm text-gray-500'>
                                                                    jane.cooper@example.com
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <div className='text-sm text-gray-900'>
                                                            Regional Paradigm Technician
                                                        </div>
                                                        <div className='text-sm text-gray-500'>
                                                            Optimization
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                        Admin
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                                        <a
                                                            href='#'
                                                            className='text-indigo-600 hover:text-indigo-900'
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <div className='flex items-center'>
                                                            <div className='flex-shrink-0 h-10 w-10'>
                                                                <img
                                                                    className='h-10 w-10 rounded-full'
                                                                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='ml-4'>
                                                                <div className='text-sm font-medium text-gray-900'>
                                                                    Jane Cooper
                                                                </div>
                                                                <div className='text-sm text-gray-500'>
                                                                    jane.cooper@example.com
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <div className='text-sm text-gray-900'>
                                                            Regional Paradigm Technician
                                                        </div>
                                                        <div className='text-sm text-gray-500'>
                                                            Optimization
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                        Admin
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                                        <a
                                                            href='#'
                                                            className='text-indigo-600 hover:text-indigo-900'
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
