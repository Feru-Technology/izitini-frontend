import { useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../../redux/admin/users/user.slice'
import { IUser } from '../../redux/admin/users/users.interface'
import { XIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { allUsers, fetchByAccountType, useUsers } from '../../api/user'

const Users = () => {

    useAuth('admin')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    useUsers()
    const { isLoading, users } = useSelector((state: RootState) => state.users)

    const [isClosed, setIsClosed] = useState(true)
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

    const activeUser = (newUser: IUser) => {
        dispatch(user(newUser))
        const { id } = newUser
        return navigate(`/admin/users/${id}`)
    }

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                :
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
                                    <button className='bg-[#004896] hover:bg-[#0e87d2] text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base'
                                        onClick={e => setShowCreateUserOptions(true)} >
                                        ADD A User
                                    </button>
                                </div>
                                <div className='  border-slate-200'>
                                    <ul className='w-full text-xs flex cursor-pointer'>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800
                                            hover:text-slate-500 px-1 w-1/4 text-center
                                            py-3 ${showAllUsers && 'border-b-2 border-[#004896]'}`}

                                            onClick={() => {
                                                allUsers(dispatch)
                                                setShowVendor(false)
                                                setShowAllUsers(true)
                                                setShowCustomer(false)
                                                setShowProfessional(false)
                                            }}
                                        >All</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800
                                            hover:text-slate-500 px-1 w-1/4 text-center
                                            py-3 ${showCustomer && 'border-b-2 border-[#004896]'}`}
                                            onClick={e => {
                                                setShowCustomer(true)
                                                setShowAllUsers(false)
                                                setShowVendor(false)
                                                setShowProfessional(false)
                                                fetchByAccountType(dispatch, 'customer')
                                            }}

                                        >Customer</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800
                                            hover:text-slate-500 px-1 w-1/4 text-center
                                            py-3 ${showProfessional && 'border-b-2 border-[#004896]'}`}
                                            onClick={e => {
                                                setShowProfessional(true)
                                                setShowAllUsers(false)
                                                setShowCustomer(false)
                                                setShowVendor(false)
                                                fetchByAccountType(dispatch, 'business')
                                            }}
                                        >Vendor</li>
                                        <li className={`text-xs md:text-sm lg:text-base font-medium text-slate-800
                                            hover:text-slate-500 px-1 w-1/4 text-center
                                            py-3 ${showVendor && 'border-b-2 border-[#004896]'}`}
                                            onClick={e => {
                                                setShowVendor(true)
                                                setShowAllUsers(false)
                                                setShowCustomer(false)
                                                setShowProfessional(false)
                                                fetchByAccountType(dispatch, 'profession')
                                            }}

                                        >Professional</li>
                                    </ul>
                                </div>

                                <div className='w-full my-4 md:my-5 lg:my-6 '>
                                    <table className='w-full border-slate-200 text-slate-600 border'>
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
                                                // const profileImage = user.profile_image || 'https://izitini-spaces.fra1.digitaloceanspaces.com/profile-pics/profile.png'
                                                const profileImage = 'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-edgar-okioga-730353.jpg'
                                                return (
                                                    <tr key={user.id}
                                                        className='text-center text-xs md:text-sm lg:text-base border-b text-slate-800 hover:bg-slate-100 cursor-default'
                                                        onClick={e => activeUser(user)} >

                                                        <td className='py-3 '>
                                                            <div className='md:flex items-center'>
                                                                <div className='md:w-1/6 mx-3'>
                                                                    <img src={profileImage} alt='profile' className='w-auto max-h-8' />
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

                            <div className='top-0 z-10 text-slate-500 bg-slate-700 opacity-50 h-screen w-screen'
                                onClick={() => setShowCreateUserOptions(false)}>
                            </div>
                            <div className='absolute z-2 top-1/4 left-16 md:left-9 lg:left-28 md:top-1/3 xl:left-1/4'>
                                <div className='mx-auto px-5 pt-3 pb-10 md:pb-12  rounded-md
                                bg-white shadow hover:shadow-md ease-linear transition-all duration-150'
                                >
                                    < XIcon className='h-4 cursor-pointer mb-4 md:mb-0'
                                        style={{ marginLeft: '98%' }}
                                        onClick={() => setShowCreateUserOptions(false)} />
                                    <div className='md:flex'>
                                        <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4 focus:ring-slate-300 rounded-lg border
                                                border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500
                                                dark:hover:text-white dark:hover:bg-slate-600 ${customer && 'border-[#004896]'}`}
                                            onClick={() => {
                                                setVendor(false)
                                                setCustomer(true)
                                                setProfessional(false)
                                                setSignupLink('/admin/users/create-customer')
                                            }}>
                                            <p className='flex  justify-center font-normal text-lg lg:text-xl'>customer</p>
                                            <p className='flex  justify-center font-extralight text-xs lg:text-sm'>buy construction tools for my self</p>
                                        </div>
                                        <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4 focus:ring-slate-300 rounded-lg border
                                                border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500
                                                dark:hover:text-white dark:hover:bg-slate-600 ${vendor && ' border-[#004896]'}`}
                                            onClick={() => {
                                                setVendor(true)
                                                setCustomer(false)
                                                setProfessional(false)
                                                setSignupLink('/admin/users/create-vendor')
                                            }}>
                                            <p className='flex  justify-center font-normal text-lg lg:text-xl'>vendor</p>
                                            <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I own a construction store</p>
                                        </div>
                                        <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4 focus:ring-slate-300 rounded-lg border pointer-events-none
                                                border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500
                                                dark:hover:text-white dark:hover:bg-slate-600 ${professional && ' border-[#004896]'}`}
                                            onClick={() => {
                                                setVendor(false)
                                                setCustomer(false)
                                                setProfessional(true)
                                                setSignupLink('/admin/users/create-professional')
                                            }}>
                                            <p className='flex  justify-center font-normal text-lg lg:text-xl'>professional</p>
                                            <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I am in construction business</p>
                                        </div>
                                    </div>
                                    <Link to={`${signupLink}`} className={`${signupLink === null ? 'cursor-not-allowed pointer-events-none' : ''}`}>
                                        <button disabled={false}
                                            className={`flex text-white bg-[#004896] hover:bg-[#00adef] focus:ring-4 focus:ring-[#00adef]
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

            }
        </>
    )
}

export default Users
