import { actionTypes }from '../constants/actionTypes'
import  apiInstance  from '../apiInstance/api'
import axios from 'axios'


export const fatchProducts = () => async(dispatch) => {
    const response = await apiInstance.get('/getProducts');

    dispatch({type: actionTypes.FATCH_PRODUCTS , payload: response.data.products})
}

export const fatchProductDetails = (id) => async(dispatch) => {

    const response = await apiInstance.get(`/getProduct/${id}`);

    dispatch({type: actionTypes.FATCH_PRODUCT_DETAILS , payload: response.data})
} 

export const removeProduct = () => {
    return {
        type : actionTypes.REMOVE_PRODUCT,
    }
}