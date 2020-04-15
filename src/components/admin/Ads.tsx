import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { fetch, post } from '../../api/apiAction'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { creatingAd, createdAd, createFailed } from '../../redux/admin/ads/createAd.slice'
import { fetchingAds, retrievedAds, adsFailed } from '../../redux/admin/ads/ads.slice'

const Ads = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useAuth(navigate, token, 'admin')

    // redux
    const dispatch = useDispatch()
    const input = useRef(null)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)

    const { isLoading } = useSelector((state: RootState) => state.profile)

    useEffect(() => {
        dispatch(fetchingAds())
        fetch(dispatch, retrievedAds, adsFailed, '/admin/ad')
    }, [dispatch])

    const { isFetching, ads } = useSelector((state: RootState) => state.ad)

    const addImage = (file: File) => {
        const formData = new FormData()
        formData.append('ad', file)
        dispatch(creatingAd())
        post(dispatch, retrievedAds, createFailed, '/admin/ad', formData, token)
        dispatch(createdAd(null))
    }

    const { isCreating } = useSelector((state: RootState) => state.createAd)

    //@ts-ignore
    const handleInputClick = () => input.current.click()

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
                            <div className='mt-2 md:mt-4 lg:mt-8 bg-white px-2 md:px-5 lg:px-8'>

                                <div className='mb-2 md:mb-4'>
                                    <button className='bg-dark-blue hover:bg-middle-blue shadow-md hover:shadow-lg text-white
                                    py-2 px-4 rounded cursor-pointer'
                                        type='submit' onClick={() => handleInputClick()}>{isCreating ? 'adding ...' : 'add image'}
                                    </button>

                                    <input className='absolute hidden' type='file' name='ad' ref={input}
                                        accept='image/x-png,image/gif,image/jpeg, image/png'
                                        onChange={e => {
                                            if (e.target.files) addImage(e.target.files[0])
                                        }} />
                                </div>

                                {isFetching ? 'fetching' :
                                    <div className='grid grid-cols-2 md:grid-cols-4 xl:gap-5 gap-3'>
                                        {ads ?
                                            ads.map((ad) => (
                                                <div className='w-full bg-gray-100 h-32 lg:h-48 relative' key={ad.id}>
                                                    <p className='text-gray-300 text-center text-xl md:text-2xl lg:text-3xl font-black mt-12 lg:mt-20 '>IZITINI</p>
                                                    <img className='h-32 lg:h-48 w-full absolute top-0 rounded'
                                                        src={ad.big_screen_image} alt='' />

                                                    <div className='sr-only'>
                                                        <div className='bg-gray-700 absolute h-32 lg:h-48 w-full top-0 rounded opacity-30'></div>
                                                        <div className='md:top-7 lg:top-12 space-y-2 w-full absolute'>

                                                            <div className='bg-dark-blue hover:bg-middle-blue shadow-md hover:shadow-lg text-white
                                                    py-2 w-7/12 text-base rounded cursor-pointer text-center mx-auto lg:mt-1'>open</div>

                                                            <div className='bg-red-700 hover:bg-red-500 shadow-md hover:shadow-lg text-white
                                                    py-2 w-7/12 text-base rounded cursor-pointer text-center mx-auto'>delete</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                            : ''}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Ads
