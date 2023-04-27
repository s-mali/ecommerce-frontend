import { actionTypes } from "../constants/actionTypes";
import apiInstance from "../apiInstance/api";

export const getWishList = () => async(dispatch) => {

    const response = await apiInstance.get('/getWishlist')

    dispatch({type: actionTypes.GET_WISHLIST , payload: response.data})
}

export const addTowishlist = (product) => async(dispatch) => {
    const response = await apiInstance.post('/addToWishlist',{productId: product._id})
    if(response.error) {
        return
    }
    dispatch({type: actionTypes.ADD_TO_WISHLIST , payload:product })
}

export const removeFromWishlist = (id) => async(dispatch) => {
    const response = await apiInstance.get(`/deleteFromWishlist/${id}`);
    if(response.error) {
        return
    }
    dispatch({type: actionTypes.REMOVE_FROM_WISHLIST, payload: id })
}