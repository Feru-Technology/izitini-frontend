import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, HeartIcon, BellIcon } from '@heroicons/react/outline'
import { FaTools, FaBuilding } from "react-icons/fa"
import { BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RiSearchLine } from 'react-icons/ri'
import { RootState } from '../../redux/store';

import {
    useSelector
} from 'react-redux'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

    const { isLoading, profile, error } = useSelector((state: RootState) => state.profile);

    console.log(profile);

    const backUpPImage = 'https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/profile.png'

    return (

        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mt-5 mb-5">
                        <div className="relative flex items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:sr-only">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="ml-10 md:ml-6 md:flex md:justify-start mb-3">
                                <div className="flex-shrink-0">
                                    <img
                                        className="block h-7 md:h-11 lg:h-12 w-auto"
                                        src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png"
                                        alt="Workflow"
                                    />
                                </div>

                                <div className="sr-only md:not-sr-only md:block">
                                    <div className="flex">
                                        <div className="pt-2 relative mx-auto text-gray-600">
                                            <input className="border-2 w-80 lg:w-full md:ml-16 lg:ml-32 border-gray-300
                                            bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
                                                type="search" name="search" placeholder="Search" />
                                            <button type="submit" className="absolute right-0 top-0 mt-5">

                                                <svg className="text-gray-600 h-4 w-4 fill-current lg:sr-only" xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                                    viewBox="0 0 56.966 56.966"
                                                    xmlSpace="preserve"
                                                    width="512px" height="512px">
                                                    <path
                                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='sm:sr-only'>
                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View saved search</span>
                                    <RiSearchLine className="h-6 w-auto right-0" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex space-x-4 right-0 text-black mb-3 md:mb-5">
                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View saved items</span>
                                    <HeartIcon className="h-6 md:h-9 w-auto absolute" aria-hidden="true" />
                                    <p className='text-white text-xs bg-dark-blue rounded-full ml-4 md:ml-5 p-1'>3</p>
                                </button>
                                {profile === null
                                    ? <span className='sr-only'>not logged in</span>
                                    : <button
                                        type="button"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 md:h-9 w-auto absolute" aria-hidden="true" />
                                        <p className='text-white text-xs bg-dark-blue rounded-full ml-4 md:ml-5 p-1'>3</p>
                                    </button>
                                }

                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View cart</span>
                                    <BsCart3 className="h-6 md:h-9 w-auto absolute" aria-hidden="true" />
                                    <p className='text-white text-xs bg-dark-blue rounded-full ml-4 md:ml-5 p-1'>3</p>
                                </button>

                                {profile === null
                                    ? <div className='flex space-x-2'>
                                        <div>
                                            <Link to='/signin'>Login</Link>

                                        </div>
                                        <div><Link to='/signup'>Register</Link></div>
                                    </div>
                                    : <div>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button className="flex md:mt-3">

                                                    <img
                                                        className="h-8 md:h-9 w-auto rounded-full lg:mr-2"
                                                        src={profile.user.profile_image === null ? backUpPImage : profile.user.profile_image}
                                                        alt=""
                                                    />
                                                    <p className="sr-only lg:not-sr-only mt-24 text-base">{profile.user.full_name}</p>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link to='/profile'
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link to='/settings'
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link to='/login'
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign out
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="sr-only md:not-sr-only space-x-6 flex justify-center mt-5">

                            <div>
                                <span className="flex items-center"><FaTools className="block h-3 w-3 mr-2" />Buy your products</span>
                            </div>

                            <div>
                                <span className="flex items-center"><FaBuilding className="block h-3 w-3 mr-2" />Get idea</span>
                            </div>

                            <div>
                                <span className="flex items-center"><FaBuilding className="block h-3 w-3 mr-2" />Find a profession</span>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:sr-only z-10">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <p>Home</p>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
