import axiosAction from './apiAction'
import { Dispatch } from '@reduxjs/toolkit'
import {
    creatingColor,
    createdColor,
    createColorFailed
} from '../redux/admin/productColors/createColor.slice'
import {
    deletingColor,
    deletedColor,
    deleteColorFailed
} from '../redux/admin/productColors/DeleteColor.slice'

const token = localStorage.getItem('token')

export const createColor = (dispatch: Dispatch, route: string, id: string, data: {}) => {
    dispatch(creatingColor())
    axiosAction('post', dispatch, createdColor, createColorFailed, `${route}/${id}`, token, data)
}

export const deleteColor = (dispatch: Dispatch, route: string, id: string, color_id: string) => {
    dispatch(deletingColor())
    axiosAction('delete', dispatch, deletedColor, deleteColorFailed, `${route}/${id}/${color_id}`, token)
}
