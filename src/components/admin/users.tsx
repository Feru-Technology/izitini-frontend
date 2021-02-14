import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { useState, useEffect } from 'react'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../../redux/admin/users/user.slice'
import { IUser } from '../../redux/admin/users/users.interface'
import {
    fetchingUsers,
    retrievedUsers,
    retrievedUserFailed
} from '../../redux/admin/users/users.slice'
import { XIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { vendor } from 'postcss'
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
    }, [dispatch, token])

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

    // create user states
    const [vendor, setVendor] = useState(false)
    const [customer, setCustomer] = useState(false)
    const [professional, setProfessional] = useState(false)
    const [signupLink, setSignupLink] = useState<String | null>(null)
    const [showCreateUserOptions, setShowCreateUserOptions] = useState(false)

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

                                    <div className='flex items-center justify-between py-8'>
                                        <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>Users</h3>
                                        <button className='bg-dark-blue hover:bg-middle-blue text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base'
                                            onClick={e => setShowCreateUserOptions(true)} >
                                            ADD A User
                                        </button>
                                    </div>
                                    <div className='  border-gray-200'>
                                        <ul className='w-full text-xs flex cursor-pointer'>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            hover:text-gray-500 px-1 w-1/4 text-center
                                            py-3 ${showAllUsers && 'border-b-2 border-dark-blue'}`}

                                                onClick={() => {
                                                    all()
                                                    setShowAllUsers(true)
                                                    setShowCustomer(false)
                                                    setShowVendor(false)
                                                    setShowProfessional(false)
                                                }}
                                            >All</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            hover:text-gray-500 px-1 w-1/4 text-center
                                            py-3 ${showCustomer && 'border-b-2 border-dark-blue'}`}
                                                onClick={e => {
                                                    setShowCustomer(true)
                                                    setShowAllUsers(false)
                                                    setShowVendor(false)
                                                    setShowProfessional(false)
                                                    fetchByAccountType('customer')
                                                }}

                                            >Customer</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            hover:text-gray-500 px-1 w-1/4 text-center
                                            py-3 ${showProfessional && 'border-b-2 border-dark-blue'}`}
                                                onClick={e => {
                                                    setShowProfessional(true)
                                                    setShowAllUsers(false)
                                                    setShowCustomer(false)
                                                    setShowVendor(false)
                                                    fetchByAccountType('business')
                                                }}
                                            >Vendor</li>
                                            <li className={`text-xs md:text-sm lg:text-base font-medium text-gray-800
                                            hover:text-gray-500 px-1 w-1/4 text-center
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
                                                        <tr className='text-center text-xs md:text-sm lg:text-base border-b text-gray-800 hover:bg-gray-100'
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
                            {/* signup options pop-up*/}
                            <Transition show={showCreateUserOptions} className='fixed'>

                                <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 h-screen w-screen'
                                    onClick={() => setShowCreateUserOptions(false)}>
                                </div>
                                <div className='absolute z-2 top-1/4 left-16
                                md:left-9 lg:left-28 md:top-1/3 xl:left-1/4'>
                                    <div className='bg-white shadow-lg mx-auto px-5 pt-3 pb-10 md:pb-12 '
                                    // style={{ height: 'fit-content', width: 'fit-content', marginTop: '0%' }}
                                    >
                                        < XIcon className='h-4 cursor-pointer mb-4 md:mb-0'
                                            style={{ marginLeft: '98%' }}
                                            onClick={() => setShowCreateUserOptions(false)} />
                                        <div className='md:flex'>
                                            <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border
                                                border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
                                                dark:hover:text-white dark:hover:bg-gray-600 ${customer && 'border-dark-blue'}`}
                                                onClick={() => {
                                                    setVendor(false)
                                                    setCustomer(true)
                                                    setProfessional(false)
                                                    setSignupLink('/signup')
                                                }}>
                                                <p className='flex  justify-center font-normal text-lg lg:text-xl'>customer</p>
                                                <p className='flex  justify-center font-extralight text-xs lg:text-sm'>buy construction tools for my self</p>
                                            </div>
                                            <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border
                                                border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
                                                dark:hover:text-white dark:hover:bg-gray-600 ${vendor && ' border-dark-blue'}`}
                                                onClick={() => {
                                                    setVendor(true)
                                                    setCustomer(false)
                                                    setProfessional(false)
                                                    setSignupLink('/vendor-signup')
                                                }}>
                                                <p className='flex  justify-center font-normal text-lg lg:text-xl'>vendor</p>
                                                <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I own a construction store</p>
                                            </div>
                                            <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border
                                                border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
                                                dark:hover:text-white dark:hover:bg-gray-600 ${professional && ' border-dark-blue'}`}
                                                onClick={() => {
                                                    setVendor(false)
                                                    setCustomer(false)
                                                    setProfessional(true)
                                                    setSignupLink('/professional-signup')
                                                }}>
                                                <p className='flex  justify-center font-normal text-lg lg:text-xl'>professional</p>
                                                <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I am in construction business</p>
                                            </div>
                                        </div>
                                        <Link to={`${signupLink}`} className={`${signupLink === null ? 'cursor-not-allowed pointer-events-none' : ''}`}>
                                            <button disabled={false}
                                                className={`flex text-white bg-dark-blue hover:bg-light-blue focus:ring-4 focus:ring-light-blue
                                                    px-5 py-2 rounded-lg float-right mr-2 md:mr-3.5`}
                                            >
                                                <span className='text-xs mr-1 md:text-sm md:mr-2
                                                    lg:text-base'>Continue</span><ArrowNarrowRightIcon className='h-4 md:h-5 lg:h-6' />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                {/* </div> */}
                            </Transition>
                        </div>
                    )
                    : navigate('/signin')

            }
        </>
    )
}

export default Users
