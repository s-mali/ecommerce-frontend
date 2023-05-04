import authReducer from './authReducer';
import { combineReducers } from "redux";
import { fatchProducts, productDetails } from './productReducer';
import { getWishlist } from './wishListReducer';
import { cart } from './cartReducer';

const rootReducer = combineReducers({
   allProducts : fatchProducts,
   productDetails : productDetails,
   wishList : getWishlist,
   cart : cart
})



export default rootReducer;

