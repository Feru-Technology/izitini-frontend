import { Footer } from './footer'
import { Navbar } from './navbar'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CategoryBar } from './categoryBar'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { fetch, post } from '../../api/apiAction'
import { HeartIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { AiFillStar, AiOutlineStar } from 'react-icons/all'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { addingToCart, cart, cartFailed } from '../../redux/order/cart'
import {
    getProduct,
    product,
    productFailed
} from '../../redux/products/product.slice'

const Product = () => {

    // redux
    const dispatch = useDispatch()

    // Get ID from URL
    const params = useParams()

    const { id } = params

    useEffect(() => {
        dispatch(getProduct())
        fetch(dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])

    const token = localStorage.getItem('token')

    const [quantity, setQuantity] = useState<string>('1')

    const addToCart = () => {
        dispatch(addingToCart())
        post(dispatch, cart, cartFailed, '/orders/add-to-cart', {
            quantity: quantity,
            product_id: id,
            shop_id: currentProduct?.product.shop_id
        }, token)
    }

    const { isLoading, currentProduct } = useSelector((state: RootState) => state.product)

    const [showReview, setShowReview] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showReturnPolicy, setShowReturnPolicy] = useState(false)
    const [showSpecification, setShowSpecification] = useState(false)
    const [displayImage, setDisplayImage] = useState<string | null>(null)

    useEffect(() => {
        if (currentProduct) {
            setDisplayImage(currentProduct.product.display_image)
        }
    }, [currentProduct])

    // const qty = (n: any) => n === 1 ? '1' : qty(n - 1) + ', ' + n

    return (
        <div className='bg-gray-100 md:bg-white'>

            < Navbar />
            <CategoryBar />
            {isLoading ? (<h1>loading...</h1>) :
                currentProduct ? (
                    <div className='container-fluid mb-4'>

                        {/* navigation */}
                        <div className='overflow-x-scroll md:overflow-hidden bg-white 
                        px-5 py-6 md:px-12 lg:px-24'>
                            <div className='flex lg:mt-8 font-semibold text-xs md:text-sm text-gray-600 w-max'>
                                <Link to={'/products'} className=' '>All Products</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-gray-500' />
                                <Link to={`/products/c/${currentProduct.subCategory[0].subCategory.category.name}`}>
                                    {currentProduct.subCategory[0].subCategory.category.name}</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-gray-500' />
                                <Link to={`/products/s/${currentProduct.subCategory[0].subCategory.id}`} className=' '>
                                    {currentProduct.subCategory[0].subCategory.name}</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-gray-500 whi' />
                                <p> {currentProduct.product.name}</p>
                            </div>

                        </div>

                        {/* picture and product name and details */}
                        <div className='fluid mx-auto' id='p'>
                            <div className='container'>
                                <div className=''>
                                    <div className='md:flex px-5 py-6 md:py-0 md:px-12 lg:px-24 mx-auto bg-white w-full
                                        border-b md:border-b-0 border-gray-200'>
                                        <div className='md:w-2/3'>
                                            <div className='md:flex'>

                                                <div className='sr-only md:not-sr-only'>
                                                    <div className='mb-1 hover:border-black
                                        '
                                                        onPointerOver={() => setDisplayImage(currentProduct.product.display_image)}
                                                    >
                                                        <img
                                                            src={currentProduct.product.display_image}
                                                            className='border mr-2 w-16 lg:w-20 h-16 lg:h-20'
                                                            alt='...'
                                                        />
                                                    </div>
                                                    {currentProduct.images.map((img) => (
                                                        <div className='my-1 hover:border-black
                                        '
                                                            onPointerOver={() => setDisplayImage(img.image.image_url)}
                                                        >
                                                            <img
                                                                src={img.image.image_url}
                                                                className='border mr-2 w-16 lg:w-20 h-16 lg:h-20'
                                                                alt='...'
                                                            />
                                                        </div>
                                                    ))}

                                                </div>

                                                <div className='md:ml-2 min-h-72 w-full'>

                                                    {displayImage ? <img
                                                        src={displayImage}
                                                        object-fit='false'
                                                        className='max-h-96 mx-auto'
                                                        alt='product pic'
                                                    /> : ''}
                                                </div>

                                                <div className='md:sr-only flex space-x-1'>

                                                    <div className='my-5 hover:border-black'
                                                        onPointerOver={() => setDisplayImage(currentProduct.product.display_image)}
                                                    >
                                                        <img
                                                            src={currentProduct.product.display_image}
                                                            className='border h-20'
                                                            alt='...'
                                                        />
                                                    </div>
                                                    {currentProduct.images.map((img) => (
                                                        <div className='my-5 hover:border-black'
                                                            onPointerOver={() => setDisplayImage(img.image.image_url)}
                                                        >
                                                            <img
                                                                src={img.image.image_url}
                                                                className='border w-20 h-20'
                                                                alt='...'
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className='sr-only md:not-sr-only'>
                                                {/* tabs */}
                                                <div className='container mt-2'>
                                                    <ul className='flex space-x-2 lg:space-x-5 md:font-medium md:-text-base
                                                    lg:font-bold lg:text-lg lg:space-x-12'>
                                                        <li className={`cursor-pointer ${showDescription && 'border-b-4 border-dark-blue'}`}
                                                            onClick={() => {
                                                                setShowReview(false)
                                                                setShowDescription(true)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(false)
                                                            }}
                                                        >Description</li>

                                                        <li className={`cursor-pointer ${showSpecification && 'border-b-4 border-dark-blue'}`}
                                                            onClick={() => {
                                                                setShowReview(false)
                                                                setShowDescription(false)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(true)
                                                            }}
                                                        >Specification</li>

                                                        <li className={`cursor-pointer ${showReview && 'border-b-4 border-dark-blue'}`}
                                                            onClick={() => {
                                                                setShowReview(true)
                                                                setShowDescription(false)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(false)
                                                            }}
                                                        >Review</li>

                                                        <li className={`cursor-pointer ${showReturnPolicy && 'border-b-4 border-dark-blue'}`}
                                                            onClick={() => {
                                                                setShowReview(false)
                                                                setShowReturnPolicy(true)
                                                                setShowDescription(false)
                                                                setShowSpecification(false)
                                                            }}
                                                        >Shipping & Return Policy</li>
                                                    </ul>
                                                </div>

                                                {/* tabs and details */}
                                                <div className='w-full text-base font-normal mt-1'>
                                                    <Transition
                                                        show={showDescription}
                                                    >
                                                        <p className='text-sm lg:text-base capitalize'>{currentProduct.product.description}</p>
                                                    </Transition>
                                                    <Transition
                                                        show={showSpecification}
                                                    >
                                                        <p className='text-sm lg:text-base capitalize'>{currentProduct.product.specification}</p>
                                                    </Transition>
                                                    <Transition
                                                        show={showReview}
                                                    >
                                                        <p className='text-sm lg:text-base capitalize'>{currentProduct.product.manual}</p>
                                                    </Transition>
                                                    <Transition
                                                        show={showReturnPolicy}
                                                    >
                                                        <p className='text-sm lg:text-base capitalize'>{currentProduct.product.return_policy}</p>
                                                    </Transition>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='md:w-1/3 md:ml-4'>
                                            <div className='text-sm md:text-base'>
                                                <h2 className='font-medium text-lg lg:text-xl'>{currentProduct?.product.name}</h2>
                                                <p className='text-xs lg:text-sm'>{currentProduct?.product.shop.name}</p>
                                                <p></p>

                                                {/* Rate */}
                                                <div className='flex mt-2'>
                                                    <div className='flex text-lg lg:text-2xl'
                                                        style={{ color: '#ff9900' }}
                                                    >
                                                        <i>
                                                            <AiOutlineStar />
                                                        </i>
                                                        <i>
                                                            <AiOutlineStar />
                                                        </i>
                                                        <i>
                                                            <AiOutlineStar />
                                                        </i>
                                                        <i>
                                                            <AiOutlineStar />
                                                        </i>
                                                        <i>
                                                            <AiOutlineStar />
                                                        </i>
                                                    </div>
                                                    <span className='ml-1 -mt-1 text-black text-base lg:text-lg'> (0)</span>
                                                </div>
                                                <p className='text-base font-semibold md:text-lg'>{currentProduct?.product.brand}</p>
                                                <p className='text-xs md:text-sm lg:text-base'>{currentProduct?.product.description}</p>
                                                <p className='text-xs lg:text-sm capitalize italic mt-2'>read to ship in Kigali</p>
                                                <p>{currentProduct?.product.price}</p>
                                                <p>{currentProduct.product.description}</p>

                                                <div>

                                                    {currentProduct.colors ?
                                                        (<select name='choose color' className='w-full border rounded px-3 bg-white text-gray-600 py-2 mt-4 appearance-none border-gray-300
                                                        outline-none focus:ring-1 focus:border-dark-blue'>
                                                            <option value=''>Choose Color</option>
                                                            {currentProduct.colors.map((c) => (<option key={c.color.id}>{c.color.name}</option>))}
                                                        </select>)
                                                        : ''}

                                                    {currentProduct.sizes ?
                                                        (<select name='choose size' className='w-full border rounded px-3 bg-white text-gray-600 py-2 mt-4 appearance-none border-gray-300
                                                        outline-none focus:ring-1 focus:border-dark-blue'>
                                                            <option value=''>Choose Size</option>
                                                            {currentProduct.sizes.map((s) => (<option key={s.size.id}>{s.size.size}</option>))}
                                                        </select>)
                                                        : ''}
                                                </div>

                                                <div className='md:flex md:space-x-3 lg:space-x-5 mt-4'>
                                                    <div className='md:w-1/2'>
                                                        <div className='w-full'>

                                                            <input
                                                                type='number' min='1' defaultValue='1'
                                                                className='w-full border rounded px-3 bg-white text-gray-600 py-2 appearance-none border-gray-300
                                                                outline-none focus:ring-1 focus:border-dark-blue'
                                                                onChange={e => setQuantity(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='flex mt-3 space-x-3 text-base
                                                        md:w-1/2 md:space-x-0 md:mt-0'>
                                                        <div className='w-1/3 md:sr-only'>
                                                            <button
                                                                className='flex btn bg-color border border-dark-blue text-dark-blue
                                                                w-full py-2 rounded bg-dark-white items-center justify-center font-medium'
                                                            >
                                                                <span></span>
                                                                <HeartIcon className='h-4 mr-1 w-auto' aria-hidden='true' />
                                                                save
                                                            </button>
                                                        </div>
                                                        <div className='w-2/3 md:w-full'>
                                                            <button
                                                                className='btn bg-color text-white w-full py-2 rounded bg-dark-blue font-medium'
                                                                onClick={() => addToCart()}
                                                            >
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* tabs and details */}
                                    <div className='md:sr-only bg-white my-6 border-t border-b py-6 border-gray-200
                                px-5 md:px12 lg:px-24 mx-auto w-full'>
                                        {/* tabs */}
                                        <div className=''>
                                            <div className='pb-5 px-2 font-semibold border-b border-dark-blue relative'>
                                                <div onClick={() => { !showDescription ? setShowDescription(true) : setShowDescription(false) }}>
                                                    <div className='right-0 absolute'>

                                                        <Transition show={!!showDescription}>
                                                            <ChevronUpIcon className='h-6' />
                                                        </Transition>

                                                        <Transition show={!showDescription}>
                                                            <ChevronDownIcon className='h-6' />
                                                        </Transition>

                                                    </div>
                                                    Description
                                                </div>

                                                <Transition show={!!showDescription}>
                                                    <div className='font-light pt-2'>{currentProduct?.product.description}</div>
                                                </Transition>

                                            </div>
                                            <div className='py-5 px-2 font-semibold border-b border-dark-blue relative'>
                                                <div onClick={() => { !showSpecification ? setShowSpecification(true) : setShowSpecification(false) }}>
                                                    <div className='right-0 absolute'>

                                                        <Transition show={!!showSpecification}>
                                                            <ChevronUpIcon className='h-6' />
                                                        </Transition>

                                                        <Transition show={!showSpecification}>
                                                            <ChevronDownIcon className='h-6' />
                                                        </Transition>

                                                    </div>
                                                    Products Specification
                                                </div>

                                                <Transition show={!!showSpecification}>
                                                    <div className='font-light pt-2'>{currentProduct?.product.specification}</div>
                                                </Transition>

                                            </div>
                                            <div className='py-5 px-2 font-semibold border-b border-dark-blue relative'>
                                                <div
                                                    onClick={() => { !showReturnPolicy ? setShowReturnPolicy(true) : setShowReturnPolicy(false) }}
                                                >
                                                    <div className='right-0 absolute'>

                                                        <Transition show={!!showSpecification}>
                                                            <ChevronUpIcon className='h-6' />
                                                        </Transition>

                                                        <Transition show={!showSpecification}>
                                                            <ChevronDownIcon className='h-6' />
                                                        </Transition>

                                                    </div>
                                                    Shipping & Return
                                                </div>

                                                <Transition show={!!showReturnPolicy}>
                                                    <div className='font-light pt-2'>{currentProduct?.product.return_policy}</div>
                                                </Transition>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <NotFound />}
            <Footer />
        </div>
    )
}

export default Product
