import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import {
    creatingSize,
    createdSize,
    createFailed
} from '../redux/admin/productSizes/createSize.slice'

const token = localStorage.getItem('token')

export const createSize = (dispatch: Dispatch, id: string, data: {}) => {
    dispatch(creatingSize())
    axiosAction('post', dispatch, createdSize, createFailed, `/product/size/${id}`, token, data)
}
