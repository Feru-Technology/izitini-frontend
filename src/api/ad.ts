import { useEffect } from 'react'
import axiosAction from './apiAction'
import { useDispatch } from 'react-redux'
import { fetchingAds, retrievedAds, adsFailed } from '../redux/admin/ads/ads.slice'

export const useAds = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingAds())
        axiosAction('get', dispatch, retrievedAds, adsFailed, '/admin/ad')
    }, [dispatch])
}
