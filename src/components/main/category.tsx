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

const Subcategory = () => {

    // redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingCategories());
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category/category1')
    }, [dispatch])

    const { isLoading, currentCategory } = useSelector((state: RootState) => state.category);

    return (<>
        {isLoading ? (<h1>Loading ...</h1>) : (

            <div className='font-nova'>
                < Navbar />
                < CategoryBar
                />
                <div className='mx-5 md:mx-10 lg:mx-12 xl:mx-24'>


                    {/* categories */}
                    <div className='md:mt-4 lg:mt-8 font-medium
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:gap-4
                gap-3'>
                        {currentCategory?.SubCategories.map((subCat) => (
                            <div className='relative my-2'>
                                <p className='absolute ml-2'>{subCat.name}</p>
                                <img className='h-36  2xl:h-52 w-full bg-gray-200
                                lg:h-40 xl:h-48'
                                    src='https://izitini-spaces.fra1.digitaloceanspaces.com/Screenshot%20from%202021-11-30%2010-21-50.png' alt='' />
                                <div className=''>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <Footer />
            </div>
        )}
    </>)
}

export default Subcategory
