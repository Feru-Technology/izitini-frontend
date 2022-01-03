import Axios from './axios';
// import { fetchingSubCategories, retrievedSubCategoryFailed, retrievedSubCategory } from '../redux/subCategory.slice'

export const fetch = (dispatch: any, retrievedData: any, retrieveDataFailed: any) => {
    Axios.get(`/category`)
        .then(({ data }) => {
            console.log(data)
            dispatch(retrievedData(data.data))
        })
        .catch(error => {
            console.log(error);
            dispatch(retrieveDataFailed(error))
        })
}
