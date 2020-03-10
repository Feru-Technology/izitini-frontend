import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { getStore, store, storeFailed } from '../redux/stores/store.slice'

const token = localStorage.getItem('token')

export const createStore = (dispatch: Dispatch, data: {}) => {
    dispatch(getStore())
    axiosAction('get', dispatch, store, storeFailed, '/shop', token, data)
}

