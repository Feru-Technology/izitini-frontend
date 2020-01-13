import axios, { Method } from 'axios'
import { ActionCreatorWithPayload, Dispatch } from '@reduxjs/toolkit'


const axiosAction = (
    method: Method,
    dispatch: Dispatch,
    retrievedData: ActionCreatorWithPayload<{}, string>,
    failed: ActionCreatorWithPayload<{}, string>,
    route: string, token?: any, data?: object) => {


    const baseURL = 'http://142.93.224.218:4000'
    // const baseURL = 'http://localhost:3002'
    axios({ method, url: `${baseURL}${route}`, headers: { 'Authorization': token }, data })
        .then(({ data }) => {
            if (data.data.token) localStorage.setItem('token', data.data.token)
            return dispatch(retrievedData(data.data))
        })
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            return ResponseErr ? dispatch(failed(ResponseErr.data))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export default axiosAction
