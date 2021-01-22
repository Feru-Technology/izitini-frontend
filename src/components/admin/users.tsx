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
    //  get token
    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(fetchingUsers())
        fetch(dispatch, retrievedUsers, retrievedUserFailed, '/users', token)
    }, [dispatch])

    const fetchByAccountType = (accountType: string) => {
        dispatch(fetchingUsers())
        fetch(dispatch, retrievedUsers, retrievedUserFailed, `/users/account-type/${accountType}`, token)
    }

    const all = () => {
        dispatch(fetchingUsers())
        fetch(dispatch, retrievedUsers, retrievedUserFailed, '/users', token)
    }

    const { users } = useSelector((state: RootState) => state.users)

    const [isClosed, setIsClosed] = useState(false)
    const [showVendor, setShowVendor] = useState(false)
    const [showAllUsers, setShowAllUsers] = useState(true)
    const [showCustomer, setShowCustomer] = useState(false)
    const [showProfessional, setShowProfessional] = useState(false)

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

                                <div className='px-2 md:px-6 lg:px-14 w-full'>
                                    <p className='font-bold my-3 text-sm md:mt-6 md:text-xl text-center underline'>Users</p>
                                    <div className='  border-gray-200'>
                                        <ul className='w-full text-xs flex cursor-pointer'>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showAllUsers && 'border-b-2 border-dark-blue'}`}

                                                onClick={() => {
                                                    all()
                                                    setShowAllUsers(true)
                                                    setShowCustomer(false)
                                                    setShowVendor(false)
                                                    setShowProfessional(false)
                                                }}
                                            >All</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showCustomer && 'border-b-2 border-dark-blue'}`}
                                                onClick={e => {
                                                    setShowCustomer(true)
                                                    setShowAllUsers(false)
                                                    setShowVendor(false)
                                                    setShowProfessional(false)
                                                    fetchByAccountType('customer')
                                                }}

                                            >Customer</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showProfessional && 'border-b-2 border-dark-blue'}`}
                                                onClick={e => {
                                                    setShowProfessional(true)
                                                    setShowAllUsers(false)
                                                    setShowCustomer(false)
                                                    setShowVendor(false)
                                                    fetchByAccountType('business')
                                                }}
                                            >Vendor</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800 px-1 w-1/4 text-center
                                            py-3 ${showVendor && 'border-b-2 border-dark-blue'}`}
                                                onClick={e => {
                                                    setShowVendor(true)
                                                    setShowAllUsers(false)
                                                    setShowCustomer(false)
                                                    setShowProfessional(false)
                                                    fetchByAccountType('profession')
                                                }}

                                            >Professional</li>
                                        </ul>
                                    </div>

                                    <div className='w-full my-4 md:my-5 lg:my-6 '>
                                        <table className='w-full border-gray-200 text-gray-600 border'>
                                            <thead className=''>
                                                <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                    <th
                                                        scope='col'
                                                        className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                    >Names</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Email</th>
                                                    <th
                                                        scope='col'
                                                        className='
                                                py-3 lg:text-base
                                    '
                                                    >Contacts</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {users ? (users.map((user) => {
                                                    const profileImage = user.profile_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png'
                                                    return (
                                                        <tr className='text-center text-xs md:text-sm lg:text-base border-b text-gray-800'
                                                            onClick={e => activeUser(user)} >

                                                            <td className='py-3 '>
                                                                <div className='md:flex items-center'>
                                                                    <div className='md:w-1/6 mx-3'>
                                                                        <img src={profileImage} alt='product' className='w-auto max-h-8' />
                                                                    </div>
                                                                    <div className='md:w-5/6'>

                                                                        <p className='font-normal text-sm'>
                                                                            <span className=''>{user.full_name}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className='py-3 '>
                                                                <p className='font-normal text-sm'>{user.email}</p>
                                                            </td>
                                                            <td className='py-3 '>
                                                                <p className='font-normal text-sm'>{user.contact}</p>
                                                            </td>
                                                        </tr>

                                                    )
                                                })) : <tr className='flex justify-center text-lg'> <td> No users found</td> </tr>}
                                            </tbody>

                                        </table>

                                    </div>

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
