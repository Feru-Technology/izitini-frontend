import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { fetchingAds, retrievedAds, adsFailed } from '../redux/admin/ads/ads.slice'
import { Dispatch } from '@reduxjs/toolkit'
import { creatingAd, createdAd, createFailed } from '../redux/admin/ads/createAd.slice'

const token = localStorage.getItem('token')

export const useAds = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingAds())
        axiosAction('get', dispatch, retrievedAds, adsFailed, '/admin/ad')
    }, [dispatch])
}

export const addImage = (dispatch: Dispatch, file: File) => {
    const formData = new FormData()
    formData.append('ad', file)
    dispatch(creatingAd())
    axiosAction('post', dispatch, retrievedAds, createFailed, '/admin/ad', token, formData)
    dispatch(createdAd(null))
}
