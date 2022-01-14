import Axios from './axios';

export const fetch = (dispatch: any, retrievedData: any, retrieveDataFailed: any, route: string, token?: any) => {
    Axios.get(route, { headers: { 'Authorization': token } })
        .then(({ data }) => {
            dispatch(retrievedData(data.data))
        })
        .catch(error => {
            dispatch(retrieveDataFailed(error))
        })
}

export const post = (dispatch: any, response: any, failed: any, route: string, body: object, token?: any) => {
    Axios.post(route, body, { headers: { 'Authorization': token } })
        .then(({ data }) => {
            data.data.token ? localStorage.setItem('token', data.data.token) : console.log(data);
            return dispatch(response(data.data))
        })
        .catch(error => {
            console.log(error);
            dispatch(failed(error))
        })
}
