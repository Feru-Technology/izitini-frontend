import { useEffect, useState } from 'react'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetch, post, update } from '../../api/apiAction'
import {
    fetchingCategory,
    fetchedCategory,
    fetchFailed
} from '../../redux/admin/categories/category.slice'
import {
    creatingSubCategory,
    createdSubCategory,
    createFailed
} from '../../redux/admin/subCategories/createSubCategory.slice'

import {
    updatingSubCategory,
    updated,
    updateFailed
} from '../../redux/admin/subCategories/updateSubCategory.slice'
import {
    uploadingImage,
    uploadedImage,
    uploadFailed
} from '../../redux/image/uploadImage.slice'

// all subcategory in a category
const CatSubCategories = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const params = useParams()
    const { id } = params

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [image_url, setImage_url] = useState<string | null>()
    const [currentSubCategory, setCurrentSubCategory] = useState<{ id: string, name: string, image_url: string } | null>(null)

    const navigate = useNavigate()

    // get subcategories
    useEffect(() => {
        dispatch(fetchingCategory())
        fetch(dispatch, fetchedCategory, fetchFailed, `/admin/category/id/${id}`)
    }, [dispatch, id])

    const { isFetching, category } = useSelector((state: RootState) => state.adminCategory)

    console.log(category)

    const catName = category?.name

    // create new subCategory 
    const createNewSubCategory = () => {
        dispatch(creatingSubCategory())
        post(dispatch, createdSubCategory, createFailed, `/admin/subcategory/${id}`, { name, image_url }, token)
    }

    const { isCreating, subCategory, createError } = useSelector((state: RootState) => state.adminCreateSubCategory)

    // on create success, fetch updated categories
    useEffect(() => {
        if (subCategory) {
            dispatch(fetchingCategory())
            fetch(dispatch, fetchedCategory, fetchFailed, `/admin/category/id/${id}`)
            dispatch(createdSubCategory(null))
            return setCreateMode(false)
        }
    }, [dispatch, id, subCategory])

    // update subcategory
    const updateCategory = (id: any) => {
        dispatch(updatingSubCategory())
        update(dispatch, updated, updateFailed, `/admin/subcategory/${id}`, { name, image_url }, token)
    }

    const { isUpdating, updatedSubCategory, updateError } = useSelector((state: RootState) => state.adminUpdateSubCategory)

    // on success update, update subcategories state
    useEffect(() => {
        if (updatedSubCategory.length !== 0) {
            dispatch(fetchingCategory())
            fetch(dispatch, fetchedCategory, fetchFailed, `/admin/category/id/${id}`)
            dispatch(updated(''))
            return setEditMode(false)
        }
    }, [dispatch, id, updatedSubCategory])

    // upload category image
    const uploadSubCatImage = (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        dispatch(uploadingImage())
        post(dispatch, uploadedImage, uploadFailed, '/images/upload', formData, token)
    }

    const { isUploading, image, uploadError } = useSelector((state: RootState) => state.uploadImage)

    useEffect(() => {
        if (image) {
            setImage_url(image.url)
            dispatch(uploadedImage(null))
        }
    }, [dispatch, image])

    return (
        <>
            {isFetching ? (<h1>loading ...</h1>)
                : category ? (
                    <div className='flex h-screen overflow-hidden'>
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

                            {/* customer dashboard */}

                            <div className='px-2 md:px-6 lg:px-14 w-full'>

                                <div className='flex items-center justify-between py-8'>
                                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>{catName}</h3>
                                    <button className='bg-dark-blue hover:bg-middle-blue text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-xs md:text-base shadow-md hover:shadow-lg'
                                        onClick={() => {
                                            setName(null)
                                            setImage_url(null)
                                            return setCreateMode(true)
                                        }} >
                                        ADD A Sub-Category
                                    </button>
                                </div>

                                <div className='w-full my-4 md:my-5 lg:my-6 '>
                                    <table className='w-full border-gray-200 text-gray-600 border'>
                                        <thead className=''>
                                            <tr className='font-bold text-xs md:text-sm text-center border-b'>
                                                <th
                                                    scope='col'
                                                    className='
                                                w-2/5 py-3 lg:text-base
                                    '
                                                >Name</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >category</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Edit</th>
                                                <th
                                                    scope='col'
                                                    className='
                                                py-3 lg:text-base
                                    '
                                                >Delete</th>
                                            </tr>
                                        </thead>

                                        {category.subCategories.map((subCategory) => {
                                            const subCategoryImage = subCategory.image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                            return (
                                                <tbody>

                                                    <tr className='text-center text-xs md:text-base lg:text-base border-b
                                                    text-gray-800 hover:bg-gray-100'
                                                    >
                                                        <td className='py-3 w-3/12 md:w-3/6'
                                                            onClick={() => navigate(`/admin/subCategory/${subCategory.id}`)}>
                                                            <div className='md:flex items-center'>
                                                                <div className='md:w-1/4 mx-3'>
                                                                    <img src={subCategoryImage} alt='product' className='w-auto h-8 md:h-12 lg:h-16' />
                                                                </div>
                                                                <div className='md:w-2/4'>

                                                                    <p className='font-normal'>
                                                                        <span className='hover:underline hover:text-dark-blue'>{subCategory.name}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6'>
                                                            <p className='font-normal'>{catName}</p>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6'>
                                                            <div className='mx-auto px-1 py-1 md:px-auto border rounded-md bg-dark-blue w-2/3 md:w-5/6
                                                            text-white hover:bg-middle-blue hover:shadow-md transition duration-150 ease-in-out cursor-pointer'
                                                                onClick={() => {
                                                                    setCurrentSubCategory(subCategory)
                                                                    setName(subCategory.name)
                                                                    setImage_url(subCategory.image_url)
                                                                    return setEditMode(true)
                                                                }} >Edit</div>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6 pr-2'>
                                                            <div className='mx-auto px-1 py-1 md:px-auto border rounded-md md:w-5/6 cursor-pointer
                                                            text-white bg-red-800 hover:bg-red-700 hover:shadow-md transition duration-150 ease-in-out'
                                                                onClick={() => setDeleteMode(true)} >Delete</div>
                                                        </td>
                                                    </tr>
                                                </tbody>)
                                        })
                                        }
                                    </table>

                                </div>
                            </div>
                        </div>

                        {/* delete subCategory */}
                        <Transition show={!!deleteMode} className='fixed'>
                            <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen h-screen'>
                            </div>
                            <div className='absolute top-2/4 w-full z-20 text-xs md:text-base  transition duration-150 ease-in-out'>
                                <div className='p-2 bg-white w-ful mx-6 md:w-2/4 lg:w-2/6 md:mx-auto rounded-md shadow-md'>
                                    <p className='mb-2 '>Are you sure you want to delete this subCategory?</p>
                                    <div className='flex justify-between text-white'>
                                        <button className='px-5 py-1 rounded-lg bg-dark-blue hover:bg-middle-blue hover:shadow-md
                                        transition duration-150 ease-in-out'
                                            onClick={() => setDeleteMode(false)} >Cancel</button>
                                        <button className='px-5 py-1 rounded-lg bg-red-800 hover:bg-red-700 hover:shadow-md
                                        transition duration-150 ease-in-out'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </Transition>

                        {/* create subCategory */}
                        <Transition show={!!createMode} className='fixed'>
                            <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen h-screen'>
                            </div>
                            <div className='absolute top-1/3 w-full z-30 text-xs md:text-base'>
                                <div className='p-3 bg-white w-ful mx-6 md:w-2/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8'>

                                    <MdOutlineCancel className='h-6 w-auto absolute top-0 right-6 md:right-1/4
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg'
                                        onClick={() => setCreateMode(false)} />

                                    <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>Create subCategory</div>
                                    <div className='container'>
                                        <Transition
                                            show={!!createError}
                                        >
                                            <p className='p-2 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{createError?.message}</p>

                                        </Transition>
                                    </div>
                                    <form>

                                        <div className=' w-full mb-3'>
                                            <label
                                                className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                htmlFor='grid-text'
                                            >
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                                                rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150 focus:border-dark-blue'
                                                placeholder='subCategory name'
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>

                                        {/* upload image */}
                                        <div>
                                            <input type='file' name='filename' className=''
                                                accept='image/x-png,image/gif,image/jpeg, image/png'
                                                onChange={e => {
                                                    if (e.target.files) uploadSubCatImage(e.target.files[0])
                                                }} />
                                        </div>
                                        <div className='text-center mt-6'>
                                            <button
                                                className={`bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150
                                            ${isUploading ? 'pointer-events-none cursor-wait' : 'pointer-events-auto'}`}
                                                type='button'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    return createNewSubCategory()
                                                }}
                                            >
                                                {!!isCreating ? 'Loading...' : isUploading ? 'uploading ...' : 'Create'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition>

                        {/* Edit subCategory */}
                        <Transition show={!!editMode} className='fixed'>
                            <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen h-screen'>
                            </div>
                            <div className='absolute top-1/4 w-full z-30 text-xs md:text-base'>
                                <div className='p-3 bg-white w-ful mx-6 md:w-2/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8'>

                                    <MdOutlineCancel className='h-6 w-auto absolute top-0 right-6 md:right-1/4
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg'
                                        onClick={() => setEditMode(false)} />

                                    <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600
                                            mx-auto w-2/4 md:w-1/4'>
                                        <img className='max-h-24 w-auto'
                                            src={currentSubCategory?.image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'} alt="" />
                                    </div>
                                    <div className='container'>
                                        <Transition
                                            show={!!updateError}
                                        >

                                            <p className='p-2 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{updateError?.message}</p>

                                        </Transition>
                                    </div>
                                    <form>

                                        <div className=' w-full mb-4'>
                                            <label
                                                className='block uppercase text-gray-600 text-xs font-bold mb-2'
                                                htmlFor='grid-text'
                                            >
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                className='border-0 border-b border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white
                                                text-sm focus:outline-none  w-full ease-linear transition-all duration-150'
                                                defaultValue={currentSubCategory?.name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>

                                        {/* upload image */}
                                        <div>
                                            <input type='file' name='filename' className=''
                                                accept='image/x-png,image/gif,image/jpeg, image/png'
                                                onChange={e => {
                                                    if (e.target.files) uploadSubCatImage(e.target.files[0])
                                                }} />
                                        </div>
                                        <div className='text-center mt-6'>
                                            <button
                                                className='bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                type='button'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    return updateCategory(currentSubCategory?.id)
                                                }}
                                            >
                                                {!!isUpdating ? 'Updating...' : isUploading ? 'uploading ...' : 'Update'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition>
                    </div>

                )
                    : <div></div>

            }
        </>
    )
}

export default CatSubCategories
