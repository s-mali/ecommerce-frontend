import { actionTypes } from "../constants/actionTypes";


export const getWishlist = (state= []  , {type, payload}) =>{
    
    switch (type) {
        case actionTypes.GET_WISHLIST:
            return [ ...payload]

        case actionTypes.ADD_TO_WISHLIST:            
            return  [...state , payload ]

        case actionTypes.REMOVE_FROM_WISHLIST:
            const itemIdToRemove = payload;
            const updatedWishlist = state.filter((item) => item._id !== itemIdToRemove)

            return [...updatedWishlist]

        default:
            return state
    }
}