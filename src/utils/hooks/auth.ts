import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

export const useAuth = (permission?: string) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const { isLoading, profile } = useSelector((state: RootState) => state.profile)
    useEffect(() => {
        if (!token) return navigate('/signin')
        if (permission && !isLoading && profile?.account_type !== permission) return navigate('/')
    }, [isLoading, navigate, permission, profile, profile?.account_type, token])

}
