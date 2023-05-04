import { actionTypes } from "../constants/actionTypes";


export const getCart = () => async(dispatch) => {

    dispatch({type: actionTypes.GET_CART})
}

export const addToCart = (product) => async(dispatch)=>{
    product['quantity'] = 1
    dispatch({type: actionTypes.ADD_TO_CART, payload : product })
}

export const removeFormCart = (id) => async(dispatch)=>{
    dispatch({type: actionTypes.REMOVE_FROM_CART, payload : id })
}

export const increaseQuantity = (id) => async(dispatch)=>{
    dispatch({type: actionTypes.INCREASE_QUANTITY, payload : id })
}

export const decreaseQuantity = (id) => async(dispatch)=>{
    dispatch({type: actionTypes.DECREASE_QUANTITY, payload : id })
}