import React from 'react'
import { useDispatch } from 'react-redux'
import { Transition } from '@headlessui/react'
import { loggedIn } from '../../redux/profile.slice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    CogIcon,
    GiftIcon,
    LogoutIcon,
    TemplateIcon,
    ClipboardCheckIcon,
} from '@heroicons/react/solid'

interface Isidebar {
    isClosed: boolean
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
    isStatic: boolean
}
const SideBar = ({ isClosed, setIsClosed, isStatic }: Isidebar) => {

    const navigate = useNavigate()

    // redux
    const dispatch = useDispatch();

    const location = useLocation()
    const { pathname } = location

    const handleClick = () => {
        setIsClosed(true)
    }

    const logout = () => {
        dispatch(loggedIn(null))
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Transition
                show={isStatic || !isClosed}
                enter='transition-all duration-200'
                enterFrom='-ml-64'
                enterTo='ml-0'
                leave='transition-all duration-200'
                leaveTo='-ml-64'
            >
                <div
                    className={`bg-gradient-to-t z-20 bg-dark-blue p-4 space-y-8 w-52 md:w-44 lg:w-64 text-gray-200 min-h-screen ${isStatic ? '' : 'fixed'
                        }`}
                >
                    <div className='flex justify-between px-3 text-white  border-b'>
                        {/* Logo */}
                        <Link to='/'>
                            <img
                                src='https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo.png'
                                className='mt-0'
                                width='90px'
                                height='40px'
                                alt='logo'
                            />
                        </Link>
                        {!isStatic && (
                            <button
                                key='Close Menu'
                                className='lg:hidden text-gray-500 hover:text-gray-400'
                                title='Close Sidebar'
                                aria-label='Close menu'
                                onClick={handleClick}
                            >
                                <span className='sr-only'>Close sidebar</span>
                                <svg
                                    className='w-6 h-6 fill-current'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div>
                        <ul>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 divided-y  ${pathname === '/' && 'bg-gray-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/dashboard'
                                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === '/' &&
                                        'hover:text-gray-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <TemplateIcon className='flex-shrink-0 h-5 w-5' />
                                        <p className=' text-sm font-medium ml-3 text-white   duration-200'>
                                            Dashboard
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('orders') && 'bg-gray-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/orders'
                                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes('orders') &&
                                        'hover:text-gray-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <ClipboardCheckIcon className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Orders
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('coupons') &&
                                    'bg-gray-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/profile'
                                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes('coupons') &&
                                        'hover:text-gray-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <GiftIcon className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Profile
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('settings') &&
                                    'bg-gray-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/settings'
                                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes('settings') &&
                                        'hover:text-gray-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <CogIcon className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Settings
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('signin') && 'bg-gray-800'
                            }`}
                        onClick={handleClick}
                    >
                        <Link
                            to='/signin'
                            className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes('signin') &&
                                'hover:text-gray-400'
                                }`}
                        >
                            <div className='flex items-center space-x-2'
                                onClick={() => logout()}>
                                <LogoutIcon className='w-5 h-5' />
                                <p>Logout</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default SideBar
