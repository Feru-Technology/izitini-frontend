import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useRef, useState } from 'react'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useAds, addImage, deleteAd } from '../../api/ad'

const Ads = () => {

    useAuth('admin')

    // redux
    const dispatch = useDispatch()
    const input = useRef(null)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)
    const [open_image, setOpen_image] = useState<string | null>(null)
    const [active_image, setActive_image] = useState<string | null>(null)

    useAds()
    const { isFetching, ads } = useSelector((state: RootState) => state.ad)
    const { isCreating } = useSelector((state: RootState) => state.createAd)

    //@ts-ignore
    const handleInputClick = () => input.current.click()

    return (
        <>
            {isFetching ? 'Loading ...' :
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
                                            if (e.target.files) addImage(dispatch, e.target.files[0])
                                        }} />
                                </div>

                                {isFetching ? 'fetching ...' :
                                    <div className='grid grid-cols-2 md:grid-cols-4 xl:gap-5 gap-3'>
                                        {ads ?
                                            ads.map((ad) => (
                                                <div className='w-full bg-gray-100 h-32 lg:h-48 relative' key={ad.id}
                                                    onMouseOver={() => setActive_image(ad.id)} onMouseLeave={() => setActive_image(null)}>
                                                    <p className='text-gray-300 text-center text-xl md:text-2xl lg:text-3xl font-black mt-12 lg:mt-20 '>IZITINI</p>
                                                    <img className='h-32 lg:h-48 w-full absolute top-0 rounded bg-white'
                                                        src={ad.big_screen_image} alt='' />

                                                    <div className={active_image === ad.id ? 'not-sr-only' : 'sr-only'}>
                                                        <div className='bg-gray-700 absolute h-32 lg:h-48 w-full top-0 rounded opacity-20'></div>
                                                        <div className='top-8 md:top-7 lg:top-12 space-y-2 w-full absolute'>

                                                            <div className='bg-dark-blue hover:bg-middle-blue shadow-md hover:shadow-lg text-white
                                                    py-1.5 md:py-2 w-7/12 text-xs md:text-sm lg:text-base rounded cursor-pointer text-center mx-auto lg:mt-1'
                                                                onClick={() => setOpen_image(ad.big_screen_image)} >open</div>

                                                            <div className='bg-red-700 hover:bg-red-500 shadow-md hover:shadow-lg text-white
                                                    py-1.5 md:py-2 w-7/12 text-xs md:text-sm lg:text-base rounded cursor-pointer text-center mx-auto'
                                                                onClick={() => deleteAd(dispatch, ad.id)} >delete</div>
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
                    <div className={open_image ? 'absolute top-0 z-20' : 'hidden'}>
                        <div className='w-screen h-screen overflow-hidden bg-gray-900 opacity-20'></div>
                        <div className='absolute top-0 h-screen w-full'>
                            <div className='h-screen'>
                                <img className='max-h-screen max-w-screen mx-auto p-16' src={`${open_image}`} alt="" />
                                <AiOutlineClose className='absolute w-10 h-10 top-6 right-1/4 text-white hover:text-black border
                                border-gray-200 bg-gray-300'  onClick={() => setOpen_image(null)} />
                            </div>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Ads
