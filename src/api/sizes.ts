import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import {
    creatingSize,
    createdSize,
    createFailed
} from '../redux/admin/productSizes/createSize.slice'
import {
    deletingSize,
    deletedSize,
    deleteFailed
} from '../redux/admin/productSizes/deleteSize.slice'

const token = localStorage.getItem('token')

export const createSize = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(creatingSize())
    axiosAction('post', dispatch, createdSize, createFailed, `/product/size/${id}`, token, data)
}

export const deleteSize = (dispatch: Dispatch, id: string, size_id: string) => {
    dispatch(deletingSize())
    axiosAction('delete', dispatch, deletedSize, deleteFailed, `/product/size/${id}/${size_id}`, token)
}
