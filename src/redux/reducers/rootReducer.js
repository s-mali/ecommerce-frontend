import authReducer from './authReducer';
import { combineReducers } from "redux";
import { fatchProducts, productDetails } from './productReducer';
import { getWishlist } from './wishListReducer';
import { cart } from './cartReducer';
import { userState } from './authReducer'

const rootReducer = combineReducers({
   allProducts : fatchProducts,
   productDetails : productDetails,
   wishList : getWishlist,
   cart : cart,
   user : userState
})



export default rootReducer;

