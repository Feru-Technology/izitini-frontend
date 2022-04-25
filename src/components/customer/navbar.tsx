import { Link } from 'react-router-dom'
import { fetch } from '../../api/apiAction'
import { RiSearchLine } from 'react-icons/ri'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import backUpPImage from '../../images/profile.png'
import { loggedIn } from '../../redux/profile.slice'
import { FaTools, FaBuilding } from 'react-icons/fa'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart3, BsSuitHeart, BsBell } from 'react-icons/bs'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { addingToCart, cart as getCart, cartFailed } from '../../redux/order/cart'
import { MenuIcon, XIcon, ChevronDownIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

    const navigate = useNavigate()

    // redux
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(addingToCart())
        fetch(dispatch, getCart, cartFailed, '/orders/cart', token)
    }, [dispatch, token])

    const { cart } = useSelector((state: RootState) => state.cart)

    let cartItems: number = 0

    if (cart.length !== 0) cart.map((orders: any) => orders.map((items: any) => cartItems += items.order_items.length))

    const { profile } = useSelector((state: RootState) => state.profile)

    const { isLoading, categories } = useSelector((state: RootState) => state.categories)

    console.log(categories)

    const [showIdea, setShowIdea] = useState(false)
    const [showProduct, setShowProduct] = useState(true)
    const [showProfession, setShowProfession] = useState(false)
    const [showSignupOptions, setShowSignupOptions] = useState(false)

    // sign-up links
    const [vendor, setVendor] = useState(false)
    const [customer, setCustomer] = useState(false)
    const [professional, setProfessional] = useState(false)
    const [signupLink, setSignupLink] = useState<String | null>(null)

    const logout = () => {
        dispatch(loggedIn(null))
        localStorage.clear()
        navigate('/')
    }

    return (
        <Disclosure as='nav' className='bg-white border-b'>
            {({ open }) => (
                <>
                    <div className='mt-5 mb-5'>
                        <div className='flex w-full'>

                            {/* logo */}
                            <div className='flex w-1/4 ml-1
                            md:ml-8 md:w-1/12'>

                                <div className=' inset-y-0 left-0 flex items-center sm:sr-only'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-black'>
                                        <span className='sr-only'>Open main menu</span>
                                        {open ? (
                                            <XIcon className='block h-6 w-6 font-bold' aria-hidden='true' />
                                        ) : (
                                            <MenuIcon className='block h-7 w-7 font-bold' aria-hidden='true' />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <Link to='/'>
                                    <img
                                        className='block h-8 md:h-10 lg:h-12 w-auto'
                                        src='https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                        alt='Workflow'
                                    />
                                </Link>

                            </div>

                            {/* search */}
                            <div className='sr-only md:not-sr-only flex md:w-8/12'>
                                <div className='pt-2 relative mx-auto text-gray-600 w-full px-5'>
                                    <input className='border-2 border-gray-300 w-full
                                            bg-white h-9 lg:h-11 px-3 rounded-lg text-sm focus:outline-none'
                                        type='search' name='search' placeholder='Search' />
                                    <button type='submit' className='absolute right-10  top-0 mt-5'>

                                        <svg className='sr-only md:not-sr-only text-gray-600 md:h-3 lg:h-5 w-auto fill-current' xmlns='http://www.w3.org/2000/svg'
                                            xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px'
                                            viewBox='0 0 56.966 56.966'
                                            xmlSpace='preserve'
                                        >
                                            <path
                                                d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className='flex space-x-4 lg:space-x-6 text-black w-3/4
                            md:w-5/12 justify-center md:mt-3 lg:mt-4'>
                                <div className='flex space-x-5 md:space-x-6 absolute right-12 md:right-0 md:relative'>
                                    {/* search icon on a phone */}
                                    <button
                                        type='button'
                                        className='sm:sr-only'
                                    >
                                        <span className='sr-only'>View saved search</span>
                                        <RiSearchLine className='h-5 mt-2  w-auto' aria-hidden='true' />
                                    </button>

                                    <button
                                        type='button'
                                        className='flex mt-3 md:mt-0'
                                    >
                                        <span className='sr-only'>View saved items</span>
                                        <BsSuitHeart className='h-5 md:h-6 lg:h-7 md:text-sm w-auto' aria-hidden='true' />
                                        <div className='z-auto absolute text-white text-xs bg-dark-blue rounded-full ml-4 w-3'>
                                            <p>3</p>
                                        </div>
                                    </button>
                                    {profile === null
                                        ? <span className='sr-only'>not logged in</span>
                                        : <button
                                            type='button'
                                            className='flex mt-3 md:mt-0'
                                        >
                                            <span className='sr-only'>View notifications</span>
                                            <BsBell className='h-5 md:h-6 lg:h-7 md:text-sm w-auto' aria-hidden='true' />
                                            <p className='z-auto absolute text-white text-xs bg-dark-blue rounded-full ml-4 w-3'>3</p>
                                        </button>
                                    }

                                    <Link to='/cart'>
                                        <button
                                            type='button'
                                            className='flex mt-3 md:mt-0'
                                        >
                                            <span className='sr-only'>View cart</span>
                                            <BsCart3 className='h-5 md:h-6 lg:h-7 md:text-sm w-auto' aria-hidden='true' />
                                            {cart ?
                                                <p className='z-auto absolute text-white text-xs bg-dark-blue rounded-full ml-4 w-3'>{cartItems}</p> : ''}

                                        </button>
                                    </Link>
                                </div>

                                <div className='absolute right-0 md:relative'>
                                    {profile === null
                                        ? <div>
                                            <div className='sr-only md:not-sr-only flex space-x-2'>
                                                <div>
                                                    <Link to='/signin'>Login</Link>

                                                </div>
                                                <div className='cursor-pointer transition duration-150'
                                                    onClick={() => setShowSignupOptions(true)}>
                                                    Register
                                                </div>
                                            </div>
                                            <div>
                                                <Link to='/signin'>
                                                    <img
                                                        className='h-7 mt-2 mr-1 w-auto rounded-full sm:sr-only'
                                                        src={backUpPImage}
                                                        alt='PImage'
                                                    />
                                                </Link>

                                            </div>
                                        </div>
                                        : <div>

                                            {/* Profile dropdown */}
                                            <Menu as='div' className=''>
                                                <div>
                                                    <Menu.Button className='flex space-x-4'>

                                                        <div className='flex flex-row justify-center items-center space-x-2'>
                                                            <img
                                                                src={profile?.profile_image === null ? backUpPImage : profile?.profile_image}
                                                                className='w-6 h-6 mt-2 rounded-full mx-auto md:w-8 md:h-8 md:mt-0'
                                                                alt='pImg'
                                                            />
                                                            <p className='sr-only lg:not-sr-only'>{profile?.full_name}</p>
                                                            <ChevronDownIcon className='sr-only lg:h-5 lg:w-5 lg:not-sr-only' />
                                                        </div>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter='transition ease-out duration-100'
                                                    enterFrom='transform opacity-0 scale-95'
                                                    enterTo='transform opacity-100 scale-100'
                                                    leave='transition ease-in duration-75'
                                                    leaveFrom='transform opacity-100 scale-100'
                                                    leaveTo='transform opacity-0 scale-95'
                                                >
                                                    <Menu.Items className='origin-top-right absolute right-0 z-10 mt-2 w-36 rounded-md shadow-lg p-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
                                                                <Link to='/dashboard'
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Dashboard
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <p
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    onClick={() => logout()}
                                                                >
                                                                    Sign out
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>

                        <div className='md:mt-3'
                            onPointerLeave={() => {
                                // setShowIdea(false)
                                setShowProduct(false)
                                // setShowProfession(false)
                            }}
                        >

                            <div className='sr-only md:not-sr-only space-x-6 flex justify-center mt-5 text-gray-800'>

                                <div onPointerOver={() => {
                                    // setShowIdea(false)
                                    setShowProduct(true)
                                    // setShowProfession(false)
                                }}
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showProduct && ' border-dark-blue bg-gray-100'}`
                                    }
                                    >
                                        <FaTools className='block h-3 w-3 mr-2' />Buy your products</span>
                                </div>

                                <div onPointerOver={() => {
                                    // setShowIdea(true)
                                    setShowProduct(false)
                                    // setShowProfession(false)
                                }
                                }
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showIdea && ' border-dark-blue bg-gray-100'}`
                                    }>
                                        <FaBuilding className='block h-3 w-3 mr-2' />Get idea</span>
                                </div>

                                <div onPointerOver={() => {
                                    // setShowIdea(false)
                                    setShowProduct(false)
                                    // setShowProfession(true)
                                }}
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showProfession && 'border-dark-blue bg-gray-100'}`}>
                                        <FaBuilding className='block h-3 w-3 mr-2' />Find a profession</span>
                                </div>
                            </div>

                            <div className='sr-only md:not-sr-only w-full'>
                                <Transition
                                    show={showProduct}
                                >
                                    <div className='bg-gray-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className=' w-full space-x-5 absolute p-5 z-20 bg-gray-100 shadow-lg min-h-130 flex justify-center'>

                                        <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-auto md:w-9/12 lg:w-9/12 content-center'>
                                            {categories?.map((category) => {
                                                const sub_categories = category.subCategories.slice(0, 4)
                                                return (
                                                    <ul className='space-y-1 my-2 font-sans'><Link to={`/products/c/${category.name}`}
                                                        className='font-semibold text-dark-blue text-sm lg:text-base hover:underline'>{category.name}</Link>
                                                        {sub_categories.map((subCategory) => {
                                                            return (
                                                                <li className='font-light hover:underline hover:text-dark-blue text-sm lg:text-base'>
                                                                    <Link to={`/products/s/${subCategory.id}`}>{subCategory.name}</Link> </li>

                                                            )
                                                        })}
                                                    </ul>

                                                )
                                            })}
                                        </div>
                                    </div>
                                </Transition>
                                <Transition show={showIdea}>
                                    <div className='bg-gray-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className='flex w-full space-x-5 absolute p-5 justify-center z-20 bg-gray-100 shadow-lg'
                                        style={{ minHeight: '30vh' }}>
                                        <ul> idea head
                                            <li>idea 1</li>
                                        </ul>
                                        <ul> idea head
                                            <li>idea 1</li>
                                        </ul>
                                        <ul> idea head
                                            <li>idea 1</li>
                                        </ul>
                                        <ul> idea head
                                            <li>idea 1</li>
                                        </ul>
                                    </div>
                                </Transition>
                                <Transition show={showProfession}>
                                    <div className='bg-gray-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className='flex w-full space-x-5 absolute p-5 justify-center z-20 bg-gray-100 shadow-lg'
                                        style={{ minHeight: '30vh' }}>
                                        <ul> profession head
                                            <li>profession 1</li>
                                        </ul>
                                        <ul> profession head
                                            <li>profession 1</li>
                                        </ul>
                                        <ul> profession head
                                            <li>profession 1</li>
                                        </ul>
                                        <ul> profession head
                                            <li>profession 1</li>
                                        </ul>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>

                    {/* signup options pop-up*/}
                    <Transition show={showSignupOptions}>

                        <div className='absolute top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-full h-screen'
                            onClick={() => setShowSignupOptions(false)}>
                        </div>
                        <div className='absolute z-20 w-full'>
                            <div className='bg-white shadow-lg mx-auto px-5 pt-3 pb-10 md:pb-12 '
                                style={{ height: 'fit-content', width: 'fit-content', marginTop: '5%' }}
                            >
                                < XIcon className='h-4 cursor-pointer mb-4 md:mb-0'
                                    style={{ marginLeft: '98%' }}
                                    onClick={() => setShowSignupOptions(false)} />
                                <div className='md:flex'>
                                    <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4
                                focus:ring-gray-300 rounded-lg border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700
                                dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 ${customer && 'border-dark-blue'}`}
                                        onClick={() => {
                                            setVendor(false)
                                            setCustomer(true)
                                            setProfessional(false)
                                            setSignupLink('/signup')
                                        }}>
                                        <p className='flex  justify-center font-normal text-lg lg:text-xl'>customer</p>
                                        <p className='flex  justify-center font-extralight text-xs lg:text-sm'>buy construction tools for my self</p>
                                    </div>
                                    <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4
                                focus:ring-gray-300 rounded-lg border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700
                                dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 ${vendor && ' border-dark-blue'}`}
                                        onClick={() => {
                                            setVendor(true)
                                            setCustomer(false)
                                            setProfessional(false)
                                            setSignupLink('/vendor-signup')
                                        }}>
                                        <p className='flex  justify-center font-normal text-lg lg:text-xl'>vendor</p>
                                        <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I own a construction store</p>
                                    </div>
                                    <div className={`m-2 md:m-4 p-4 hover:bg-gray-100 focus:ring-4
                                focus:ring-gray-300 rounded-lg border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700
                                dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 ${professional && ' border-dark-blue'}`}
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
                    {/* menu breakdown */}
                    <Disclosure.Panel className='sm:sr-only absolute z-10  bg-white'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <p>Home</p>
                        </div>
                    </Disclosure.Panel>
                </>
            )}

        </Disclosure >
    )
}
