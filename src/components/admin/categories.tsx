import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import SiderBar from './SiderBar'
import Header from '../vendor/Header'
import { RootState } from '../../redux/store'
import { Transition } from '@headlessui/react'
import { useMediaQuery } from 'react-responsive'
import { MdOutlineCancel } from 'react-icons/md'
import { fetch, post } from '../../api/apiAction'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchingCategories,
    retrievedCategories,
    categoriesFailed
} from '../../redux/admin/categories/categories.slice'
import {
    createCategory,
    createdCategory,
    createFailed
} from '../../redux/admin/categories/createCategory.slice'

const Categories = () => {

    // redux
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const { profile } = useSelector((state: RootState) => state.profile)

    const isStatic = useMediaQuery({
        query: '(min-width: 640px)',
    })

    const [isClosed, setIsClosed] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [name, setName] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchingCategories())
        fetch(dispatch, retrievedCategories, categoriesFailed, '/admin/category')
    }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.adminCategories)

    const createNewCategory = () => {
        dispatch(createCategory())
        post(dispatch, createdCategory, createFailed, '/admin/category', { name }, token)
    }

    const { isCatLoading, category, error } = useSelector((state: RootState) => state.adminCreateCategory)

    useEffect(() => {
        if (category) {
            dispatch(retrievedCategories([...categories, category]))
            dispatch(createdCategory(null))
            return setCreateMode(false)
        }
    }, [categories, category, dispatch])

    return (
        <>
            {isLoading ? (<h1>loading ...</h1>)
                : categories ? (
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
                                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold'>Categories</h3>
                                    <button className='bg-dark-blue hover:bg-middle-blue text-white font-bold
                                            py-2 px-4 rounded cursor-pointer text-sm md:text-base shadow-md hover:shadow-lg'
                                        onClick={() => setCreateMode(true)} >
                                        ADD A Category
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
                                                >CreatedAt</th>
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

                                        {categories.map((category) => {
                                            const categoryImage = category.image_url || 'https://izitini-spaces.fra1.digitaloceanspaces.com/system-images/Logo1.png'
                                            return (
                                                <tbody>

                                                    <tr className='text-center text-xs md:text-base lg:text-base border-b
                                                    text-gray-800 hover:bg-gray-100'
                                                    >
                                                        <td className='py-3 w-3/12 md:w-3/6'
                                                            onClick={() => navigate(`/admin/category/${category.id}`)}>
                                                            <div className='md:flex items-center'>
                                                                <div className='md:w-1/4 mx-3'>
                                                                    <img src={categoryImage} alt='product' className='w-full' />
                                                                </div>
                                                                <div className='md:w-2/4'>

                                                                    <p className='font-normal'>
                                                                        <span className='hover:underline hover:text-dark-blue'>{category.name}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6'>
                                                            <p className='font-normal'>{format(new Date(category.createdAt), 'dd.MM.yyyy')}</p>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6'>
                                                            <div className='mx-auto px-1 py-1 md:px-auto border rounded-md bg-dark-blue w-2/3 md:w-5/6
                                                            text-white hover:bg-middle-blue hover:shadow-md transition duration-150 ease-in-out'
                                                                onClick={() => setEditMode(true)} >Edit</div>
                                                        </td>
                                                        <td className='py-3 w-3/12 md:w-1/6 pr-2'>
                                                            <div className='mx-auto px-1 py-1 md:px-auto border rounded-md md:w-5/6 
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

                        {/* delete category */}
                        <Transition show={!!deleteMode} className='fixed'>
                            <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen h-screen'>
                            </div>
                            <div className='absolute top-2/4 w-full z-20 text-xs md:text-base  transition duration-150 ease-in-out'>
                                <div className='p-2 bg-white w-ful mx-6 md:w-2/4 lg:w-2/6 md:mx-auto rounded-md shadow-md'>
                                    <p className='mb-2 '>Are you sure you want to delete this category?</p>
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

                        {/* Edit category */}
                        <Transition show={!!createMode} className='fixed'>
                            <div className='top-0 z-10 text-gray-500 bg-gray-700 opacity-50 w-screen h-screen'>
                            </div>
                            <div className='absolute top-1/3 w-full z-30 text-xs md:text-base'>
                                <div className='p-3 bg-white w-ful mx-6 md:w-2/4 md:mx-auto rounded-md shadow-md
                                md:p-6 lg:p-8'>

                                    <MdOutlineCancel className='h-6 w-auto absolute top-0 right-6 md:right-1/4
                                    text-gray-600 hover:text-dark-blue hover:shadow-lg'
                                        onClick={() => setCreateMode(false)} />


                                    <div className='mb-3 font-semibold text-lg md:text-xl lg:text-2xl text-center text-gray-600'>Create Category</div>
                                    <div className='container'>
                                        <Transition
                                            show={!!error}
                                        >
                                            {/* {error ? } */}
                                            <p className='p-4 mb-4 bg-red-100 border border-red-700 text-red-700 text-center '>{error?.message}</p>

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
                                                className='border border-gray-700 px-3 py-3 placeholder-gray-500 text-gray-600 bg-white rounded text-sm  focus:outline-none  w-full ease-linear transition-all duration-150'
                                                placeholder='category name'
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>{/* upload image */}
                                        <div>
                                            <form action='/action_page.php'>
                                                <input type='file' id='myFile' name='filename' />
                                            </form>
                                        </div>
                                        <div className='text-center mt-6'>
                                            <button
                                                className='bg-dark-blue hover:bg-middle-blue text-white  text-sm font-bold uppercase px-6 p-3
                                            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150'
                                                type='button'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    return createNewCategory()
                                                }}
                                            >
                                                {!!isCatLoading ? 'Loading...' : 'Create'}
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

export default Categories