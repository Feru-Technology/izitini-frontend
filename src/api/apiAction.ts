import Axios from './axios'

export const fetch = (dispatch: any, retrievedData: any, failed: any, route: string, token?: any) => {
    Axios.get(route, { headers: { 'Authorization': token } })
        .then((response) => {
            const { data } = response
            return dispatch(retrievedData(data.data))
        })
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            console.log({ Response: ResponseErr }, { request: requestErr }, { config: configErr }, error)
            return ResponseErr ? dispatch(failed(ResponseErr))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export const post = (dispatch: any, response: any, failed: any, route: string, body: object, token?: any) => {
    Axios.post(route, body, { headers: { 'Authorization': token } })
        .then(({ data }) => {
            data.data.token ? localStorage.setItem('token', data.data.token) : console.log(data)
            return dispatch(response(data.data))
        })
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            console.log({ Response: ResponseErr }, { request: requestErr }, { config: configErr }, error)
            return ResponseErr ? dispatch(failed(ResponseErr.data))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export const destroy = (dispatch: any, response: any, failed: any, route: string, token?: any) => {
    Axios.delete(route, { headers: { 'Authorization': token } })
        .then(({ data }) => dispatch(response(data.data)))
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            console.log({ Response: ResponseErr }, { request: requestErr }, { config: configErr }, error)
            return ResponseErr ? dispatch(failed(ResponseErr.data))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export const update = (dispatch: any, response: any, failed: any, route: string, body: {}, token?: any) => {
    Axios.patch(route, body, { headers: { 'Authorization': token } })
        .then(({ data }) => dispatch(response(data.data)))
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            console.log({ Response: ResponseErr }, { request: requestErr }, { config: configErr }, error)
            return ResponseErr ? dispatch(failed(ResponseErr.data))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export const upload = (dispatch: any, response: any, failed: any, route: string, formData: {}) => {
    Axios.post(route, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(({ data }) => dispatch(response(data.data)))
        .catch(error => {
            const ResponseErr = error.response
            const requestErr = error.request
            const configErr = error.config
            console.log({ Response: ResponseErr }, { request: requestErr }, { config: configErr }, error)
            return ResponseErr ? dispatch(failed(ResponseErr.data))
                : requestErr ? dispatch(failed(requestErr))
                    : configErr ? dispatch(failed(configErr))
                        : dispatch(failed(error.message))
        })
}

export const prodImg = (product_id: string) => {
    Axios.get(`/product/image/${product_id}`)
        .then(({ data }) => data)
        .catch(error => error)
}
