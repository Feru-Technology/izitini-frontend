import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import {
    uploadingImage,
    uploadedImage,
    uploadFailed
} from '../redux/image/uploadImage.slice'

const token = localStorage.getItem('token')

export const uploadImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadingImage())
    axiosAction('post', dispatch, uploadedImage, uploadFailed, '/images', token, formData)
}
