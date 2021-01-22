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
const Users = () => {

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

                            <div className='px-2 md:px-6 lg:px-14 w-full flex justify-center'>
                                <div className='w-3/5'>
                                    <form action="">
                                        <div className='flex'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
                                                First Name
                                            </label>
                                            <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-first-name' type='text' placeholder='Jane' />
                                        </div>
                                        <div className='flex'>
                                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-last-name'>
                                                Last Name
                                            </label>
                                            <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-last-name' type='text' placeholder='Doe' />
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

export default Users
