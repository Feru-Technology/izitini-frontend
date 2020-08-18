import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetch } from '../../api/apiAction'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchingCategories,
    retrievedCategoryFailed,
    retrievedCategory
} from '../../redux/categories/categories.slice'


export const CategoryBar = () => {

    // redux
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingCategories())
        fetch(dispatch, retrievedCategory, retrievedCategoryFailed, 'admin/category/sub')
    }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.categories);
    const categoryBar = categories.slice(0, 8)
    return (
        <>
            {isLoading ? (<h1>Loading ...</h1>) :
                (<div className='
                sr-only
                md:not-sr-only border-b border-gray-300
                flex justify-center
                bg-gray-100 mt-2'>
                    <ul className='flex md:space-x-4 lg:space-x-8'>

                        {categoryBar.map((v) => (<Link to={`/products/c/${v.name}`} className='font-bold text-gray-600 py-2
                        md:text-xs lg:text-sm xl:text-base 2xl:text-lg hover:text-dark-blue'>{v.name}</Link>))}

                        <button type='submit' className='font-medium text-dark-blue
                        md:text-xs lg:text-sm xl:text-base hover:underline'> <Link to='/products'>More</Link> </button>
                    </ul>
                </div>)}
        </>
    )
}

