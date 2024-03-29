import { SetStateAction, useEffect } from 'react'
import axiosAction from './apiAction'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { uploadingImage, uploadedImage, uploadFailed } from '../redux/image/uploadImage.slice'
import { updatingSubCategory, updated, updateFailed } from '../redux/admin/subCategories/updateSubCategory.slice'
import { fetchingCategory, fetchedCategory, fetchFailed as error } from '../redux/admin/categories/category.slice'
import { creatingSubCategory, createdSubCategory, createFailed } from '../redux/admin/subCategories/createSubCategory.slice'
import { fetchingSubCategories, retrievedSubCategories, fetchFailed } from '../redux/admin/subCategories/subCategories.slice'
import { fetchingSubCategory, fetchedSubCategory, fetchFailed as fail } from '../redux/admin/subCategories/subCategory.slice'
import { fetchingSubCategoryProducts, subCategoryProducts, subCategoryProductsFailed } from '../redux/subCategories/subCategoryProducts.slice'

const token = localStorage.getItem('token')

// refresh subcategories in a category
export const useRefreshSubCategories = (setCreateMode: SetStateAction<any>, setEditMode: SetStateAction<any>, id: string) => {
    const dispatch = useDispatch()

    const { subCategory } = useSelector((state: RootState) => state.adminCreateSubCategory)
    const { updatedSubCategory } = useSelector((state: RootState) => state.adminUpdateSubCategory)

    useEffect(() => {
        if (subCategory || updatedSubCategory) {
            dispatch(fetchingCategory())
            axiosAction('get', dispatch, fetchedCategory, fetchFailed, `/admin/category/id/${id}`)
            dispatch(createdSubCategory(null))
            setCreateMode(false)
            return setEditMode(false)
        }
    }, [dispatch, id, setCreateMode, setEditMode, subCategory, updatedSubCategory])
}


// refresh subcategories in a category
export const useRefreshAllSubCategories = (setCreateMode: SetStateAction<any>, setEditMode: SetStateAction<any>) => {
    const dispatch = useDispatch()

    const { subCategory } = useSelector((state: RootState) => state.adminCreateSubCategory)
    const { updatedSubCategory } = useSelector((state: RootState) => state.adminUpdateSubCategory)

    useEffect(() => {
        if (subCategory || updatedSubCategory) {
            dispatch(fetchingSubCategories())
            axiosAction('get', dispatch, retrievedSubCategories, fetchFailed, '/admin/subcategory')
            dispatch(createdSubCategory(null))
            setCreateMode(false)
            return setEditMode(false)
        }
    }, [dispatch, setCreateMode, setEditMode, subCategory, updatedSubCategory])
}

export const useSubCategories = (route: String) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategories())
        axiosAction('get', dispatch, retrievedSubCategories, fetchFailed, `${route}`)
    }, [dispatch, route])

}

export const useSubCategoriesInCat = (id: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingSubCategoryProducts())
        axiosAction('get', dispatch, subCategoryProducts, subCategoryProductsFailed, `/admin/subcategory/products/${id}`)
    }, [id, dispatch])

}

export const useSubCatProducts = (id: string) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingSubCategory())
        axiosAction('get', dispatch, fetchedSubCategory, fail, `/admin/subcategory/products/${id}`)
    }, [dispatch, id])
}

export const useCatSubcategories = (id: string) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingCategory())
        axiosAction('get', dispatch, fetchedCategory, error, `/admin/category/id/${id}`)
    }, [dispatch, id])
}

export const createSubCatInCat = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(creatingSubCategory())
    axiosAction('post', dispatch, createdSubCategory, createFailed, `/admin/subcategory/${id}`, token, data)
}

export const updateSubCategory = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(updatingSubCategory())
    axiosAction('patch', dispatch, updated, updateFailed, `/admin/subcategory/${id}`, token, data)
}

export const uploadSubCatImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadingImage())
    axiosAction('post', dispatch, uploadedImage, uploadFailed, '/images/upload', token, formData)
}

export const useRefreshSubCatProd = (createdProduct: SetStateAction<any>, setCreateMode: SetStateAction<any>, id: string) => {

    const dispatch = useDispatch()
    const { product } = useSelector((state: RootState) => state.adminCreateProduct)

    useEffect(() => {
        if (product) {
            dispatch(fetchingSubCategory())
            axiosAction('get', dispatch, fetchedSubCategory, fetchFailed, `/admin/subcategory/products/${id}`)
            dispatch(createdProduct(null))
            return setCreateMode(false)
        }
    }, [dispatch, createdProduct, id, product, setCreateMode])
}
