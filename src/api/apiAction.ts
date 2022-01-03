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
