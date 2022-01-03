import axios from '../axios';

export const subCategory = (dispatch: any) => axios
    .get(`/category`)
    .then((res) => {
        const data = res.data;
        console.log(data)
        return dispatch({
            data
        })
    })
