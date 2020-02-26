import { SetStateAction, useEffect } from 'react'
import axiosAction from './apiAction'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, category, categoryFailed } from '../redux/categories/category.slice'
import { fetchingCategories, retrievedCategory, retrievedCategoryFailed } from '../redux/categories/categories.slice'
import { Dispatch } from '@reduxjs/toolkit'
import { createCategory, createdCategory, createFailed } from '../redux/admin/categories/createCategory.slice'
import { updatingCategory, updated, updateFailed } from '../redux/admin/categories/updateCategory.slice'
import { uploadingImage, uploadedImage, uploadFailed } from '../redux/image/uploadImage.slice'

const token = localStorage.getItem('token')

export const useRefreshCategories = (setCreateMode: SetStateAction<any>, setEditMode: SetStateAction<any>) => {

    const dispatch = useDispatch()
    const { updatedCategories } = useSelector((state: RootState) => state.adminUpdateCategory)
    const { category } = useSelector((state: RootState) => state.adminCreateCategory)
    useEffect(() => {
        if (category || updatedCategories) {
            dispatch(fetchingCategories())
            axiosAction('get', dispatch, retrievedCategory, retrievedCategoryFailed, '/admin/category')
            dispatch(createdCategory(null))
            setCreateMode(false)
            return setEditMode(false)
        }
    }, [category, dispatch, setCreateMode, setEditMode, updatedCategories])
}

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

export const createNewCategory = (dispatch: Dispatch, data: {}) => {
    dispatch(createCategory())
    axiosAction('post', dispatch, createdCategory, createFailed, '/admin/category', token, data)
}

export const updateCategory = (dispatch: Dispatch, id: any, data: {}) => {
    dispatch(updatingCategory())
    axiosAction('patch', dispatch, updated, updateFailed, `/admin/category/${id}`, token, data)
}

export const uploadCatImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadingImage())
    axiosAction('post', dispatch, uploadedImage, uploadFailed, '/images/upload', token, formData)
}
