import { Footer } from './footer'
import { Navbar } from './navbar'
import NotFound from './NotFound'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CategoryBar } from './categoryBar'
import { useParams } from 'react-router-dom'
import { addToCart } from '../../api/orders'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useProduct } from '../../api/products'
import { HeartIcon } from '@heroicons/react/outline'
import shorten from '../../utils/common/shotenString'
import { useDispatch, useSelector } from 'react-redux'
import { imageZoom } from '../../utils/common/imageZoom'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { AiFillStar, AiOutlineStar } from 'react-icons/all'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

const Product = () => {

    // redux
    const dispatch = useDispatch()

    const params = useParams()
    const { id } = params

    useProduct(id)
    const { isLoading, currentProduct } = useSelector((state: RootState) => state.product)

    const [showReview, setShowReview] = useState(false)
    const [quantity, setQuantity] = useState<string>('1')
    const [showDescription, setShowDescription] = useState(false)
    const [showReturnPolicy, setShowReturnPolicy] = useState(false)
    const [showSpecification, setShowSpecification] = useState(false)
    const [displayImage, setDisplayImage] = useState<any>(null)
    const [zoom, setZoom] = useState(false)

    useEffect(() => {
        if (currentProduct) {
            setDisplayImage(currentProduct.product.display_image)
        }
    }, [currentProduct])


    return (
        <div className='bg-slate-100 md:bg-white'>

            < Navbar />
            <CategoryBar />
            {isLoading ? (<h1>loading...</h1>) :
                currentProduct ? (
                    <div className='container-fluid mb-4'>

                        {/* navigation */}
                        <div className='overflow-x-scroll md:overflow-hidden bg-white 
                        px-5 py-6 md:px-12 lg:px-24'>
                            <div className='flex lg:mt-8 font-semibold text-xs md:text-sm text-slate-600 w-max'>
                                <Link to={'/products'} className='hover:underline hover:text-[#004896]'>All Products</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                                <Link to={`/products/c/${currentProduct.subCategory[0].subCategory.category.name}`}
                                    className='hover:underline hover:text-[#004896]'>
                                    {currentProduct.subCategory[0].subCategory.category.name}</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500' />
                                <Link to={`/products/s/${currentProduct.subCategory[0].subCategory.id}`}
                                    className='hover:underline hover:text-[#004896]'>
                                    {currentProduct.subCategory[0].subCategory.name}</Link>
                                <ChevronRightIcon className='h-4 md:h-5 mx-1 text-slate-500 whi' />
                                <p> {shorten(currentProduct.product.name, 20)}</p>
                            </div>

                        </div>

                        {/* picture and product name and details */}
                        <div className='fluid mx-auto' id='p'>
                            <div className='container'>
                                <div className=''>
                                    <div className='md:flex px-5 py-6 md:py-0 md:px-12 lg:px-24 mx-auto bg-white w-full
                                        border-b md:border-b-0 border-slate-200'>
                                        <div className='md:w-7/12'>
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
                                                        <div className='my-1 hover:border-black' key={img.image.id}
                                                            onPointerOver={() => setDisplayImage(img.image.image_url)}
                                                        >
                                                            <img
                                                                src={
                                                                    // img.image.image_url
                                                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-bidvine-1249611.jpg'
                                                                }
                                                                className='border mr-2 w-16 lg:w-20 h-16 lg:h-20'
                                                                alt='...'
                                                            />
                                                        </div>
                                                    ))}

                                                </div>

                                                <div className='md:ml-2 min-h-72 w-full relative'>
                                                    {displayImage ?
                                                        <div className='flex justify-center'>
                                                            <div>
                                                                <img
                                                                    src={displayImage}
                                                                    object-fit='false'
                                                                    alt='product pic'
                                                                    className='max-h-96'
                                                                    id='image'
                                                                    onPointerOver={() => setZoom(true)}
                                                                    onPointerLeave={() => setZoom(false)}
                                                                    onMouseMoveCapture={() => imageZoom()}
                                                                // onMouseMove={() => imageZoom()}
                                                                />
                                                                <div className='sr-only md:not-sr-only'>
                                                                    <Transition show={!!zoom} className='absolute w-20 h-28 top-0' id='lens'></Transition>
                                                                </div>
                                                            </div>
                                                        </div> : ''}
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
                                                        <div className='my-5 hover:border-black' key={img.image.id}
                                                            onPointerOver={() => setDisplayImage(img.image.image_url)}
                                                        >
                                                            <img
                                                                src={
                                                                    // img.image.image_url
                                                                    'https://udkpcrmwxnpihksygpgd.supabase.co/storage/v1/object/public/izitini/pexels-bidvine-1249611.jpg'
                                                                }
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
                                                        <li className={`cursor-pointer ${showDescription && 'border-b-4 border-[#004896]'}`}
                                                            onClick={() => {
                                                                setShowReview(false)
                                                                setShowDescription(true)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(false)
                                                            }}
                                                        >Description</li>

                                                        <li className={`cursor-pointer ${showSpecification && 'border-b-4 border-[#004896]'}`}
                                                            onClick={() => {
                                                                setShowReview(false)
                                                                setShowDescription(false)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(true)
                                                            }}
                                                        >Specification</li>

                                                        <li className={`cursor-pointer ${showReview && 'border-b-4 border-[#004896]'}`}
                                                            onClick={() => {
                                                                setShowReview(true)
                                                                setShowDescription(false)
                                                                setShowReturnPolicy(false)
                                                                setShowSpecification(false)
                                                            }}
                                                        >Review</li>

                                                        <li className={`cursor-pointer ${showReturnPolicy && 'border-b-4 border-[#004896]'}`}
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

                                        {/* product details */}
                                        <div className='md:w-5/12 md:ml-4 relative'>
                                            <div className='text-sm md:text-base'>
                                                <h2 className='font-semibold text-base text-slate-700'>{currentProduct?.product.name}</h2>
                                                <p className='text-xs lg:text-sm font-light mt-3'>By  <span className='italic underline text-[#004896]'>{currentProduct?.product.shop.name}</span></p>
                                                <p className='text-xs lg:text-sm font-light'>Brand:  <span className='italic'>{currentProduct.product.brand}</span></p>

                                                {/* Rate */}
                                                <div className='flex'>
                                                    <div className='flex text-lg lg:text-xl text-[#f0950c]'
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
                                                    <span className='ml-2 -mt-0.5 text-black text-sm lg:text-base underline'> 0 Review</span>
                                                </div>
                                                <p className='mt-3'>RWF {currentProduct?.product.price}</p>
                                                <p className='text-xs lg:text-sm capitalize italic'>read to ship in Kigali</p>

                                                <div>

                                                    {currentProduct.colors ?
                                                        (<select name='choose color' className='w-full border rounded px-3 bg-white text-slate-600 py-2 mt-4 appearance-none border-slate-300
                                                        outline-none focus:ring-1 focus:border-[#004896]'>
                                                            <option value=''>Choose Color</option>
                                                            {currentProduct.colors.map((c) => (<option key={c.color.id}>{c.color.name}</option>))}
                                                        </select>)
                                                        : ''}

                                                    {currentProduct.sizes ?
                                                        (<select name='choose size' className='w-full border rounded px-3 bg-white text-slate-600 py-2 mt-4 appearance-none border-slate-300
                                                        outline-none focus:ring-1 focus:border-[#004896]'>
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
                                                                className='w-full border rounded px-3 bg-white text-slate-600 py-2 appearance-none border-slate-300
                                                                outline-none focus:ring-1 focus:border-[#004896]'
                                                                onChange={e => setQuantity(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='flex mt-3 space-x-3 text-base
                                                        md:w-1/2 md:space-x-0 md:mt-0'>
                                                        <div className='w-1/3 md:sr-only'>
                                                            <button
                                                                className='flex btn bg-color border border-[#004896] text-[#004896]
                                                                w-full py-2 rounded bg-dark-white items-center justify-center font-medium'
                                                            >
                                                                <span></span>
                                                                <HeartIcon className='h-4 mr-1 w-auto' aria-hidden='true' />
                                                                save
                                                            </button>
                                                        </div>
                                                        <div className='w-2/3 md:w-full'>
                                                            <button
                                                                className='btn bg-color text-white w-full py-2 rounded bg-[#004896] font-medium'
                                                                onClick={() => addToCart(dispatch, {
                                                                    quantity,
                                                                    product_id: currentProduct.product.id,
                                                                    shop_id: currentProduct.product.shop_id
                                                                })}
                                                            >
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* zoom image */}
                                            <div className='sr-only md:not-sr-only'>
                                                <Transition show={zoom} className='w-full h-5/6 bg-white rounded shadow-lg absolute top-2' id='zoom'>
                                                </Transition>
                                            </div>
                                        </div>

                                    </div>

                                    {/* tabs and details */}
                                    <div className='md:sr-only bg-white my-6 border-t border-b py-6 border-slate-200
                                    px-5 md:px12 lg:px-24 mx-auto w-full'>
                                        {/* tabs */}
                                        <div className=''>
                                            <div className='pb-5 px-2 font-semibold border-b border-[#004896] relative'>
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
                                            <div className='py-5 px-2 font-semibold border-b border-[#004896] relative'>
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
                                            <div className='py-5 px-2 font-semibold border-b border-[#004896] relative'>
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
