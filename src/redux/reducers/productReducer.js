import { actionTypes } from "../constants/actionTypes";

const initiState ={
    products : []
}

export const fatchProducts = (state = initiState, {type,payload} ) => {
    switch (type) {
        case actionTypes.FATCH_PRODUCTS: 
            return {...state , products: payload}

        default:
            return state;
    }
}

export const productDetails = (state ={}, {type,payload}) => {
    switch (type){
        case actionTypes.FATCH_PRODUCT_DETAILS:
            return {...state , ...payload}

        case actionTypes.REMOVE_PRODUCT:
            return {}

        default :
            return state;
    }
}