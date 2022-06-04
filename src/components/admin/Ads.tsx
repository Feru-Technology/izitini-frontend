import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useEffect, useState } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import Image01 from '../../../images/user-36-050.jpg'

const Ads = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useAuth(navigate, token, 'admin')

    // redux
    const dispatch = useDispatch()

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)

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

                        <div className='w-full'>
                            <div className='md:mt-4 lg:mt-8 grid grid-cols-2
                            md:grid-cols-4 xl:gap-5 gap-3 bg-white px-2 md:px-5 lg:px-8'>
                                <div className='w-full bg-gray-100 h-32 lg:h-48 relative'>
                                    <p className='text-gray-300 text-center text-xl md:text-2xl lg:text-3xl font-black mt-12 lg:mt-20 '>IZITINI</p>
                                    <img className='h-32 lg:h-48 w-full absolute top-0' src='https://izitini-spaces.fra1.digitaloceanspaces.com/pexels-daria-shevtsova-1029803%20%282%29.jpg' alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Ads
