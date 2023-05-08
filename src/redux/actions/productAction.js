import { actionTypes }from '../constants/actionTypes'
import  apiInstance  from '../apiInstance/api'
import axios from 'axios'


export const fatchProducts = (page , limit) => async(dispatch) => {
    const response = await apiInstance.get(`/getProducts?page=${page}&limit=${limit}`);

    dispatch({type: actionTypes.FATCH_PRODUCTS , payload: response.data})
}
export const removeProductList = () => {
    return {
        type : actionTypes.REMOVE_PRODUCT_LIST,
    }
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