import React, { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import { useMediaQuery } from 'react-responsive'
import Header from './Header'
import { Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { fetchingSubCategories, retrievedSubCategory, retrievedSubCategoryFailed } from '../../redux/subCategory.slice'

const Store = () => {
  const [isClosed, setIsClosed] = useState(false)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  // redux
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(fetchingSubCategories());
  //     fetch(dispatch, retrievedSubCategory, retrievedSubCategoryFailed, '/subCategory')
  // }, [dispatch])

  return (
    <>
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
          <div className='px-4 sm:px-6  lg:px-8 py-8 w-full h-full  mx-auto bg-gray-200'>
            <div className='flex items-center justify-between py-8'>
              <h3 className='text-3xl font-bold'>Stores</h3>
              <Link to='/vendor/create-store'>
                <button className='bg-middle-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded cursor-pointer'>
                  CREATE A STORE
                </button>
              </Link>
            </div>
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
                            About Store
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Shop Email
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Shop Contact Number
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Category
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Status
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
                                  className='h-10 w-10'
                                  src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                  alt=''
                                />
                              </div>
                              <div className='ml-4 text-sm font-medium text-gray-900'>
                                Store 1
                              </div>
                            </div>
                          </td>
                          <td className='text-sm text-gray-900'>
                            Optimization
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            shop1@gmail.com
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            0782957867
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            timber
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                              Active
                            </span>
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
    </>
  )
}

export default Store
