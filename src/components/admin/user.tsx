import SiderBar from './SiderBar'
import Header from '../vendor/Header'
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
                                <div className='mx-4 md:w-3/4'>
                                    <div className='flex my-5 justify-center'>
                                        <img className='h-20 rounded-full'
                                            src="https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png" alt="profile" />
                                    </div>
                                    <form action="">
                                        <div className=''>
                                            <div className='m-2 flex w-full'>
                                                <label className='font-semibold text-sm text-gray-500 w-1/5' htmlFor="names">Names:</label>
                                                <input className='bg-white text-sm font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-auto'
                                                    id='grid-first-name' type='text' value={'Names'} />
                                            </div>

                                            <div className='m-2 flex w-full'>
                                                <label className='font-semibold text-sm text-gray-500 w-1/5' htmlFor="Account type">Account:</label>
                                                <input className='bg-white text-sm font-medium outline-none border-0 border-b
                                                border-gray-400 focus:border-gray-800 w-auto'
                                                    id='grid-last-name' type='text' value={'account_type'} />
                                            </div>
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
