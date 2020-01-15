import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import axiosAction from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { uploadImage } from '../../api/images'
import { Editor } from '@tinymce/tinymce-react'
import { MdOutlineCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../utils/hooks/auth'
import { useState, useEffect, useRef } from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { createSize, deleteSize } from '../../api/sizes'
import { useSubCategories } from '../../api/subCategories'
import { createColor, deleteColor } from '../../api/colors'
import { uploadedImage } from '../../redux/image/uploadImage.slice'
import { removedImg } from '../../redux/image/removeImgToProd.slice'
import { addedImage } from '../../redux/image/addImageToProduct.slice'
import { product, productFailed } from '../../redux/products/product.slice'
import { createdSize } from '../../redux/admin/productSizes/createSize.slice'
import { deletedSize } from '../../redux/admin/productSizes/deleteSize.slice'
import { updatedProduct } from '../../redux/admin/products/updateProduct.slice'
import { createdColor } from '../../redux/admin/productColors/createColor.slice'
import { deletedColor } from '../../redux/admin/productColors/DeleteColor.slice'
import { addProdImage, publishUnPublish, removeImage, updateProduct, useProduct, useReloadPage } from '../../api/products'

const AdminProduct = () => {

    useAuth('admin')
    const dispatch = useDispatch()
    const desc = useRef('')
    const specs = useRef('')
    const params = useParams()
    const { id } = params

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
    const [manual, setManual] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string | null>(null)

    // size states
    const [addSize, setAddSize] = useState(false)
    const [size, setSize] = useState<string | null>(null)
    const [pricePerSize, setPricePerSize] = useState<string | null>(null)
    const [sizeQuantity, setSizeQuantity] = useState<string | null>(null)

    // color states
    const [addColor, setAddColor] = useState(false)
    const [pricePerColor, setPricePerColor] = useState<string>('0')
    const [colorName, setColorName] = useState<string | null>(null)
    const [colorQuantity, setColorQuantity] = useState<string | null>(null)

    // image states
    const [addImage, setAddImage] = useState(false)
    const [showImageDesc, setShowImageDesc] = useState(false)
    const [image_id, setImage_id] = useState<string | null>(null)
    const [image_url, setImage_url] = useState<string | null>(null)

    useProduct(id!)
    const { isLoading, currentProduct } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        if (currentProduct) {
            setEditMode(false)
            setName(currentProduct.product.name)
            setUnit(currentProduct.product.unit)
            setPrice(currentProduct.product.price)
            setBrand(currentProduct.product.brand)
            // setStatus(currentProduct.product.status)
            setManual(currentProduct.product.manual)
            setQuantity(currentProduct.product.quantity)
        }
    }, [currentProduct])

    useSubCategories('/admin/subcategory')
    const { deleted } = useSelector((state: RootState) => state.deleteSize)
    const { deletedColorRes } = useSelector((state: RootState) => state.deleteColor)
    const { subCategories } = useSelector((state: RootState) => state.adminSubCategories)
    const isSubCatLoading = useSelector((state: RootState) => state.adminSubCategories.isLoading)
    const { isCreatingSize, newSize, sizeError } = useSelector((state: RootState) => state.createSize)
    const { isCreatingColor, newColor, colorError } = useSelector((state: RootState) => state.createColor)
    const { isUpdating, updated, updateError } = useSelector((state: RootState) => state.adminUpdateProduct)

    useReloadPage()
    const { statusUpdateError } = useSelector((state: RootState) => state.updateProductStatus)
    const { isUploading, image } = useSelector((state: RootState) => state.uploadImage)

    useEffect(() => {
        if (image) {
            setImage_id(image.id)
            setImage_url(image.image_url)
            dispatch(uploadedImage(null))
        }
    }, [dispatch, image])

    const { isAdding, newImage, addError } = useSelector((state: RootState) => state.productImages)
    const { removedImgRes } = useSelector((state: RootState) => state.removeImgToProd)

    // if successfully clear the state and fetch updated product data
    useEffect(() => {
        if (updated || newColor || newSize || deleted || deletedColorRes || newImage || removedImgRes) {
            dispatch(updatedProduct(null))
            dispatch(createdColor(null))
            dispatch(deletedColor(null))
            dispatch(deletedSize(null))
            dispatch(createdSize(null))
            dispatch(addedImage(null))
            dispatch(removedImg(null))
            // dispatch(getProduct())

            axiosAction(
                'get',
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
            setPricePerSize(null)
            setSizeQuantity(null)
        }
    }, [dispatch, deleted, deletedColorRes, id, newColor, newSize, updated, newImage, removedImgRes])

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : currentProduct ?
                    (
                        <div className='flex h-screen overflow-hidden bg-slate-100'>
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
                                    name={'Admin'}
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
                                            <button className='py-3 px-6 border border-[#004896] text-[#004896] rounded-md text-sm md:text-base font-semibold
                                            hover:text-[#0e87d2] hover:border-[#0e87d2]'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                        </Transition>
                                        <Transition
                                            show={!editMode}>
                                            <button className='py-3 px-6 border border-[#004896] text-[#004896] rounded-md text-sm md:text-base font-semibold
                                            hover:text-[#0e87d2] hover:border-[#0e87d2]'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(true)
                                                }} >
                                                Edit
                                            </button>
                                        </Transition>
                                    </div>

                                    <div className='border border-slate-200 p-8 bg-white shadow-md rounded-md'>
                                        <form className='border-b border-[#004896] pb-8'>
                                            <div>
                                                <div className={`mb-3 w-full space-x-3 flex
                                                ${currentProduct.product.status === 'waiting_for_review' ?
                                                        'justify-between' : 'justify-end'}`}>
                                                    <Transition show={currentProduct.product.status === 'waiting_for_review'}>
                                                        <button type='submit'
                                                            className={`appearance-none w-fit bg-blue-50 border focus:ring-1 focus:ring-[#004896]
                                                        focus:outline-none text-[#004896] rounded border-[#004896] px-4 py-2 shadow-md
                                                        hover:text-[#0e87d2] hover:border-[#0e87d2] ${editMode && 'pointer-events-none'}`}
                                                            id='grid-state'
                                                            onClick={() => publishUnPublish(dispatch, '/admin/product', currentProduct.product.id, 'Approve',)}
                                                        >
                                                            Approve
                                                        </button>
                                                    </Transition>
                                                    <div>
                                                        <select
                                                            className={`appearance-none w-fit bg-blue-50 border focus:ring-1 focus:ring-[#004896]
                                                        focus:outline-none text-[#004896] rounded border-[#004896] px-4 py-2 shadow-md
                                                        ${editMode && 'pointer-events-none'}`}
                                                            id='grid-state'
                                                            onChange={() => publishUnPublish(dispatch, '/admin/product', currentProduct.product.id, currentProduct.product.status === 'draft' ? 'publish' : 'unpublish')}
                                                        >
                                                            <option className='text-center'>
                                                                {currentProduct.product.status === 'draft' ? 'Draft' : 'Published'}
                                                            </option>
                                                            <option className='text-center'>
                                                                {currentProduct.product.status === 'draft' ? 'Publish' : 'Un-publish'}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <Transition show={!!updateError || !!statusUpdateError}>
                                                    <div className='border border-red-600 bg-red-100 mb-3'>
                                                        <span className='px-2 py-4 text-red-600'> {updateError?.message || statusUpdateError?.message} </span>
                                                    </div>
                                                </Transition>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Name:</label>
                                                        <input type='name'
                                                            className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            onChange={e => setName(e.target.value)} defaultValue={name || currentProduct.product.name} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Unit:</label>
                                                        <input className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            type='text' onChange={e => setUnit(e.target.value)} defaultValue={unit || currentProduct.product.specification} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Price Per Unit:</label>
                                                        <input className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            type='number' onChange={e => setPrice(e.target.valueAsNumber)} defaultValue={price || currentProduct.product.price || 'N/A'} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Brand:</label>
                                                        <input className={`border border-slate-300 px-3 py-3  text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            type='text' onChange={e => setBrand(e.target.value)} defaultValue={brand || currentProduct.product.brand} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Manual:</label>
                                                        <input className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            type='text' onChange={e => setManual(e.target.value)} defaultValue={manual || currentProduct.product.manual || 'N/A'} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Quantity:</label>
                                                        <input className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                        ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                            type='text' onChange={e => setQuantity(e.target.value)} defaultValue={quantity || currentProduct.product.quantity} />
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >Owner:</label>
                                                        <input className='border border-slate-300 px-3 py-3 bg-slate-100 text-slate-600 rounded text-sm
                                                        focus:outline-none w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            type='text'
                                                            value={currentProduct.product.shop.name}
                                                        />
                                                    </div>

                                                    <div className='my-1'>
                                                        <h3 className='block uppercase text-slate-600 text-xs font-bold mb-2'>Sub-Categories</h3>
                                                        <div className='w-full mb-3'>
                                                            <select
                                                                className={`border border-slate-300 px-3 py-3 text-slate-600 rounded text-sm
                                                                focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring-1 focus:ring-[#004896]
                                                                ${editMode ? 'pointer-events-auto border bg-white' : 'bg-slate-100  pointer-events-none'}`}
                                                                id='grid-state'
                                                            // onChange={e => setSubCategory(e.target.value)}
                                                            >
                                                                {currentProduct.subCategory.map((subCat) => <option key={subCat.subCategory.id}>{subCat.subCategory.name}</option>)}

                                                                {isSubCatLoading ? 'loading...'
                                                                    : subCategories.map((c) => (<option key={c.id}>{c.name}</option>))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='my-1'>
                                                        <label className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                        >created At:</label>
                                                        <input className='border border-slate-300 px-3 py-3 bg-slate-100 text-slate-600 rounded text-sm
                                                        focus:outline-none  w-full ease-linear transition-all duration-150 pointer-events-none'
                                                            type='text' value={format(new Date(currentProduct.product.createdAt), 'dd.MM.yyyy')} />
                                                    </div>

                                                </div>

                                                <Transition show={editMode}>

                                                    <label className='block uppercase text-slate-600 text-xs font-bold mb-2 mt-5'
                                                    >Description</label>
                                                    {/* @ts-ignore */}
                                                    <Editor
                                                        apiKey='kymmu4dn6wwobwchlwh67nwhpe1lxtwsba433yg2az9nyk6l'
                                                        //@ts-ignore
                                                        onInit={(evt, editor) => desc.current = editor}
                                                        initialValue={currentProduct.product.description}
                                                        init={{
                                                            height: 200, menubar: false, plugins: [
                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                                                                'visualblocks', 'fullscreen', 'insertdatetime', 'table', 'code', 'help',
                                                            ],
                                                            toolbar: 'undo redo preview blocks | bold italic forecolor link | bullist numlist outdent indent | ' +
                                                                'alignleft aligncenter alignright alignjustify | table removeformat  help',
                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                        }}
                                                    />

                                                    <label className='block uppercase text-slate-600 text-xs font-bold mb-2 mt-5'
                                                    >Specification</label>
                                                    {/* @ts-ignore */}
                                                    <Editor
                                                        apiKey='kymmu4dn6wwobwchlwh67nwhpe1lxtwsba433yg2az9nyk6l'
                                                        //@ts-ignore
                                                        onInit={(evt, editor) => specs.current = editor}
                                                        initialValue={currentProduct.product.specification}
                                                        init={{
                                                            height: 200, menubar: false, plugins: [
                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                                                                'visualblocks', 'fullscreen', 'insertdatetime', 'table', 'code', 'help',
                                                            ],
                                                            toolbar: 'undo redo preview blocks | bold italic forecolor link | bullist numlist outdent indent | ' +
                                                                'alignleft aligncenter alignright alignjustify | table removeformat  help',
                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                        }}
                                                    />

                                                </Transition>

                                                <Transition show={!editMode} className='mt-5 space-y-5'>
                                                    <div>
                                                        <p className='block uppercase text-slate-600 text-xs font-bold mb-2'>Description:</p>
                                                        <p className=''>{parse(currentProduct.product.description)}</p>
                                                    </div>
                                                    <div>
                                                        <p className='block uppercase text-slate-600 text-xs font-bold mb-2'>Specification:</p>
                                                        <p className=''>{parse(currentProduct.product.specification)}</p>
                                                    </div>
                                                </Transition>
                                            </div>

                                        </form>

                                        <div className=' mb-8'>

                                            {/* product sizes */}
                                            <div className=' border-b border-[#004896] pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-slate-600 text-xs font-bold md:text-sm lg:text-base'>Product sizes</p>

                                                    <div className='rounded-full bg-slate-100 border border-slate-500 text-slate-500
                                                    hover:border-[#004896] hover:text-[#004896] hover:bg-blue-50 cursor-pointer'
                                                        onPointerOver={() => setShowSizeDesc(true)}
                                                        onPointerLeave={() => setShowSizeDesc(false)}
                                                        onClick={() => setAddSize(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showSizeDesc}
                                                        className='text-xs border text-[#004896] border-[#004896] bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.sizes.length === 0 ? <p>Add First Product Size</p> : <p>Add Product Size</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4'>

                                                    {currentProduct.sizes.map((s) => {
                                                        return (
                                                            <div key={s.size.id}
                                                                className='bg-white border shadow-md py-2 px-2 lg:px-4 font-medium text-xs md:text-sm lg:text-base rounded relative'>
                                                                <p className=''>Size: <span className='font-light ml-1 lg:ml-2'>{s.size.size}</span> </p>
                                                                <p className=''>Price: <span className='font-light ml-1 lg:ml-2'>{s.price}</span> </p>
                                                                <p className=''>Quantity: <span className='font-light ml-1 lg:ml-2'>{s.quantity}</span> </p>
                                                                <MdOutlineCancel className='h-4 w-auto absolute top-0.5 right-0.5
                                                                text-slate-600 hover:text-red-700 hover:shadow-lg cursor-pointer'
                                                                    onClick={() => deleteSize(dispatch, '/admin/product/size', currentProduct.product.id, s.size.id)} />
                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                            {/* product Colors */}
                                            <div className=' border-b border-[#004896] pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-slate-600 text-xs font-bold md:text-sm lg:text-base'>Product Colors</p>

                                                    <div className='rounded-full bg-slate-100 border border-slate-500 text-slate-500
                                                    hover:border-[#004896] hover:text-[#004896] hover:bg-blue-50'
                                                        onPointerOver={() => setShowColorDesc(true)}
                                                        onPointerLeave={() => setShowColorDesc(false)}
                                                        onClick={() => setAddColor(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showColorDesc}
                                                        className='text-xs border text-[#004896] border-[#004896] bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.colors.length === 0 ? <p>Add First Product Color</p> : <p>Add Product Color</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4'>

                                                    {currentProduct.colors.map((c) => {
                                                        return (
                                                            <div key={c.color.id}
                                                                className='bg-white border shadow-md py-2 px-2 lg:px-4 font-medium text-xs md:text-sm lg:text-base rounded relative'>
                                                                <p className=''>Size: <span className='font-light ml-1 lg:ml-2'>{c.color.name}</span> </p>
                                                                <p className=''>Price: <span className='font-light ml-1 lg:ml-2'>{c.price}</span> </p>
                                                                <p className=''>Quantity: <span className='font-light ml-1 lg:ml-2'>{c.quantity}</span> </p>
                                                                <MdOutlineCancel className='h-4 w-auto absolute top-0.5 right-0.5
                                                                text-slate-600 hover:text-red-700 hover:shadow-lg cursor-pointer'
                                                                    onClick={() => deleteColor(dispatch, '/admin/product/color', currentProduct.product.id, c.color.id)} />

                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                            {/* product Images */}
                                            <div className=' border-b border-[#004896] pb-8'>
                                                <div className='flex space-x-2 my-4'>
                                                    <p className='text-slate-600 text-xs font-bold md:text-sm lg:text-base'>Product Images</p>

                                                    <div className='rounded-full bg-slate-100 border border-slate-500 text-slate-500
                                                    hover:border-[#004896] hover:text-[#004896] hover:bg-blue-50'
                                                        onPointerOver={() => setShowImageDesc(true)}
                                                        onPointerLeave={() => setShowImageDesc(false)}
                                                        onClick={() => setAddImage(true)}
                                                    >
                                                        <PlusIcon className='h-6 mx-auto' />
                                                    </div>

                                                    <Transition show={!!showImageDesc}
                                                        className='text-xs border text-[#004896] border-[#004896] bg-blue-50 mt-1 px-1 relative right-20 top-7 lg:right-16 z-10'>
                                                        {currentProduct.images.length === 0 ? <p>Add First Product image</p> : <p>Add Product image</p>}
                                                    </Transition>
                                                </div>
                                                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4'>
                                                    {currentProduct.product.display_image ?
                                                        <div className='bg-white font-medium text-xs md:text-sm lg:text-base
                                                            rounded relative hover:shadow-sm grope'>
                                                            <MdOutlineCancel className={`h-5 w-auto absolute top-0.5 right-0.5 bg-white p-0.5 rounded-full
                                                                text-slate-600 hover:text-red-700 hover:shadow-lg cursor-pointer opacity-0 group-hover:opacity-100`}
                                                            // onClick={() => removeImage(image.image.id)}
                                                            />

                                                            <img src={currentProduct.product.display_image} alt='product_image' className='h-32 rounded w-full' />
                                                        </div> : ''}

                                                    {currentProduct.images.map((i) => {
                                                        return (
                                                            <div key={i.image.id}
                                                                className='bg-white font-medium text-xs md:text-sm lg:text-base
                                                            rounded relative hover:shadow-sm group'>
                                                                <MdOutlineCancel className={`h-5 w-auto absolute top-0.5 right-0.5 bg-white p-0.5 rounded-full
                                                                text-slate-600 hover:text-red-700 hover:shadow-lg cursor-pointer opacity-0 group-hover:opacity-100`}
                                                                    onClick={() => removeImage(dispatch, '/admin/product/image', currentProduct.product.id, i.image.id)}
                                                                />

                                                                <img src={i.image.image_url} alt='product_image' className='h-32 rounded w-full' />
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
                                            <button className='py-3 px-6 bg-[#004896] rounded-md text-white text-sm md:text-base font-semibold
                                            shadow-md hover:shadow-lg hover:bg-[#0e87d2]'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    return setEditMode(false)
                                                }} >
                                                CANCEL
                                            </button>
                                            <button className='py-3 px-6 bg-[#004896] rounded-md text-white text-sm md:text-base font-semibold
                                            shadow-md hover:shadow-lg hover:bg-[#0e87d2]'
                                                onClick={e => {
                                                    e.preventDefault()
                                                    // @ts-ignore
                                                    return updateProduct(dispatch, '/admin/product', currentProduct.product.id, { name, unit, price, brand, manual, quantity, specification: specs.current.getContent(), description: desc.current.getContent() })
                                                }} >
                                                {isUpdating ? 'updating ...' : 'SAVE CHANGES'}
                                            </button>
                                        </Transition>
                                    </div>
                                </div>

                            </div>

                            {/* add size to a product */}
                            <Transition show={!!addSize} className='absolute'>
                                <div className='top-0 z-10 text-slate-500 bg-slate-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-slate-600 hover:text-[#004896] hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddSize(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-slate-600'>New Product Size</div>
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
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Size
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Size'
                                                    onChange={e => setSize(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Price'
                                                    onChange={e => setPricePerSize(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Quantity
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Quantity'
                                                    onChange={e => setSizeQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className='bg-[#004896] hover:bg-[#0e87d2] text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return createSize(dispatch, '/admin/product/size', currentProduct.product.id, {
                                                            size,
                                                            price: pricePerSize,
                                                            quantity: sizeQuantity
                                                        })
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
                                <div className='top-0 z-10 text-slate-500 bg-slate-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-slate-600 hover:text-[#004896] hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddColor(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-slate-600'>New Product Color</div>
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
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Color
                                                </label>
                                                <input
                                                    type='text'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Color'
                                                    onChange={e => setColorName(e.target.value)}
                                                />
                                            </div>

                                            <div className=' w-full mb-3'>
                                                <label
                                                    className='block uppercase text-slate-600 text-xs font-bold mb-2'
                                                    htmlFor='grid-text'
                                                >
                                                    Quantity
                                                </label>
                                                <input
                                                    type='number'
                                                    className='border border-slate-700 px-3 py-3 placeholder-slate-500 text-slate-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                    placeholder='Quantity'
                                                    onChange={e => setColorQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className='bg-[#004896] hover:bg-[#0e87d2] text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return createColor(dispatch, '/admin/product/color', currentProduct.product.id, {
                                                            name: colorName,
                                                            price: pricePerColor,
                                                            quantity: colorQuantity,
                                                        })
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
                                <div className='top-0 z-10 text-slate-500 bg-slate-700 opacity-50 w-screen min-h-screen'>
                                </div>
                                <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                    <div className='p-3 bg-white w-ful mx-6 md:w-2/4 lg:w-1/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8 relative'>

                                        <MdOutlineCancel className='h-6 w-auto absolute top-1 right-1
                                    text-slate-600 hover:text-[#004896] hover:shadow-lg cursor-pointer'
                                            onClick={() => setAddImage(false)} />

                                        <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-slate-600'>New Product Image</div>
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
                                                        if (e.target.files) uploadImage(dispatch, e.target.files[0])
                                                    }} />
                                            </div>
                                            <div className='text-center mt-6'>
                                                <button
                                                    className={`bg-[#004896] hover:bg-[#0e87d2] text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150
                                            ${isUploading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer pointer-events-auto'}`}
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return addProdImage(dispatch, '/admin/product/image', currentProduct.product.id, image_id!, image_url!)
                                                    }}
                                                >
                                                    {!!isUploading ? <span className='flex space-x-3 justify-center'>
                                                        <svg className="motion-reduce:hidden animate-spin h-4 w-4 mx-3 border-r-2 rounded-full"></svg> uploading...  </span> : isAdding ? 'Creating...' : 'Create'}
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

export default AdminProduct
