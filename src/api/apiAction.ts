import Axios from './axios';

export const fetch = (dispatch: any, retrievedData: any, retrieveDataFailed: any, route: string) => {
    Axios.get(route)
        .then(({ data }) => {
            dispatch(retrievedData(data.data))
        })
        .catch(error => {
            dispatch(retrieveDataFailed(error))
        })
}

export const post = (dispatch: any, response: any, failed: any, route: string, body: object) => {
    Axios.post(route, body)
        .then(({ data }) => {
            console.log(data)
            dispatch(response(data.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(failed(error))
        })
}
