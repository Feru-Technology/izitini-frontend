import { useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useAuth } from '../../utils/hooks/auth'
import { useMediaQuery } from 'react-responsive'

const Coupons = () => {

  useAuth('business')

  const [isClosed, setIsClosed] = useState(true)
  const isStatic = useMediaQuery({
    query: '(min-width: 640px)',
  })

  const { isLoading } = useSelector((state: RootState) => state.profile)

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

            <div>
              coupons Page...
            </div>
          </div>
        </div>}
    </>
  )
}

export default Coupons
