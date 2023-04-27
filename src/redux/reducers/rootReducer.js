import authReducer from './authReducer';
import { combineReducers } from "redux";
import { fatchProducts, productDetails } from './productReducer';
import { getWishlist } from './wishListReducer';

const rootReducer = combineReducers({
   allProducts : fatchProducts,
   productDetails : productDetails,
   wishList : getWishlist,
})



export default rootReducer;

