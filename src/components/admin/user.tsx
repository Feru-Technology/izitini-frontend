import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useState, useEffect } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../../redux/admin/users/user.slice'
import { IUser } from '../../redux/admin/users/users.interface'
import {
    fetchingUsers,
    retrievedUsers,
    retrievedUserFailed
} from '../../redux/admin/users/users.slice'
const Users = () => {

    // redux
    const dispatch = useDispatch()

    const { isLoading, profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useEffect(() => {
        dispatch(fetchingUsers())
        fetch(dispatch, user, retrievedUserFailed, '/user')
    }, [dispatch])


    // const { user } = useSelector((state: RootState) => state.user)

    const [isClosed, setIsClosed] = useState(false)

    const navigate = useNavigate()

    const activeUser = (newUser: IUser) => {
        dispatch(user(newUser))
        const { id } = newUser
        return navigate(`/admin/user/${id}`)
    }

    console.log(profile);

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : profile ?
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

                                </div>
                            </div>
                        </div>
                    )
                    : navigate('/signin')

            }
        </>
    )
}

export default Users
