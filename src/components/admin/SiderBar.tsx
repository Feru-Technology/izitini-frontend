import React from 'react'
import { logout } from '../../api/auth'
import { BsShop } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Transition } from '@headlessui/react'
import { MdReportProblem } from 'react-icons/md'
import { BiCategoryAlt, BiCategory } from 'react-icons/bi'
import { FaProductHunt, FaBuysellads } from 'react-icons/fa'
import { ClipboardCheckIcon } from '@heroicons/react/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CogIcon, LogoutIcon, TemplateIcon, UserGroupIcon } from '@heroicons/react/solid'

interface Isidebar {
    isClosed: boolean
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
    isStatic: boolean
}
const SideBar = ({ isClosed, setIsClosed, isStatic }: Isidebar) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { pathname } = location

    const handleClick = () => {
        setIsClosed(true)
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
                    className={`bg-gradient-to-t z-20 bg-[#004896] p-4 space-y-8 w-52 md:w-44 lg:w-64 text-slate-200 min-h-screen ${isStatic ? '' : 'fixed'
                        }`}
                >
                    <div className='flex justify-between px-3 text-white  border-b'>
                        {/* Logo */}
                        <Link to='/'>
                            <img
                                src='https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/Logo.png'
                                className='mt-0'
                                width='90px'
                                height='40px'
                                alt='logo'
                            />
                        </Link>
                        {!isStatic && (
                            <button
                                key='Close Menu'
                                className='lg:hidden text-slate-500 hover:text-slate-400'
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
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 divided-y  ${pathname === '/' && 'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname === '/' &&
                                        'hover:text-slate-400'
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
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('ads') && 'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/ads'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('ads') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <FaBuysellads className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Ads
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('users') && 'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/users'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('users') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <UserGroupIcon className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Users
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('shops') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/shops'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('shops') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <BsShop className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Shops
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('orders') && 'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/orders'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('orders') &&
                                        'hover:text-slate-400'
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
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('products') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/products'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('products') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <FaProductHunt className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Products
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('categories') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/categories'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('categories') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <BiCategoryAlt className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Categories
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('subCategories') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/subCategories'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('subCategories') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <BiCategory className='flex-shrink-0 h-5 w-5' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Sub-categories
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('Reports') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/Reports'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Reports') &&
                                        'hover:text-slate-400'
                                        }`}
                                >
                                    <div className='flex items-center'>
                                        <MdReportProblem className='flex-shrink-0 h-5 w-5 text-red-500' />
                                        <p className='text-sm font-medium ml-3  duration-200'>
                                            Reports
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li
                                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('settings') &&
                                    'bg-slate-800'
                                    }`}
                                onClick={handleClick}
                            >
                                <Link
                                    to='/admin/settings'
                                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('settings') &&
                                        'hover:text-slate-400'
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
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('signin') && 'bg-slate-800'
                            }`}
                        onClick={handleClick}
                    >
                        <Link
                            to='/signin'
                            className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('signin') &&
                                'hover:text-slate-400'
                                }`}
                        >
                            <div className='flex items-center space-x-2'
                                onClick={() => logout(dispatch, navigate)}>
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
