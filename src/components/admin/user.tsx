import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { GrEdit } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
    user,
    getUser,
    userFailed
} from '../../redux/admin/users/user.slice'
const User = () => {

    // redux
    const dispatch = useDispatch()

    const { isLoading, currentUser } = useSelector((state: RootState) => state.user)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(getUser())
        fetch(dispatch, user, userFailed, '/user')
    }, [dispatch])

    // const { user } = useSelector((state: RootState) => state.user)

    const [isClosed, setIsClosed] = useState(false)

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>) :
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

                            <div className='w-full flex justify-center'>
                                <div className='mx-4 md:mx-0 md:w-full'>
                                    <div className='flex my-5 justify-center'>
                                        <img className='h-20 rounded-full'
                                            src="https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png" alt="profile" />
                                    </div>
                                    <form action="">
                                        <div className='flex md:justify-center'>
                                            <div className='space-y-6 mx-2'>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="names">Names:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-first-name' type='text' value={'Names'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Account type">Account:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'account_type'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="contact">Contact:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'contact'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="email">Email:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'email'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Tin no">Tin no:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'Tin no'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Provider">Provider:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'Provider'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Verified">Verified:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'Verified'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="created At">created At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'created At'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>
                                                <div className='space-x-2 md:space-x-4 flex w-full'>
                                                    <label className='font-semibold text-sm md:text-base text-gray-500 w-2/6  flex justify-end'
                                                        htmlFor="Updated At">Updated At:</label>
                                                    <input className='mx-4 md:mx-0 bg-white text-sm md:text-base font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-4/6 md:w-auto pointer-events-none'
                                                        id='grid-last-name' type='text' value={'Updated At'} />
                                                    <GrEdit className='h-3 mt-2' />
                                                </div>

                                            </div>
                                        </div>

                                        <div className='flex justify-center my-5 '>
                                            <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'>
                                                SAVE
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }
        </>
    )
}

export default User