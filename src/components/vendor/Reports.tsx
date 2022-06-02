import { useState } from 'react'
import Header from './Header'
import SiderBar from './SiderBar'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useVendor } from '../../utils/hooks/auth'

const MyReports = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useVendor(navigate, token)

  const [isClosed, setIsClosed] = useState(true)
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
          MyReports page ....
        </div>
      </div>
    </div>
  )
}

export default MyReports
