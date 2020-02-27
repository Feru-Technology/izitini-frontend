import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { fetchingCategory, fetchedCategory, fetchFailed as error } from '../redux/admin/categories/category.slice'
import { fetchingSubCategories, retrievedSubCategories, fetchFailed } from '../redux/admin/subCategories/subCategories.slice'
import { fetchingSubCategoryProducts, subCategoryProducts, subCategoryProductsFailed } from '../redux/subCategories/subCategoryProducts.slice'

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

export const useCatSubcategories = (id: string) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingCategory())
        axiosAction('get', dispatch, fetchedCategory, error, `/admin/category/id/${id}`)
    }, [dispatch, id])
}
