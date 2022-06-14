
import { useEffect } from 'react'
import axiosAction from './apiAction'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, category, categoryFailed } from '../redux/categories/category.slice'
import { fetchingCategories, retrievedCategory, retrievedCategoryFailed } from '../redux/categories/categories.slice'

export const useCategories = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector((state: RootState) => state.categories)

    useEffect(() => {
        if (!categories.length) {
            dispatch(fetchingCategories())
            axiosAction('get', dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
        }
    }, [categories, dispatch])
}

export const useCategory = (name?: string) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())
        axiosAction('get', dispatch, category, categoryFailed, `/admin/category/${name}`)
    }, [dispatch, name])
}
