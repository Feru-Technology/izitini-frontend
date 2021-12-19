import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, HeartIcon, BellIcon } from '@heroicons/react/outline'
import { FaTools, FaBuilding } from "react-icons/fa"
import { BsCart3 } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-0 sm:px-6 lg:px-8 mt-5">
                        <div className="relative flex items-center justify-between h-16 border-b-2 ">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start mb-3">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-12 w-auto"
                                        src="https://izitini-spaces.fra1.digitaloceanspaces.com/syastem-images/Logo1.png"
                                        alt="Workflow"
                                    />
                                </div>

                                <div className="hidden sm:block sm:ml-6">

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
                            <div className="absolute space-x-12 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none mb-3"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <HeartIcon className="h-8 w-8 absolute mb-6" aria-hidden="true" />
                                    <div className="bg-red-400 w-6 h-6 rounded-full z-10 absolute ml-4 mt-2" ><p className='text-white test-xs'>30</p></div>
                                </button>
                                <button
                                    type="button"
                                    className="relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none mb-3"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-8 w-8 absolute mb-6" aria-hidden="true" />
                                    <div className="bg-red-400 w-6 h-6 rounded-full z-10 absolute ml-4 mt-2" ><p className='text-white test-xs'>30</p></div>
                                </button>
                                <button
                                    type="button"
                                    className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none mb-3"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BsCart3 className="h-6 w-6 absolute" aria-hidden="true" />
                                    <div className="bg-red-400 w-6 h-6 rounded-full z-10 absolute ml-4 mt-2" ><p className='text-white test-xs'>30</p></div>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            /><span className="mx-2 mt-1">N. Ramadhan</span>
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

                        <div className="space-x-6 flex justify-center mt-5">
                            <span className="flex items-center"><FaTools className="block h-3 w-3 mr-2" />buy your products</span>
                            <span className="flex items-center"><FaBuilding className="block h-3 w-3 mr-2" />get idea</span>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
