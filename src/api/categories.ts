
import { useEffect } from 'react'
import { post, fetch } from './apiAction'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingCategories, retrievedCategory, retrievedCategoryFailed } from '../redux/categories/categories.slice'

export const useCategories = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector((state: RootState) => state.categories)

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchingCategories())
            fetch(dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
        }
    }, [categories, dispatch])

}
