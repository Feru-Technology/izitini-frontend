import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, HeartIcon, BellIcon } from '@heroicons/react/outline'
import { FaTools, FaBuilding } from "react-icons/fa"
import { BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RiSearchLine } from 'react-icons/ri'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mt-5 mb-5">
                        <div className="relative flex items-center justify-between h-16 border-b-2">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                            <div className="ml-12 md:flex-1 md:flex md:items-stretch md:justify-start mb-3">
                                <div className="flex-shrink-0">
                                    <img
                                        className="block h-7 md:h-8 lg:h-12 w-auto"
                                        src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png"
                                        alt="Workflow"
                                    />
                                </div>

                                <div className="sr-only md:not-sr-only md:block md:ml-6">
                                    <div className="flex space-x-4">
                                        <div className="pt-2 relative mx-auto text-gray-600">
                                            <input className="border-2 w-96 ml-36 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                                type="search" name="search" placeholder="Search" />
                                            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                                <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                                    viewBox="0 0 56.966 56.966"
                                                    // style={"enable-background:new 0 0 56.966 56.966;"}
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
                            <div className="flex space-x-4 right-0 text-black mb-3">
                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View saved items</span>
                                    <HeartIcon className="h-7 w-auto absolute" aria-hidden="true" />
                                    <p className='text-white text-xs p-0 bg-dark-blue rounded-full ml-4'>30</p>
                                </button>
                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-7 w-auto absolute" aria-hidden="true" />
                                    <p className='text-white text-xs p-0 bg-dark-blue rounded-full ml-4'>30</p>
                                </button>
                                <button
                                    type="button"
                                >
                                    <span className="sr-only">View cart</span>
                                    <BsCart3 className="h-7 w-auto absolute" aria-hidden="true" />
                                    <p className='text-white text-xs p-0 bg-dark-blue rounded-full ml-4'>30</p>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="flex text-sm rounded-full">

                                            <img
                                                className="h-8 w-auto rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            /><span className=" sr-only md:not-sr-only mx-2 mt-1">N. Ramadhan</span>
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
                        </div>

                        <div className="sr-only md:not-sr-only space-x-6 flex justify-center mt-5">
                            <span className="flex items-center"><FaTools className="block h-3 w-3 mr-2" />buy your products</span>
                            <span className="flex items-center"><FaBuilding className="block h-3 w-3 mr-2" />get idea</span>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden z-10">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <p>Home</p>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
