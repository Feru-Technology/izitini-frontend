import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import {
    fetchingSubCategoryProducts,
    subCategoryProducts,
    subCategoryProductsFailed
} from '../redux/subCategories/subCategoryProducts.slice'
import {
    fetchingSubCategories,
    retrievedSubCategories,
    fetchFailed
} from '../redux/admin/subCategories/subCategories.slice'

export const useSubCategories = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategories())
        axiosAction('get', dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
    }, [dispatch])

}

export const useSubCategoriesInCat = (id: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategoryProducts())
        axiosAction('get', dispatch, subCategoryProducts, subCategoryProductsFailed, `/admin/subcategory/products/${id}`)
    }, [id, dispatch])

}
