import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

export const useAuth = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) navigate('/signin')
    }, [navigate, token])
}

// check if a user is vendor
export const useVendor = (navigate: Function, token: string | null) => {

    const { isLoading, profile } = useSelector((state: RootState) => state.profile)
    useEffect(() => {
        if (!token) return navigate('/signin')
        if (isLoading === false && profile?.account_type !== 'business') return navigate('/')
    }, [isLoading, navigate, profile, profile?.account_type, token])

}
