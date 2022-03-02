import { useEffect } from 'react'
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
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchingCategories())
    //     fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/category/sub')
    // }, [dispatch])

    const { isLoading, categories } = useSelector((state: RootState) => state.categories);
    const categoryBar = categories.slice(0, 8)
    return (
        <>
            {isLoading ? (<h1>Loading ...</h1>) :
                (<div className='
                sr-only
                md:not-sr-only border-b-2 border-gray-300
                flex justify-center
                bg-gray-100 mt-2'>
                    <ul className='flex md:space-x-4 lg:space-x-8'>

                        {categoryBar.map((v) => (<li className='font-bold text-gray-600 py-2
                        md:text-xs lg:text-sm xl:text-base 2xl:text-lg'>{v.name}</li>))}

                        <button type='submit' className='font-medium text-dark-blue
                        md:text-xs lg:text-sm xl:text-base'>More</button>
                    </ul>
                </div>)}
        </>
    )
}

