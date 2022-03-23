import { Footer } from './footer'
import { Navbar } from './navbar'
import NotFound from './NotFound'
import { useEffect, useState } from 'react'
import { CategoryBar } from './categoryBar'
import { useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/all'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { fetch, post } from '../../api/apiAction'
import { HeartIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import {
    getProduct,
    product,
    productFailed
} from '../../redux/products/product.slice'
import { getCart, cart, cartFailed } from '../../redux/order/cart'
const Product = () => {

    // redux
    const dispatch = useDispatch();

    // Get ID from URL
    const params = useParams();

    const { id } = params

    useEffect(() => {
        dispatch(getProduct());
        fetch(dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])

    const token = localStorage.getItem('token');

    const [quantity, setQuantity] = useState<string>('1')

    const addToCart = () => {
        dispatch(getCart())
        post(dispatch, cart, cartFailed, '/orders/add-to-cart', {
            quantity: quantity,
            product_id: id,
            shop_id: currentProduct?.shop_id
        }, token)
    }

    const { isLoading, currentProduct } = useSelector((state: RootState) => state.product)

    const data = [
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/detail-of-broken-pipe-picture-id1074493878',

        },
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/sprinkler-installation-in-a-field-of-park-picture-id1043550948',

        },
        {
            image: 'https://media.istockphoto.com/photos/cement-bags-pile-picture-id476199756?k=20&m=476199756&s=612x612&w=0&h=AHEdPIf2xyl3amOyAgG9mUwp4WRS3GgO-SzyElhDx4A=',

        },
        {
            image: 'https://media.istockphoto.com/photos/rusty-burst-pipe-in-baku-botanic-garden-picture-id500598328',

        },
    ]

    // const images = product?.productImages

    const [displayImage, setDisplayImage] = useState(data[0].image);

    const [showReview, setShowReview] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showReturnPolicy, setShowReturnPolicy] = useState(false)
    const [showSpecification, setShowSpecification] = useState(false)

    return (
        <div className='bg-gray-100 md:bg-white'>

            < Navbar />
            <CategoryBar />
            {isLoading ? (<h1>loading...</h1>) :
                currentProduct ? (<div className='container-fluid mb-4 md:my-6 lg:my-8 '>
                    {/* picture and product name and details */}
                    <div className='fluid mx-auto' id='p'>
                        <div className='container'>
                            <div className=''>
                                <div className='md:flex px-5 py-6 md:py-0 md:px12 lg:px-24 mx-auto bg-white w-full
                                border-b border-gray-200'>
                                    <div className='md:w-2/3'>
                                        <div className='md:flex'>

                                            <div className='sr-only md:not-sr-only'>
                                                {data.map((image) => (<div className='my-1 hover:border-black
                                        '
                                                    onPointerOver={() => setDisplayImage(image.image)}
                                                >
                                                    <img
                                                        src={image.image}
                                                        className='border mr-2 w-16 lg:w-20'
                                                        alt='...'
                                                    />
                                                </div>)
                                                )}

                                            </div>

                                            <div className=''>
                                                <img
                                                    src={displayImage}
                                                    object-fit='false'
                                                    className=' max-h-96 justify-right'
                                                    alt='product pic'
                                                />
                                            </div>

                                            <div className='md:sr-only flex'>
                                                {data.map((image) => (<div className='my-1 hover:border-black'
                                                    onPointerOver={() => setDisplayImage(image.image)}
                                                >
                                                    <img
                                                        src={image.image}
                                                        className='border mr-2 w-20'
                                                        alt='...'
                                                    />
                                                </div>)
                                                )}
                                            </div>
                                        </div>

                                        <div className='sr-only md:not-sr-only'>
                                            {/* tabs */}
                                            <div className='container mt-2'>
                                                <ul className='flex space-x-2 lg:space-x-5
                                        md:font-medium md:-text-base
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
                                                    <p>this is the description of these product</p>
                                                </Transition>
                                                <Transition
                                                    show={showSpecification}
                                                >
                                                    <p>this is the specification of these product</p>
                                                </Transition>
                                                <Transition
                                                    show={showReview}
                                                >
                                                    <p>this is the Review of these product</p>
                                                </Transition>
                                                <Transition
                                                    show={showReturnPolicy}
                                                >
                                                    <p>this is the ReturnPolicy of these product</p>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:w-1/3'>
                                        <div className='text-sm md:text-base space-y-3'>
                                            <h2 className='text-xl font-bold dm:text-2xl lg:text-3xl'>{currentProduct?.name}</h2>
                                            <p>{currentProduct?.shop?.name}</p>
                                            <p></p>
                                            <span className='flex text-xl md:text-3xl lg:text-4xl'
                                                style={{ color: '#ff9900' }}
                                            >
                                                <i>
                                                    <AiFillStar />
                                                </i>
                                                <i>
                                                    <AiFillStar />
                                                </i>
                                                <i>
                                                    <AiFillStar />
                                                </i>
                                                <i>
                                                    <AiFillStar />
                                                </i>
                                                <i>
                                                    <AiFillStar />
                                                </i>
                                                <span className='ml-3 text-black text-base md:text-2xl'> (28)</span>
                                            </span>
                                            <p className='text-base font-bold md:text-lg'>{currentProduct?.shop.name}</p>
                                            <p>read to ship in Kigali</p>
                                            <p>{currentProduct?.price} in the store</p>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the dummy text ever since
                                                the 1500s, when an unknown
                                            </p>
                                            <div className='md:flex md:space-x-3 lg:space-x-5'>
                                                <div className='md:w-1/2'>
                                                    <div className='w-full'>
                                                        <select
                                                            className='w-full h-9 rounded border-2 bg-white px-3'
                                                            aria-label='multiple select example'
                                                            onChange={e => setQuantity(e.target.value)}
                                                        >
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='flex mt-3 space-x-3 text-base
                                        md:w-1/2 md:space-x-0 md:mt-0'>
                                                    <div className='w-1/3 md:sr-only'>
                                                        <button
                                                            className='flex btn bg-color border-2 border-dark-blue text-dark-blue
                                                    w-full h-9 rounded bg-dark-white items-center justify-center font-medium'
                                                        >
                                                            <span></span>
                                                            <HeartIcon className='h-4 w-auto' aria-hidden='true' />
                                                            save
                                                        </button>
                                                    </div>
                                                    <div className='w-2/3 md:w-full'>
                                                        <button
                                                            className='btn bg-color text-white w-full h-9 rounded bg-dark-blue font-medium'
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
                                <div className='md:sr-only bg-white my-6 border-t-2 border-b py-6 border-gray-200
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
                                                <div className='font-light pt-2'>this div contain product description this
                                                    div contain product description</div>
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
                                                <div className='font-light pt-2'>Product specification Product specification</div>
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
                                                <div className='font-light pt-2'>Shipping and return policies</div>
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
