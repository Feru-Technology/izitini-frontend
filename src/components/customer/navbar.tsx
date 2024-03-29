import { Link } from 'react-router-dom'
import { logout } from '../../api/auth'
import { useCart } from '../../api/orders'
import { Fragment, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { RootState } from '../../redux/store'
import { AiOutlineHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import backUpPImage from '../../images/profile.png'
import { FaTools, FaBuilding } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart3, BsSuitHeart, BsBell, BsChevronRight, BsChevronDown } from 'react-icons/bs'
import { MenuIcon, XIcon, ChevronDownIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

    // redux
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useCart()
    const { cart } = useSelector((state: RootState) => state.cart)

    let cartItems: number = 0

    if (cart.length !== 0) cart.map((orders: any) => orders.map((items: any) => cartItems += items.order_items.length))

    const { profile } = useSelector((state: RootState) => state.profile)

    console.log(profile)

    const { categories } = useSelector((state: RootState) => state.categories)

    const [open, setOpen] = useState(false)
    const [collapse, setCollapse] = useState<string | null>(null)

    const [showIdea, setShowIdea] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [showProfession, setShowProfession] = useState(false)
    const [showSignupOptions, setShowSignupOptions] = useState(false)

    // sign-up links
    const [vendor, setVendor] = useState(false)
    const [customer, setCustomer] = useState(false)
    const [professional, setProfessional] = useState(false)
    const [signupLink, setSignupLink] = useState<String | null>(null)

    return (
        <>
            {/* menu breakdown */}
            <div className={open ? 'sm:sr-only absolute z-10 overflow-hidden top-0 h-screen w-screen' : 'sr-only'}>
                <div className='bg-slate-900 h-screen opacity-50 w-screen pointer-events-none overflow-hidden'></div>
                <div className='bg-white top-0 absolute w-10/12 font-light h-screen overflow-y-scroll'>
                    <ul className='mt-20 text-base'>
                        <li className=' border-b border-slate-400 py-3 hover:text-[#004896]'>
                            <div className='flex px-1 mt-2 w-full' onClick={() => {
                                setOpen(false)
                                return navigate('/')
                            }}>
                                <AiOutlineHome className='h-5 w-1/6' />
                                <p className='w-7/12 hover:underline'>HOME</p>
                            </div>
                        </li>
                        <li className='border-b border-slate-400 py-3'>

                            <div className='flex px-1 w-full hover:text-[#004896]'
                                onClick={() => collapse === 'products' ? setCollapse('null') : setCollapse('products')}>
                                <div className={`flex w-11/12 ${collapse === 'products' && 'border-b border-[#004896]'}`}>
                                    <FaTools className='h-5 w-1/6' />
                                    <p className='w-7/12'>PRODUCTS</p>
                                </div>

                                <div className='justify-end'>
                                    {collapse === 'products'
                                        ? <BsChevronDown className='w-5 h-5' />
                                        : <BsChevronRight className='w-5 h-5' />}
                                </div>
                            </div>

                            <div className={collapse === 'products' ? 'text-slate-900' : 'sr-only'}>
                                <ul className='justify-end'>
                                    {categories.map((category) => (
                                        <li key={category.id} className='flex hover:underline hover:text-[#00adef]'>
                                            <div className='h-1 w-1/6 rounded-full'></div>
                                            <p onClick={() => {
                                                setOpen(false)
                                                return navigate(`/products/c/${category.name}`)
                                            }}>{category.name}</p></li>
                                    ))}
                                </ul>
                            </div>

                        </li>
                        <li className='border-b border-slate-400 py-3 hover:text-[#004896]'
                            onClick={() => collapse === 'ideas' ? setCollapse('null') : setCollapse('ideas')}>
                            <div className='flex px-1 w-full'>
                                <div className='flex w-11/12'>
                                    <FaBuilding className='h-5 w-1/6' />
                                    <p className='w-7/12 hover:underline'>GET IDEA</p>
                                </div>

                                <div>
                                    {collapse === 'ideas'
                                        ? <BsChevronDown className='w-5 h-5' />
                                        : <BsChevronRight className='w-5 h-5' />}
                                </div>
                            </div>
                        </li>
                        <li className='border-b border-slate-400 py-3 hover:text-[#004896]'
                            onClick={() => collapse === 'pros' ? setCollapse('null') : setCollapse('pros')}>
                            <div className='flex px-1 w-full'>
                                <div className='flex w-11/12'>
                                    <FaBuilding className='h-5 w-1/6' />
                                    <p className='w-7/12 hover:underline'>Find Pros</p>
                                </div>

                                <div className='flex'>
                                    {collapse === 'pros'
                                        ? <BsChevronDown className='w-5 h-5' />
                                        : <BsChevronRight className='w-5 h-5' />}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <nav className={open ? 'z-40 absolute w-full bg-white top-0 border-b ' : 'bg-white border-b'}>
                <div>
                    <div className={'mt-5 mb-5'}>
                        <div className='flex w-full'>

                            {/* logo */}
                            <div className='flex w-4/12 ml-1 
                            md:ml-8 md:w-1/12'>

                                <div className=' inset-y-0 left-0 flex items-center sm:sr-only'>

                                    {/* Mobile menu button*/}
                                    <div className='inline-flex items-center justify-center p-2 rounded-md text-black'>
                                        <span className='sr-only'>Open main menu</span>
                                        {open ? (
                                            <XIcon className='block h-7 w-7 font-bold' aria-hidden='true' onClick={() => setOpen(false)} />
                                        ) : (
                                            <MenuIcon className='block h-7 w-7 font-bold' aria-hidden='true' onClick={() => setOpen(true)} />
                                        )}
                                    </div>
                                </div>
                                <Link to='/'>
                                    <img
                                        className='block h-8 md:h-10 lg:h-12 w-auto'
                                        src='https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/LogoWhite.png'
                                        alt='Workflow'
                                    />
                                </Link>

                            </div>

                            {/* search */}
                            <div className='sr-only md:not-sr-only flex md:w-8/12'>
                                <div className='pt-2 relative mx-auto text-slate-600 w-full px-5'>
                                    <input className='border-2 border-slate-300 w-full
                                            bg-white h-9 lg:h-11 px-3 rounded-lg text-sm focus:outline-none'
                                        type='search' name='search' placeholder='Search' />
                                    <button type='submit' className='absolute right-10  top-0 mt-5'>

                                        <svg className='sr-only md:not-sr-only text-slate-600 md:h-3 lg:h-5 w-auto fill-current' xmlns='http://www.w3.org/2000/svg'
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
                                        <div className='z-auto absolute text-white text-xs bg-[#004896] rounded-full ml-4 w-3'>
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
                                            <p className='z-auto absolute text-white text-xs bg-[#004896] rounded-full ml-4 w-3'>3</p>
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
                                                <p className='z-auto absolute text-white text-xs bg-[#004896] rounded-full ml-4 w-3'>{cartItems}</p> : ''}

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

                                                        <div className='flex flex-row justify-center items-center space-x-2 bg-slate-50 rounded-full'>
                                                            <img
                                                                src={
                                                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-edgar-okioga-730353.jpg'
                                                                    // profile ? profile.profile_image ? profile.profile_image : backUpPImage : backUpPImage
                                                                }
                                                                className='w-6 h-6 mt-2 rounded-full mx-auto md:w-8 md:h-8 md:mt-0'
                                                                alt='pImg'
                                                            />
                                                            <p className='sr-only lg:not-sr-only text-slate-700 font-semibold'>{(profile?.full_name || profile.user.full_name).split(/[ ]+/)[0]}</p>
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
                                                                <Link to='/user/profile'
                                                                    className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                                                                >
                                                                    Your Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link to='/user'
                                                                    className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                                                                >
                                                                    Dashboard
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <p
                                                                    className={classNames(active ? 'bg-slate-100' : '', 'block px-4 py-2 text-sm text-slate-700')}
                                                                    onClick={() => logout(dispatch, navigate)}
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

                            <div className='sr-only md:not-sr-only space-x-6 flex justify-center mt-5 text-slate-800'>

                                <div onPointerOver={() => {
                                    // setShowIdea(false)
                                    setShowProduct(true)
                                    // setShowProfession(false)
                                }}
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showProduct && ' border-[#004896] bg-slate-100'}`
                                    }
                                    >
                                        <FaTools className='h-6 w-3 mr-2' />Buy your products</span>
                                </div>

                                <div onPointerOver={() => {
                                    // setShowIdea(true)
                                    setShowProduct(false)
                                    // setShowProfession(false)
                                }
                                }
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showIdea && ' border-[#004896] bg-slate-100'}`
                                    }>
                                        <FaBuilding className='h-6 w-3 mr-2' />Get idea</span>
                                </div>

                                <div onPointerOver={() => {
                                    // setShowIdea(false)
                                    setShowProduct(false)
                                    // setShowProfession(true)
                                }}
                                >
                                    <span className={`flex items-center px-4 font-bold border-t-4 border-white
                                ${showProfession && 'border-[#004896] bg-slate-100'}`}>
                                        <FaBuilding className='h-6 w-3 mr-2' />Find a profession</span>
                                </div>
                            </div>

                            <div className='sr-only md:not-sr-only w-full'>
                                <Transition
                                    show={showProduct}
                                >
                                    <div className='bg-slate-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className=' w-full space-x-5 absolute p-5 z-20 bg-slate-100 shadow-lg min-h-130 flex justify-center'>

                                        <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-auto md:w-9/12 lg:w-9/12 content-center'>
                                            {categories?.map((category) => {
                                                const sub_categories = category.subCategories.slice(0, 4)
                                                return (
                                                    <ul className='space-y-1 my-2 font-sans' key={category.id}>
                                                        <Link to={`/products/c/${category.name}`}
                                                            className='font-semibold text-[#004896] text-sm lg:text-base hover:underline'>{category.name}</Link>
                                                        {sub_categories.map((subCategory) => {
                                                            return (
                                                                <li key={subCategory.id}
                                                                    className='font-light hover:underline hover:text-[#004896] text-sm lg:text-base'>
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
                                    <div className='bg-slate-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className='flex w-full space-x-5 absolute p-5 justify-center z-20 bg-slate-100 shadow-lg'
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
                                    <div className='bg-slate-700 opacity-30 absolute min-h-screen w-full z-10'
                                        onPointerOver={() => {
                                            // setShowIdea(false)
                                            setShowProduct(false)
                                            // setShowProfession(false)
                                        }}></div>
                                    <div className='flex w-full space-x-5 absolute p-5 justify-center z-20 bg-slate-100 shadow-lg'
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

                        <div className='absolute top-0 z-10 text-slate-500 bg-slate-700 opacity-50 w-full h-screen'
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
                                    <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4
                                focus:ring-slate-300 rounded-lg border border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700
                                dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 ${customer && 'border-[#004896]'}`}
                                        onClick={() => {
                                            setVendor(false)
                                            setCustomer(true)
                                            setProfessional(false)
                                            setSignupLink('/signup')
                                        }}>
                                        <p className='flex  justify-center font-normal text-lg lg:text-xl'>customer</p>
                                        <p className='flex  justify-center font-extralight text-xs lg:text-sm'>buy construction tools for my self</p>
                                    </div>
                                    <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4
                                focus:ring-slate-300 rounded-lg border border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700
                                dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 ${vendor && ' border-[#004896]'}`}
                                        onClick={() => {
                                            setVendor(true)
                                            setCustomer(false)
                                            setProfessional(false)
                                            setSignupLink('/vendor-signup')
                                        }}>
                                        <p className='flex  justify-center font-normal text-lg lg:text-xl'>vendor</p>
                                        <p className='flex  justify-center font-extralight text-xs lg:text-sm'>I own a construction store</p>
                                    </div>
                                    <div className={`m-2 md:m-4 p-4 hover:bg-slate-100 focus:ring-4
                                focus:ring-slate-300 rounded-lg border border-slate-200 hover:text-slate-900 focus:z-10 dark:bg-slate-700
                                dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 ${professional && ' border-[#004896]'}`}
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

            </nav >

        </>
    )
}
