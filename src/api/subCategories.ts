import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import {
    fetchingSubCategoryProducts,
    subCategoryProducts,
    subCategoryProductsFailed
} from '../redux/subCategories/subCategoryProducts.slice'

export const useSubCategories = (id: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategoryProducts())
        axiosAction('get', dispatch, subCategoryProducts, subCategoryProductsFailed, `/admin/subcategory/products/${id}`)
    }, [id, dispatch])

}
