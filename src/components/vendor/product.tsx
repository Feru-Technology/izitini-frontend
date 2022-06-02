import {
    useState,
    useEffect
} from 'react'
import Header from './Header'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useVendor } from '../../utils/hooks/auth'
import { PlusIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetch, post, update, destroy } from '../../api/apiAction'
import {
    product,
    getProduct,
    productFailed
} from '../../redux/products/product.slice'
import {
    fetchingSubCategories,
    retrievedSubCategories,
    fetchFailed
} from '../../redux/admin/subCategories/subCategories.slice'
import {
    updatingProduct,
    updatedProduct,
    updateFailed
} from '../../redux/admin/products/updateProduct.slice'
import {
    creatingSize,
    createdSize,
    createFailed
} from '../../redux/admin/productSizes/createSize.slice'
import {
    creatingColor,
    createdColor,
    createColorFailed
} from '../../redux/admin/productColors/createColor.slice'
import {
    deletingSize,
    deletedSize,
    deleteFailed
} from '../../redux/admin/productSizes/deleteSize.slice'
import {
    deletingColor,
    deletedColor,
    deleteColorFailed
} from '../../redux/admin/productColors/DeleteColor.slice'

import {
    updatingProductStatus,
    updatedProductStatus,
    failedToUpdateStatus
} from '../../redux/products/updateProductStatus.slice'
import {
    uploadingImage,
    uploadedImage,
    uploadFailed
} from '../../redux/image/uploadImage.slice'
import {
    addingImage,
    addedImage,
    addFailed
} from '../../redux/image/addImageToProduct.slice'
import {
    removingImg,
    removedImg,
    removeImgFailed
} from '../../redux/image/removeImgToProd.slice'

const VendorProduct = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useVendor(navigate, token)

    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    // product states
    const [isClosed, setIsClosed] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [unit, setUnit] = useState<string | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [brand, setBrand] = useState<string | null>(null)
    const [showSizeDesc, setShowSizeDesc] = useState(false)
    const [showColorDesc, setShowColorDesc] = useState(false)
    const [status, setStatus] = useState<string | null>(null)
    const [manual, setManual] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string | null>(null)
    const [specification, setSpecification] = useState<string | null>(null)

    // size states
    const [addSize, setAddSize] = useState(false)
    const [size, setSize] = useState<string | null>(null)
    const [pricePerSize, setPricePerSize] = useState<string | null>(null)
    const [sizeQuantity, setSizeQuantity] = useState<string | null>(null)

    // color states
    const [addColor, setAddColor] = useState(false)
    const [colorName, setColorName] = useState<string | null>(null)
    const [colorQuantity, setColorQuantity] = useState<string | null>(null)
    const [pricePerColor, setPricePerColor] = useState<string | null>(null)

    // image states
    const [addImage, setAddImage] = useState(false)
    const [showImageDesc, setShowImageDesc] = useState(false)
    const [image_id, setImage_id] = useState<string | null>(null)

    // change product status
    const publishUnPublish = (newStatus: string) => {
        if (newStatus === 'publish') {
            //publish
            dispatch(updatingProductStatus())
            update(dispatch, updatedProductStatus, failedToUpdateStatus, `/product/publish/${id}`, {}, token)
            return newStatus
        }
        // un-publish
        dispatch(updatingProductStatus())
        update(dispatch, updatedProductStatus, failedToUpdateStatus, `/product/unpublish/${id}`, {}, token)
        return newStatus
    }

    const { newProductStatus } = useSelector((state: RootState) => state.updateProductStatus)

    useEffect(() => {
        dispatch(getProduct())
        fetch(dispatch, product, productFailed, `/product/${id}`)
    }, [dispatch, id])

    const { isLoading, currentProduct, error } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        if (currentProduct) {
            setEditMode(false)
            setName(currentProduct.product.name)
            setUnit(currentProduct.product.unit)
            setPrice(currentProduct.product.price)
            setBrand(currentProduct.product.brand)
            setStatus(currentProduct.product.status)
            setManual(currentProduct.product.manual)
            setQuantity(currentProduct.product.quantity)
            setSpecification(currentProduct.product.specification)
        }
    }, [currentProduct])

    // get subcategories
    useEffect(() => {
        dispatch(fetchingSubCategories())
        fetch(dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
    }, [dispatch])

    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)

    const updateProduct = () => {
        dispatch(updatingProduct())
        update(dispatch, updatedProduct, updateFailed, `/product/${id}`, { name, unit, price, brand, status, manual, quantity, specification }, token)
    }

    const { isUpdating, updated, updateError } = useSelector((state: RootState) => state.adminUpdateProduct)

    // create product size
    const createSize = () => {
        dispatch(creatingSize())
        post(dispatch, createdSize, createFailed, `/product/size/${id}`, {
            size,
            price: pricePerSize,
            quantity: sizeQuantity
        }, token)
    }

    const { isCreatingSize, newSize, sizeError } = useSelector((state: RootState) => state.createSize)

    const createColor = () => {
        dispatch(creatingColor())
        post(dispatch, createdColor, createColorFailed, `/product/color/${id}`, {
            name: colorName,
            price: pricePerColor,
            quantity: colorQuantity,
        }, token)
    }

    const { isCreatingColor, newColor, colorError } = useSelector((state: RootState) => state.createColor)

    // remove size from product
    const deleteSize = (size_id: string) => {
        dispatch(deletingSize())
        destroy(dispatch, deletedSize, deleteFailed, `/product/size/${id}/${size_id}`, token)
    }

    const { deleted } = useSelector((state: RootState) => state.deleteSize)

    // remove color from product
    const deleteColor = (color_id: string) => {
        dispatch(deletingColor())
        destroy(dispatch, deletedColor, deleteColorFailed, `/product/color/${id}/${color_id}`, token)
    }

    const { deletedColorRes } = useSelector((state: RootState) => state.deleteColor)

    // upload product image
    const uploadProductImage = (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        dispatch(uploadingImage())
        post(dispatch, uploadedImage, uploadFailed, '/images', formData, token)
    }

    const { isUploading, image } = useSelector((state: RootState) => state.uploadImage)

    useEffect(() => {
        if (image) {
            setImage_id(image.id)
            dispatch(uploadedImage(null))
        }
    }, [dispatch, image])


    const addProductImage = () => {
        dispatch(addingImage())
        post(dispatch, addedImage, addFailed, `/product/image/${id}/${image_id}`, {}, token)
    }

    const { isAdding, newImage, addError } = useSelector((state: RootState) => state.productImages)

    const removeImage = (img_id: string) => {
        dispatch(removingImg())
        destroy(dispatch, removedImg, removeImgFailed, `/product/image/${id}/${img_id}`, token)
    }

    const { removedImgRes } = useSelector((state: RootState) => state.removeImgToProd)

    // if created successfully clear the state and fetch updated product data
    useEffect(() => {
        if (updated || newColor || newSize || deleted || deletedColorRes || newProductStatus || newImage || removedImgRes) {
            dispatch(updatedProductStatus(null))
            dispatch(updatedProduct(null))
            dispatch(createdColor(null))
            dispatch(deletedColor(null))
            dispatch(deletedSize(null))
            dispatch(createdSize(null))
            dispatch(addedImage(null))
            dispatch(removedImg(null))
            // dispatch(getProduct())

            fetch(
                dispatch,
                product,
                productFailed,
                `/product/${id}`)

            setSize(null)
            setAddSize(false)
            setAddImage(false)
            setEditMode(false)
            setAddColor(false)
            setColorName(null)
            setColorName(null)
            setPricePerColor(null)
            setPricePerSize(null)
            setSizeQuantity(null)
        }
    }, [deleted, deletedColorRes, dispatch, id, newColor, newSize, updated, newProductStatus, newImage, removedImgRes])

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : currentProduct ?
                    (
                        <div className='flex h-screen overflow-hidden bg-gray-100'>
                            <SiderBar
                                isClosed={isClosed}
                                setIsClosed={setIsClosed}
                                isStatic={isStatic}
                            />

                            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                                <Header
                                    isClosed={isClosed}
                                    setIsClosed={setIsClosed}
                                    isStatic={isStatic}
                                    name={'Vendor'}
                                />
                                <Transition
                                    appear={true}
                                    show={!isStatic && !isClosed}
                                    enter='transition-opacity duration-200'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-50'
                                    leave='transition-opacity duration-200'
                                    leaveFrom='opacity-50'
                                    leaveTo='opacity-0'
                                >
                                    <div className='fixed inset-0 bg-black opacity-60 z-10' />
                                </Transition>

                                {/* admin dashboard */}

                                <div className='px-2 md:px-6 lg:px-14 w-full'>

                                    <div className='my-5 '>
                                        <Transition className='flex space-x-6'
                                            show={!!editMode}
                                        >
                                            <button className='py-3 px-6 border border-dark-blue text-dark-blue rounded-md text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                        </Transition>
                                        <Transition
                                            show={!editMode}>
                                            <button className='py-3 px-6 border border-dark-blue text-dark-blue rounded-md text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(true)
                                                }} >
                                                Edit
                                            </button>
                                        </Transition>
                                    </div>

                                    <div className='border border-gray-200 p-8 bg-white shadow-md rounded-md'>
                                        <form className='border-b border-dark-blue pb-8'>
                                            <div>
                                                <Transition show={!!updateError}>
                                                    <div className='border border-red-600 bg-red-100'>
                                                        <span className='px-2 py-4 text-red-600'> {updateError?.message} </span>
                                                    </div>
                                                </Transition>
                                                <div className='mb-3 w-full flex justify-end'>
                                                    <select
                                                        className={`appearance-none w-fit bg-blue-50 border focus:ring-1 focus:ring-dark-blue
                                                        focus:outline-none text-dark-blue rounded border-dark-blue px-4 py-2 shadow-md
                                                        ${editMode && 'pointer-events-none'}`}
                                                        id='grid-state'
                                                        onChange={e => publishUnPublish(currentProduct.product.status === 'draft' ? 'publish' : 'un_publish')}
                                                    >
                                                        <option className='text-center'>
                                                            {currentProduct.product.status === 'draft' ? 'Draft' : 'Published'}
                                                        </option>
                                                        <option className='text-center'>
                                                            {currentProduct.product.status === 'draft' ? 'Publish' : 'Un-publish'}</option>
                                                    </select>
                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Name:</label>
                                                        <input type='name'
                                                            className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-first-name' onChange={e => setName(e.target.value)} defaultValue={name || currentProduct.product.name} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Unit:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='text' onChange={e => setUnit(e.target.value)} defaultValue={unit || currentProduct.product.specification} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Price Per Unit:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='number' onChange={e => setPrice(e.target.valueAsNumber)} defaultValue={price || currentProduct.product.price || 'N/A'} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Brand:</label>
                                                        <input className={`border border-gray-300 px-3 py-3  text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='text' onChange={e => setBrand(e.target.value)} defaultValue={brand || currentProduct.product.brand} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Specs:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='text' onChange={e => setSpecification(e.target.value)} defaultValue={specification || currentProduct.product.specification} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Manual:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='text' onChange={e => setManual(e.target.value)} defaultValue={manual || currentProduct.product.manual || 'N/A'} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Quantity:</label>
                                                        <input className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                            id='grid-last-name' type='text' onChange={e => setQuantity(e.target.value)} defaultValue={quantity || currentProduct.product.quantity} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >Owner:</label>
                                                        <input className='border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            id='grid-last-name' type='text'
                                                            value={currentProduct.product.shop.name}
                                                        />
                                                    </div>

                                                    <div className='my-1'>
                                                        <h3 className='block uppercase text-gray-600 text-xs font-bold mb-2'>Sub-Categories</h3>
                                                        <div className='w-full mb-3'>
                                                            <select
                                                                className={`border border-gray-300 px-3 py-3 text-gray-600 rounded text-sm
                                                                focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-dark-blue
                                                                ${editMode ? 'pointer-events-auto border bg-white' : 'bg-gray-100  pointer-events-none'}`}
                                                                id='grid-state'
                                                            // onChange={e => setSubCategory(e.target.value)}
                                                            >
                                                                <option>Choose sub-category</option>
                                                                {isSubCatLoading ? <h1>loading...</h1>
                                                                    : subCategories.map((c) => (<option>{c.name}</option>))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                        >created At:</label>
                                                        <input className='border border-gray-300 px-3 py-3 bg-gray-100 text-gray-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            id='grid-last-name' type='text' value={format(new Date(currentProduct.product.createdAt), 'dd.MM.yyyy')} />
                                                    </div>

                                                </div>
                                            </div>

                                        </form>

                                        <div className=' mb-8'>

                                            {/* product sizes */}
                                            <div className=' border-b border-dark-blue pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-gray-600 text-xs font-bold md:text-sm lg:text-base'>Product sizes</p>

                                                    <div className='rounded-full bg-gray-100 border border-gray-500 text-gray-500
                                                    hover:border-dark-blue hover:text-dark-blue hover:bg-blue-50 cursor-pointer'
                                                        onPointerOver={() => setShowSizeDesc(true)}
                                                        onPointerLeave={() => setShowSizeDesc(false)}
                                                        onClick={() => setAddSize(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showSizeDesc}
                                                        className='text-xs border text-dark-blue border-dark-blue bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.sizes.length === 0 ? <p>Add First Product Size</p> : <p>Add Product Size</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4'>

                                                    {currentProduct.sizes.map((size) => {
                                                        return (
                                                            <div className='bg-white border shadow-md py-2 px-2 lg:px-4 font-medium text-xs md:text-sm lg:text-base rounded relative'>
                                                                <p className=''>Size: <span className='font-light ml-1 lg:ml-2'>{size.size.size}</span> </p>
                                                                <p className=''>Price: <span className='font-light ml-1 lg:ml-2'>{size.price}</span> </p>
                                                                <p className=''>Quantity: <span className='font-light ml-1 lg:ml-2'>{size.quantity}</span> </p>
                                                                <MdOutlineCancel className='h-4 w-auto absolute top-0.5 right-0.5
                                                                text-gray-600 hover:text-red-700 hover:shadow-lg cursor-pointer'
                                                                    onClick={() => deleteSize(size.size.id)} />
                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                            {/* product Colors */}
                                            <div className=' border-b border-dark-blue pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-gray-600 text-xs font-bold md:text-sm lg:text-base'>ProductColors</p>

                                                    <div className='rounded-full bg-gray-100 border border-gray-500 text-gray-500
                                                    hover:border-dark-blue hover:text-dark-blue hover:bg-blue-50'
                                                        onPointerOver={() => setShowColorDesc(true)}
                                                        onPointerLeave={() => setShowColorDesc(false)}
                                                        onClick={() => setAddColor(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showColorDesc}
                                                        className='text-xs border text-dark-blue border-dark-blue bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.colors.length === 0 ? <p>Add First Product Color</p> : <p>Add Product Color</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4'>

                                                    {currentProduct.colors.map((color) => {
                                                        return (
                                                            <div className='bg-white border shadow-md py-2 px-2 lg:px-4 font-medium text-xs md:text-sm lg:text-base rounded relative'>
                                                                <p className=''>Size: <span className='font-light ml-1 lg:ml-2'>{color.color.name}</span> </p>
                                                                <p className=''>Price: <span className='font-light ml-1 lg:ml-2'>{color.price}</span> </p>
                                                                <p className=''>Quantity: <span className='font-light ml-1 lg:ml-2'>{color.quantity}</span> </p>
                                                                <MdOutlineCancel className='h-4 w-auto absolute top-0.5 right-0.5
                                                                text-gray-600 hover:text-red-700 hover:shadow-lg cursor-pointer'
                                                                    onClick={() => deleteColor(color.color.id)} />

                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                            {/* product Images */}
                                            <div className=' border-b border-dark-blue pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-gray-600 text-xs font-bold md:text-sm lg:text-base'>Product Images</p>

                                                    <div className='rounded-full bg-gray-100 border border-gray-500 text-gray-500
                                                    hover:border-dark-blue hover:text-dark-blue hover:bg-blue-50'
                                                        onPointerOver={() => setShowImageDesc(true)}
                                                        onPointerLeave={() => setShowImageDesc(false)}
                                                        onClick={() => setAddImage(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showImageDesc}
                                                        className='text-xs border text-dark-blue border-dark-blue bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.images.length === 0 ? <p>Add First Product image</p> : <p>Add Product image</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4'>
                                                    {currentProduct.product.display_image ?
                                                        <div className='bg-white font-medium text-xs md:text-sm lg:text-base
                                                            rounded relative hover:shadow-sm grope'>
                                                            <MdOutlineCancel className={`h-5 w-auto absolute top-0.5 right-0.5 bg-white p-0.5 rounded-full
                                                                text-gray-600 hover:text-red-700 hover:shadow-lg cursor-pointer opacity-0 group-hover:opacity-100`}
                                                            // onClick={() => removeImage(image.image.id)}
                                                            />

                                                            <img src={currentProduct.product.display_image} alt='product_image' className='h-32 rounded w-full' />
                                                        </div> : ''}

                                                    {currentProduct.images.map((image) => {
                                                        return (
                                                            <div className='bg-white font-medium text-xs md:text-sm lg:text-base
                                                            rounded relative hover:shadow-sm group'>
                                                                <MdOutlineCancel className={`h-5 w-auto absolute top-0.5 right-0.5 bg-white p-0.5 rounded-full
                                                                text-gray-600 hover:text-red-700 hover:shadow-lg cursor-pointer opacity-0 group-hover:opacity-100`}
                                                                    onClick={() => removeImage(image.image.id)}
                                                                />

                                                                <img src={image.image.image_url} alt='product_image' className='h-32 rounded w-full' />
                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className=' my-5 '>
                                        <Transition className='flex space-x-6'
                                            show={!!editMode}
                                        >
                                            <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                            <button className='py-3 px-6 bg-dark-blue rounded-md text-white text-sm md:text-base font-semibold'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return updateProduct()
                                                }} >
                                                {isUpdating ? 'updating ...' : 'SAVE CHANGES'}
                                            </button>
                                        </Transition>
                                    </div>
                                </div>

                            </div>

                            {/* add size to a product */}
                            <Transition show={!!addSize} className='absolute'>
                                <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddSize(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>New Product Size</div>
                                        <div className='container'>
                                            <Transition
                                                show={!!sizeError}
                                            >
                                                <p className='p-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{sizeError?.message}</p>

                                            </Transition>
                                        </div>
                                        <form>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Size
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Size'
                                                    onChange={e => setSize(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Price'
                                                    onChange={e => setPricePerSize(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Quantity
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Quantity'
                                                    onChange={e => setSizeQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className='bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return createSize()
                                                    }}
                                                >
                                                    {!!isCreatingSize ? 'Creating...' : 'Create'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Transition>

                            {/* add color to a product */}
                            <Transition show={!!addColor} className='absolute'>
                                <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddColor(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>New Product Color</div>
                                        <div className='container'>
                                            <Transition
                                                show={!!colorError}
                                            >
                                                <p className='p-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{colorError?.message}</p>

                                            </Transition>
                                        </div>
                                        <form>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Color
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Color'
                                                    onChange={e => setColorName(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Price'
                                                    onChange={e => setPricePerColor(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Quantity
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Quantity'
                                                    onChange={e => setColorQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className='bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return createColor()
                                                    }}
                                                >
                                                    {!!isCreatingColor ? 'Creating...' : 'Create'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Transition>


                            {/* add image to a product */}
                            <Transition show={!!addImage} className='absolute'>
                                <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddImage(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>New Product Image</div>
                                        <div className='container'>
                                            <Transition
                                                show={!!addError}
                                            >
                                                <p className='p-2 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{addError?.message}</p>

                                            </Transition>
                                        </div>
                                        <form>

                                            {/* upload image */}
                                            <div>
                                                <input type='file' name='filename' className=''
                                                    accept='image/x-png,image/gif,image/jpeg, image/png'
                                                    onChange={e => {
                                                        if (e.target.files) uploadProductImage(e.target.files[0])
                                                    }} />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className={`bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150
                                            ${isUploading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer pointer-events-auto'}`}
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return addProductImage()
                                                    }}
                                                >
                                                    {!!isUploading ? 'uploading...' : isAdding ? 'Creating...' : 'Create'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Transition>

                        </div>
                    )
                    : ''

            }
        </>
    )
}

export default VendorProduct
