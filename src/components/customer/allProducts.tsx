import { useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { CategoryBar } from './categoryBar'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    fetchingCategories,
    retrievedCategoryFailed,
    retrievedCategory
} from '../../redux/categories/categories.slice'
import { Link } from 'react-router-dom'

const AllProducts = () => {

    // redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingCategories())
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, 'admin/category/sub')
    }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.categories)
    console.log(categories)

    return (<>
        <div className='font-nova'>
            < Navbar />
            < CategoryBar
            />
            {isLoading ? (<h1>Loading ...</h1>) : categories.length !== 0 ?
                (

                    <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>

                        {/* navigation */}
                        <div className='flex mt-4'>
                            <p>
                                <span className='text-gray-500'> All Products</span>
                            </p>
                        </div>

                        {/* categories */}
                        <div className='md:mt-4 lg:mt-8 font-medium
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:gap-4
                gap-3'>
                            {categories.map((category) => (
                                <Link to={`/products/c/${category.name}`}>
                                    <div className='relative my-2'>
                                        <p className='absolute ml-2'>{category.name}</p>
                                        <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                            src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                        <div className=''>
                                            <ul>
                                                {
                                                    category.subCategories.map((subCat) => (
                                                        <li className='mt-1 font-normal'>{subCat.name}</li>
                                                    ))
                                                }
                                                <p className='text-dark-blue'>see all</p>
                                            </ul>

                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>

                ) : (<div className='font-normal flex justify-center'
                >No Product yet</div>)}
            <Footer />
        </div>
    </>)
}

export default AllProducts
