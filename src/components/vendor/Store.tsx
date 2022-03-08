import { useEffect, useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'

import {
  getStore, store, storeFailed
} from '../../redux/stores/store.slice'

const Store = () => {
  const [isClosed, setIsClosed] = useState(false)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  // redux
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(getStore())
    fetch(dispatch, store, storeFailed, '/shop/mine/all', token)
  }, [dispatch, token])

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
          <div className='px-4 sm:px-6  lg:px-8 py-8 w-full h-full  mx-auto'>
            <div className='flex justify-center py-8'>
              <div>
                <p className='text-3xl font-bold'>Store image</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Store
