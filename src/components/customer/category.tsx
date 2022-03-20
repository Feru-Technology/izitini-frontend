import { useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { CategoryBar } from './categoryBar'
import { fetch } from '../../api/apiAction'
import { Link, useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    getCategory,
    category,
    categoryFailed
} from '../../redux/categories/category.slice'
import { ChevronRightIcon } from '@heroicons/react/solid'

const Subcategory = () => {

    // Get ID from URL
    const params = useParams()
    const { categoryName } = params

    // redux
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())
        fetch(dispatch, category, categoryFailed, `/admin/category/${categoryName}`)
    }, [categoryName, dispatch])

    const { isLoading, currentCategory } = useSelector((state: RootState) => state.category)

    return (<>

        <div className='font-nova'>
            < Navbar />
            < CategoryBar
            />
            {isLoading ? (<h1>Loading...</h1>) : currentCategory?.subCategories[0] ? (
                <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                    {/* navigation */}
                    <div className='flex mt-4 lg:mt-8 font-semibold text-xs md:text-sm'>
                        <Link to={'/products'}>All Products</Link>
                        <ChevronRightIcon className='h-4 md:h-5 mx-1 text-gray-500' />
                        <p className='text-gray-500'>{categoryName}</p>
                    </div>

                    {isLoading ? (<h1>Loading...</h1>) : currentCategory?.subCategories[0] ? (

                        // categories
                        <div className='md:mt-4 lg:mt-8 font-medium
                grid grid-cols-1 md:grid-cols-2
                lg:grid-cols-3 xl:gap-4 gap-3'>
                            {currentCategory?.subCategories.map((subCat) => (
                                <div className='relative my-2'
                                >
                                    <Link to={`/products/s/${subCat.id}`}>
                                        <p className='absolute ml-2'>{subCat.name}</p>
                                        <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                            src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                        <div className=''>

                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>) : (<div className='flex justify-center'>No Products found</div>)}

                </div>
            ) : (<div className='flex justify-center'>No Products found</div>)}
            <Footer />
        </div>
    </>)
}

export default Subcategory
